import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('Email credentials are not properly configured');
}

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  debug: true, // Enable debug logging
  logger: true // Enable logger
});

// Test the connection on startup
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

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { message: 'Message is required' },
        { status: 400 }
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