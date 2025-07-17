# Email Configuration Guide

## Gmail App Password Setup

Your contact form uses Gmail SMTP to send emails. Here's how to set it up properly:

### Prerequisites
1. **Enable 2-Factor Authentication (2FA)** on your Gmail account
2. **Generate an App Password** specifically for this application

### Step-by-Step Setup

#### 1. Enable 2-Factor Authentication
- Go to [Google Account Security](https://myaccount.google.com/security)
- Under "How you sign in to Google", click "2-Step Verification"
- Follow the prompts to enable 2FA

#### 2. Generate App Password
- Go to [Google Account Security](https://myaccount.google.com/security)
- Under "How you sign in to Google", click "2-Step Verification"
- Scroll down and click "App passwords"
- Select "Mail" as the app and "Other (Custom name)" as the device
- Name it something like "Portfolio Contact Form"
- Copy the generated 16-character password

#### 3. Update Your .env File
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
```

**Important Notes:**
- Use the App Password, NOT your regular Gmail password
- Remove any spaces from the App Password
- Keep your .env file secure and never commit it to version control

### Current Configuration
The contact form now uses multiple fallback methods:
1. **Primary**: Gmail SMTP on port 587 with STARTTLS
2. **Fallback**: Gmail SMTP on port 465 with SSL

### Troubleshooting

#### "Greeting never received" or "ETIMEDOUT" errors
This usually means:
- Your ISP blocks outbound SMTP connections
- Firewall blocking port 587/465
- Network connectivity issues

**Solutions:**
1. Try using a different network (mobile hotspot)
2. Check if your ISP allows SMTP connections
3. Contact your hosting provider if deploying to production

#### "Authentication failed" errors
- Double-check your App Password
- Ensure 2FA is enabled
- Regenerate the App Password if needed

#### Alternative Email Services
If Gmail continues to have issues, consider:
- **SendGrid** (recommended for production)
- **Mailgun**
- **Amazon SES**
- **Outlook SMTP**

### Testing the Configuration
The API route will automatically test connections on startup and log the results. Check your console for:
- "Gmail SMTP (587) connection test successful"
- "Gmail SMTP (465) connection test successful"

### Production Deployment
For production deployment:
1. Use environment variables on your hosting platform
2. Consider using a dedicated email service like SendGrid
3. Set up proper error monitoring
4. Test email delivery thoroughly

### Security Best Practices
- Never expose your App Password in client-side code
- Use environment variables for all sensitive data
- Regenerate App Passwords periodically
- Monitor for unauthorized access to your Gmail account
