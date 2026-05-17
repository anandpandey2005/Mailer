import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

interface SMTPConfig {
    appName: string;
    appPassword: string;
    userEmail: string;
}

interface EmailRequestBody {
    emails: string[];
    subject: string;
    emailBody: string;
}

// Map: clientId -> SMTPConfig
export const clientSMTPConfigs = new Map<string, SMTPConfig>();

function sanitizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
    const sanitized = sanitizeEmail(email);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(sanitized);
}

// Helper function to add delay between sends 
function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// POST /api/send-emails - Send emails to parsed recipient list
router.post('/api/send-emails', async (req: Request, res: Response) => {
    const io = req.app.get('io');
    let transporter: nodemailer.Transporter | null = null;

    try {
        const clientId = req.query.clientId as string;

        console.log(`[${new Date().toISOString()}] Received email request for clientId: ${clientId}`);

        if (!clientId) {
            res.status(400).json({
                message: 'Missing clientId in query parameters'
            });
            return;
        }

        // Get SMTP configuration for this client
        const smtpConfig = clientSMTPConfigs.get(clientId);

        if (!smtpConfig) {
            console.error(`[${new Date().toISOString()}] SMTP config not found for client: ${clientId}`);
            res.status(400).json({
                message: 'SMTP configuration not found for this client. Please ensure socket is connected.'
            });
            return;
        }

        console.log(`[${new Date().toISOString()}] Using SMTP config for: ${smtpConfig.userEmail}`);

        let { emails, subject, emailBody } = req.body as EmailRequestBody;

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            res.status(400).json({
                message: 'Invalid or empty email list'
            });
            return;
        }

        console.log(`[${new Date().toISOString()}] Processing ${emails.length} emails`);

        if (!subject || !emailBody) {
            res.status(400).json({
                message: 'Subject and email body are required'
            });
            return;
        }

        const validEmails = emails
            .map((email) => sanitizeEmail(email))
            .filter((email, index, arr) => {
                return arr.indexOf(email) === index;
            })
            .filter((email) => {
                const valid = isValidEmail(email);
                if (!valid) {
                    console.warn(`[${new Date().toISOString()}] Invalid email format: ${email}`);
                }
                return valid;
            });

        console.log(`[${new Date().toISOString()}] Valid emails to send: ${validEmails.length}`);

        if (validEmails.length === 0) {
            res.status(400).json({
                message: 'No valid email addresses to send to',
                total: emails.length
            });
            return;
        }

        // Create transporter with SMTP config
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: smtpConfig.userEmail,
                pass: smtpConfig.appPassword,
            },
        });

        // Verify connection
        console.log(`[${new Date().toISOString()}] Verifying SMTP connection...`);
        try {
            await transporter.verify();
            console.log(`[${new Date().toISOString()}] SMTP connection verified successfully`);
        } catch (verifyError) {
            console.error(`[${new Date().toISOString()}] SMTP verification failed:`, verifyError);
            throw new Error(`SMTP authentication failed: ${verifyError instanceof Error ? verifyError.message : 'Unknown error'}`);
        }

        // Send emails with delay between sends 
        let sentCount = 0;
        let failedCount = 0;
        const successfulEmails: string[] = [];
        const errors: { email: string; error: string }[] = [];
        const delayMs = 500;

        for (let index = 0; index < validEmails.length; index++) {
            const recipientEmail = validEmails[index];

            try {
                console.log(`[${new Date().toISOString()}] Sending email ${index + 1}/${validEmails.length} to: ${recipientEmail}`);

                await transporter.sendMail({
                    from: `"${smtpConfig.appName}" <${smtpConfig.userEmail}>`,
                    to: recipientEmail,
                    subject: subject,
                    html: emailBody,
                });

                sentCount++;
                successfulEmails.push(recipientEmail);
                console.log(`[${new Date().toISOString()}] Email sent successfully to: ${recipientEmail}`);

                if (io) {
                    io.to(clientId).emit('email_progress', {
                        sent: sentCount,
                        failed: failedCount,
                        total: validEmails.length,
                        currentEmail: recipientEmail,
                        status: 'success'
                    });
                }

                // Add delay between sends 
                if (index < validEmails.length - 1) {
                    await delay(delayMs);
                }
            } catch (error) {
                failedCount++;
                const errorMsg = error instanceof Error ? error.message : 'Unknown error';
                console.error(`[${new Date().toISOString()}] Failed to send to ${recipientEmail}: ${errorMsg}`);
                errors.push({
                    email: recipientEmail,
                    error: errorMsg,
                });

                if (io) {
                    io.to(clientId).emit('email_progress', {
                        sent: sentCount,
                        failed: failedCount,
                        total: validEmails.length,
                        currentEmail: recipientEmail,
                        status: 'failed',
                        error: errorMsg
                    });
                }
            }
        }

        console.log(`[${new Date().toISOString()}] Email batch complete. Sent: ${sentCount}/${validEmails.length}`);

        res.json({
            message: `Emails sent successfully`,
            sent: sentCount,
            failed: failedCount,
            total: validEmails.length,
            skipped: emails.length - validEmails.length,
            successfulEmails,
            errors: errors.length > 0 ? errors.slice(0, 10) : undefined,
        });
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error in send-emails route:`, error);
        res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    } finally {
        // Ensure transporter is closed
        if (transporter) {
            try {
                transporter.close();
                console.log(`[${new Date().toISOString()}] SMTP transporter closed`);
            } catch (closeError) {
                console.error(`[${new Date().toISOString()}] Error closing transporter:`, closeError);
            }
        }
    }
});

export default router;
