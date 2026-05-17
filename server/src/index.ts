import env from 'dotenv'
env.config();
import app from './app'
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { clientSMTPConfigs } from './routes/emailRoutes';

const PORT = process.env.PORT || 2025;

const server = createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

interface ClientConfig {
    appName: string;
    appPassword: string;
    userEmail: string;
}

io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    // Handle SMTP configuration registration
    socket.on('register_smtp_config', (config: ClientConfig, callback) => {
        try {
            console.log(`Registering SMTP config for client ${socket.id}`);

            if (!config.appName || !config.appPassword || !config.userEmail) {
                console.error('Invalid SMTP configuration');
                if (callback) {
                    callback({ success: false, message: 'Invalid configuration' });
                }
                return;
            }
            // Store SMTP config for this client
            clientSMTPConfigs.set(socket.id, {
                appName: config.appName,
                appPassword: config.appPassword,
                userEmail: config.userEmail,
            });

            console.log(`SMTP config registered for client ${socket.id}`);

            if (callback) {
                callback({ success: true, message: 'SMTP config registered' });
            }
        } catch (error) {
            console.error('Error registering SMTP config:', error);
            if (callback) {
                callback({
                    success: false,
                    message: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        clientSMTPConfigs.delete(socket.id);
    });

    socket.on('submit_form', (data) => {
        console.log(`Received form from ${socket.id}:`, {
            appName: data.appName,
            userEmail: data.userEmail,
        });
    });

    socket.on('error', (error) => {
        console.error(`Socket error for ${socket.id}:`, error);
    });

    app.set('io', io);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
