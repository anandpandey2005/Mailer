# Email Sender Architecture - Complete Setup Guide

## Overview

The application now implements a **client-side parsing + server-side sending** architecture with per-client SMTP configuration management using Socket.io.

### Architecture Flow

```
CLIENT SIDE (Browser)
  ↓
1. User uploads file (PDF, XLSX, CSV)
  ↓
2. Web Worker parses emails in background
  ↓
3. User fills SMTP credentials & email content
  ↓
4. Form submission:
   a. Register SMTP config via Socket.io
   b. Send parsed emails + content via POST API
  ↓
SERVER SIDE (Node.js)
  ↓
1. Receive Socket.io event "register_smtp_config"
   → Store clientId → SMTP config mapping
  ↓
2. Receive POST request to /api/send-emails?clientId=xyz
   → Look up SMTP config for this clientId
   → Create nodemailer transporter
   → Send emails to all recipients
   → Return results
  ↓
3. On disconnect:
   → Delete SMTP config for that clientId
```

## Key Features

### 1. **Client-Side Email Parsing (Web Worker)**
- **File Support**: PDF, XLSX, CSV
- **Non-blocking**: Uses Web Worker to avoid UI freezing
- **Email Extraction**: Automatically extracts and validates email addresses
- **Output**: Array of valid email addresses sent to server

### 2. **Per-Client SMTP Configuration (Socket.io)**
- Each connected client gets unique SMTP credentials storage
- Credentials linked to Socket.io connection ID
- Automatically cleaned up on disconnect
- Secure: Server never stores credentials on disk

### 3. **Email Sending (POST API)**
- Endpoint: `POST /api/send-emails?clientId={socketId}`
- Request body:
  ```json
  {
    "emails": ["email1@example.com", "email2@example.com"],
    "subject": "Email Subject",
    "emailBody": "<h1>HTML Email Body</h1>"
  }
  ```
- Response includes: sent count, failed count, and errors (if any)

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Google Account with App Password (for Gmail SMTP)

### Server Setup

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your PORT (default: 2025)
   ```

3. **Start Server**
   ```bash
   npm run dev
   # Server will run on http://localhost:2025
   ```

### Client Setup

1. **Install Dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   # Client will run on http://localhost:5173
   ```

3. **Web Worker Configuration**
   - Web worker is automatically loaded at runtime
   - Ensure Vite is configured to handle `.ts` files in workers
   - No additional setup needed

## Using the Application

### Step 1: Connect to Server
- Client automatically connects to server via Socket.io on app load
- Check browser console for: `Connected to server: [socketId]`

### Step 2: Upload Email File
- Click file upload area
- Select CSV, XLSX, or PDF file
- Web Worker will parse emails in background
- UI shows success message with email count

### Step 3: Fill Form
- **App Name**: Your application/campaign name
- **Google App Password**: 16-character password from Google Account
- **Email Address**: Your Gmail address (sender)
- **Subject**: Email subject line
- **Body**: Email HTML content

### Step 4: Send Emails
- Click "SEND EMAILS" button
- Server retrieves your SMTP config using clientId
- Sends emails to all parsed recipients
- Displays results: success/failure counts and error details

## Google App Password Setup

To use Gmail SMTP:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to "App passwords"
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password
6. Paste into "Google App Password" field in the app

## Architecture Benefits

1. **Performance**: Web Workers prevent UI blocking during file parsing
2. **Security**: SMTP credentials never leave client → server in headers
3. **Scalability**: Per-client config storage scales with connections
4. **User Experience**: Real-time feedback on parsing and sending
5. **Error Handling**: Detailed error reporting per email failure

## API Reference

### Socket.io Events

**Client → Server**
```typescript
socket.emit('register_smtp_config', {
  appName: string,
  appPassword: string,
  userEmail: string
}, (response) => {
  // response: { success: boolean, message: string }
});
```

**Server → Client**
- Connection confirmation
- Error messages (if any)

### REST Endpoints

**POST /api/send-emails?clientId={socketId}**
- **Headers**: `Content-Type: application/json`
- **Body**: 
  ```json
  {
    "emails": string[],
    "subject": string,
    "emailBody": string
  }
  ```
- **Response**:
  ```json
  {
    "message": "Emails sent successfully",
    "sent": number,
    "failed": number,
    "total": number,
    "errors": [{ email: string, error: string }]
  }
  ```

## Troubleshooting

### "SMTP configuration not found"
- Ensure Socket.io connection is established
- Verify you clicked "SEND EMAILS" after filling the form
- Check browser console for connection errors

### "Invalid email format"
- Email addresses must follow standard format (user@domain.com)
- Supported file types: CSV, XLSX, PDF
- CSV should have emails in columns or rows

### Connection Issues
- Verify server is running on port 2025
- Check CORS origin in server/src/index.ts
- Clear browser cache and reload

### Email Sending Failures
- Verify Google App Password is correct (16 characters)
- Confirm Gmail address is accurate
- Check recipient email format
- Ensure no email filter rules are blocking

## File Format Examples

**CSV Format**
```
email1@example.com,email2@example.com
email3@example.com,email4@example.com
```

**XLSX Format**
- Column A: email1@example.com
- Column B: email2@example.com
- etc.

**PDF Format**
- Any PDF containing emails will be extracted
- Uses regex pattern to find valid emails

## Future Enhancements

- [ ] Batch processing for large email lists
- [ ] Email templates library
- [ ] Scheduled sending
- [ ] Delivery tracking
- [ ] Retry logic for failed emails
- [ ] Multiple SMTP providers (not just Gmail)
- [ ] Attachment support
- [ ] Rate limiting per client
