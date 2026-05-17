# Quick Start Guide - Email Sender Application

## What's New ✨

Your email application now has a **complete refactored architecture**:

1. **Web Worker for Email Parsing** ⚙️
   - Client-side parsing of PDF, XLSX, CSV files
   - Non-blocking UI using Web Worker technology
   - Automatic email extraction and validation

2. **Per-Client SMTP Configuration** 🔐
   - Socket.io connection establishes client identity
   - SMTP credentials stored per client in server memory
   - Auto-cleanup on disconnect

3. **POST API Endpoint** 📤
   - `/api/send-emails?clientId={id}` endpoint
   - JSON-based request/response
   - Detailed success/failure reporting

## Quick Start (5 minutes)

### Terminal 1: Start Server
```bash
cd server
npm run dev
# Server running on http://localhost:2025
```

### Terminal 2: Start Client
```bash
cd client
npm run dev
# Client running on http://localhost:5173
```

### In Browser:

1. **Open** http://localhost:5173
2. **Upload** a CSV/XLSX/PDF file with email addresses
3. **Wait** for "Successfully parsed X email(s)" message
4. **Fill** the form:
   - App Name: Any name (e.g., "My Campaign")
   - Google App Password: Your 16-char password
   - Email Address: Your Gmail
   - Subject: Email subject
   - Body: HTML email content
5. **Click** "SEND EMAILS"

## Data Flow Diagram

```
┌──────────────────────┐
│   USER UPLOADS FILE  │
└──────────────┬───────┘
               │
               ▼
┌──────────────────────────────────┐
│   WEB WORKER PARSES EMAILS       │
│   (Background, non-blocking)     │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│   USER FILLS FORM & SUBMITS      │
└──────────┬───────────────────────┘
           │
           ├─── Socket.io: register_smtp_config
           │    └─> Server stores: ClientID → SMTP Config
           │
           └─── POST /api/send-emails?clientId=xxx
                ├─> Server looks up SMTP config
                ├─> Creates nodemailer transporter
                ├─> Sends all emails
                └─> Returns results

```

## File Structure

```
server/
├── src/
│   ├── index.ts          ← Socket.io event handlers
│   ├── app.ts            ← Express setup + middleware
│   └── routes/
│       └── emailRoutes.ts ← POST endpoint + email sending
│
client/
├── src/
│   ├── worker/
│   │   └── pdfParserWorker.ts  ← Email parsing logic
│   ├── components/forms/
│   │   └── MainSendEmail.tsx   ← UI + form handling
│   └── handler/
│       └── socket.ts           ← Socket.io connection
```

## Key Implementation Details

### 1. Web Worker (Client)
```typescript
// pdfParserWorker.ts
- Parses CSV/XLSX/PDF files
- Extracts valid email addresses
- Returns: { emails: string[], error?: string }
```

### 2. Socket.io Event (Client → Server)
```typescript
socket.emit('register_smtp_config', {
  appName: "My Campaign",
  appPassword: "xxxx xxxx xxxx xxxx",
  userEmail: "user@gmail.com"
})
```

### 3. Email Sending API (Client → Server)
```
POST http://localhost:2025/api/send-emails?clientId=abc123
Content-Type: application/json

{
  "emails": ["user1@example.com", "user2@example.com"],
  "subject": "Hello",
  "emailBody": "<h1>Email content</h1>"
}

Response:
{
  "message": "Emails sent successfully",
  "sent": 2,
  "failed": 0,
  "total": 2
}
```

## Important Notes ⚠️

1. **Google App Password** (not your regular password)
   - Required for Gmail SMTP
   - Get it from: Google Account → Security → App passwords
   - 16 characters

2. **Socket Connection Required**
   - Server must receive Socket.io event before API call
   - Check browser console: "Connected to server: [socketId]"

3. **Client Isolation**
   - Each connected client has separate SMTP config
   - Configs auto-delete on disconnect

4. **Email Validation**
   - Invalid emails are skipped
   - Errors reported in response

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "SMTP config not found" | Ensure Socket connection is active (check console) |
| "Invalid email format" | Ensure file has valid emails (name@domain.com) |
| Connection refused | Check server is running on port 2025 |
| CORS errors | Verify client URL is http://localhost:5173 |
| Email not sending | Verify 16-char app password is correct |

## Testing Checklist

- [ ] Server starts without errors: `npm run dev` in `/server`
- [ ] Client starts without errors: `npm run dev` in `/client`
- [ ] Browser console shows: "Connected to server: [socketId]"
- [ ] File upload triggers web worker
- [ ] File parsing shows success message with email count
- [ ] Form submission sends POST request
- [ ] Response shows sent/failed email counts
- [ ] Check server logs for "Registering SMTP config for client..."

## Environment Setup

### Server `.env` (optional)
```
PORT=2025
NODE_ENV=development
```

### Required Packages
- Server: `express`, `socket.io`, `nodemailer`, `cors`
- Client: `react`, `socket.io-client`

## Next Steps

After verifying everything works:

1. **Add Email Templates** - Pre-built HTML templates
2. **Add Scheduling** - Send emails at specific times
3. **Add Analytics** - Track delivery status
4. **Add Rate Limiting** - Prevent abuse
5. **Add Database** - Persist sent email records

---

**Questions?** Check [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.
