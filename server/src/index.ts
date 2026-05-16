import env from 'dotenv'
env.config();
import app from './app'
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const PORT = process.env.PORT;

const server = createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});


io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    // Handle email sending events
    socket.on('email_sending', (data) => {
        console.log('Email sending:', data);
        io.emit('email_status', {
            message: `Started sending email: ${data.subject}`,
            timestamp: new Date()
        });
    });

    socket.on('email_success', (data) => {
        console.log('Email success:', data);
        io.emit('email_sent', {
            message: 'Emails sent successfully',
            data,
            timestamp: new Date()
        });
    });

    socket.on('email_failure', (data) => {
        console.log('Email failure:', data);
        io.emit('email_error', {
            message: `Error: ${data.error}`,
            timestamp: new Date()
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.set('io', io);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});