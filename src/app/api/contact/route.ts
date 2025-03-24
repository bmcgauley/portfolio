import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

// Check if email credentials are available
const hasEmailCredentials = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);

// Create reusable transporter object using Gmail SMTP if credentials are available
const transporter = hasEmailCredentials 
  ? nodemailer.createTransport({
      service: 'gmail', // Use the predefined 'gmail' service instead of manual config
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false // Helps with some connection issues
      },
      debug: true, // Enable debug logging
      logger: true // Enable logger
    })
  : null;

// Test the connection on startup only if transporter exists
if (transporter) {
  transporter.verify((error: Error | null) => {
    if (error) {
      console.error('Initial SMTP connection test failed:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    } else {
      console.log('Initial SMTP connection test successful');
    }
  });
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { message: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if email is configured
    if (!hasEmailCredentials || !transporter) {
      console.warn('Email sending skipped: Email credentials not configured');
      return NextResponse.json(
        { 
          message: 'Message received but email delivery is not configured',
          warning: 'Email credentials are not set up'
        },
        { status: 200 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Message',
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`
    };

    // Send email
    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    let errorMessage = 'Failed to send message';
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
      
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Email server authentication failed. Please check your Gmail settings.';
      } else if (error.message.includes('SMTP verification failed')) {
        errorMessage = 'Failed to connect to email server. Please check your internet connection.';
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { 
        message: errorMessage,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 