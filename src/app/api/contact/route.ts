import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'bmcgauley44@gmail.com',
    pass: 'uriv pybw mair nlf'
  },
  tls: {
    rejectUnauthorized: false // Helps with SSL certificate issues
  }
});

// Test the connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('Initial SMTP connection test failed:', error);
  } else {
    console.log('Initial SMTP connection test successful');
  }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    console.log('Received form submission:', { name, email, subject });

    // Validate input
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields');
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email content
    const mailOptions = {
      from: {
        name: name,
        address: 'bmcgauley44@gmail.com'
      },
      replyTo: email,
      to: 'bmcgauley44@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    console.log('Attempting to send email...');

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Detailed error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
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