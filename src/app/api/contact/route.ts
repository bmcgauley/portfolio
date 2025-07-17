import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

// Check if email credentials are available
const hasEmailCredentials = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);

// Create multiple transporter configurations for fallback
const createTransporters = () => {
  if (!hasEmailCredentials) return [];

  const configs = [
    {
      name: 'Gmail SMTP (587)',
      config: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS?.replace(/\s+/g, '')
        },
        tls: {
          rejectUnauthorized: false
        },
        connectionTimeout: 60000,
        greetingTimeout: 30000,
        socketTimeout: 60000,
      }
    },
    {
      name: 'Gmail SMTP (465)',
      config: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS?.replace(/\s+/g, '')
        },
        tls: {
          rejectUnauthorized: false
        },
        connectionTimeout: 60000,
        greetingTimeout: 30000,
        socketTimeout: 60000,
      }
    }
  ];

  return configs.map(({ name, config }) => ({
    name,
    transporter: nodemailer.createTransport(config)
  }));
};

const transporters = createTransporters();

// Test connection for each transporter
if (transporters.length > 0) {
  console.log('Email configuration:', {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? '****' : undefined,
    passwordLength: process.env.EMAIL_PASS?.replace(/\s+/g, '').length
  });

  transporters.forEach(({ name, transporter }, index) => {
    setTimeout(() => {
      transporter.verify((error: Error | null) => {
        if (error) {
          console.error(`${name} connection test failed:`, error.message);
        } else {
          console.log(`${name} connection test successful`);
        }
      });
    }, index * 1000); // Stagger tests to avoid overwhelming the server
  });
}

// Function to try sending email with fallback transporters
async function sendEmailWithFallback(mailOptions: any): Promise<SentMessageInfo> {
  let lastError: Error | null = null;
  const attempts: string[] = [];
  
  for (const { name, transporter } of transporters) {
    try {
      console.log(`🔄 Attempting to send email using ${name}...`);
      attempts.push(`Tried ${name}`);
      
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully using ${name}!`);
      console.log(`📧 Message ID: ${info.messageId}`);
      console.log(`📊 Attempts made: ${attempts.join(', ')}`);
      
      return info;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Failed to send email using ${name}: ${errorMsg}`);
      attempts.push(`${name} failed: ${errorMsg}`);
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      // Continue to next transporter
      continue;
    }
  }
  
  console.error(`🚫 All transporters failed. Attempts: ${attempts.join('; ')}`);
  throw lastError || new Error('All email transporters failed');
}

export async function POST(request: Request) {
  console.log('📨 Contact form submission received');
  
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    console.log('📋 Form data received:', { 
      name, 
      email, 
      subject: subject || '(no subject)',
      messageLength: message?.length || 0 
    });

    if (!message || !name || !email) {
      console.warn('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Check if email is configured
    if (!hasEmailCredentials || transporters.length === 0) {
      console.warn('⚠️ Email sending skipped: Email credentials not configured');
      return NextResponse.json(
        { 
          message: 'Message received but email delivery is not configured',
          warning: 'Email credentials are not set up'
        },
        { status: 200 }
      );
    }

    console.log(`🚀 Attempting to send email using ${transporters.length} available transporter(s)...`);

    // Create email content with formatted information
    const emailContent = `
      <h2>New Contact Form Message</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Contact Form: ${subject || `Message from ${name}`}`,
      text: `From: ${name}\nEmail: ${email}\n${subject ? `Subject: ${subject}\n` : ''}Message: ${message}`,
      html: emailContent
    };

    // Send email using fallback transporters
    const info: SentMessageInfo = await sendEmailWithFallback(mailOptions);
    console.log('🎉 Email sent successfully! Preparing success response...');

    return NextResponse.json(
      { 
        message: 'Message sent successfully',
        messageId: info.messageId 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('💥 Error in contact form handler:', error);
    
    let errorMessage = 'Failed to send message';
    let statusCode = 500;
    
    if (error instanceof Error) {
      console.error('🔍 Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack?.split('\n')[0] // Just first line of stack
      });
      
      // Provide specific error messages based on the error type
      if (error.message.includes('Invalid login') || error.message.includes('Authentication failed')) {
        errorMessage = 'Email authentication failed. Please check your Gmail App Password settings.';
        statusCode = 503;
      } else if (error.message.includes('Greeting never received') || error.message.includes('ETIMEDOUT')) {
        errorMessage = 'Email server connection timed out. This might be due to network restrictions or firewall settings.';
        statusCode = 503;
      } else if (error.message.includes('SMTP verification failed')) {
        errorMessage = 'Failed to connect to email server. Please check your internet connection.';
        statusCode = 503;
      } else if (error.message.includes('All email transporters failed')) {
        errorMessage = 'All email sending methods failed. Please check your Gmail settings and try again later.';
        statusCode = 503;
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { 
        message: errorMessage,
        error: error instanceof Error ? error.message : 'Unknown error',
        troubleshooting: {
          suggestion: 'Make sure you have generated a Gmail App Password and enabled 2FA on your account',
          link: 'https://support.google.com/accounts/answer/185833'
        }
      },
      { status: statusCode }
    );
  }
} 