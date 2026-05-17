import io, { Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
    if (socket) {
        console.log('Socket already exists, returning existing instance.');
        return socket;
    }

    const serverUrl = (import.meta.env.VITE_SERVER_URL || 'http://localhost:2025').trim();
    console.log('Attempting to connect to socket server at:', serverUrl);

    socket = io(serverUrl, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
        console.log('Connected to server:', socket?.id);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    return socket;
};

export const getSocket = (): Socket | null => {
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
