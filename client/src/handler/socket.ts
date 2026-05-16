import io, { Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
    if (socket) return socket;

    socket = io('http://localhost:2025', {
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

export const emitEmailEvent = (eventName: string, data: any) => {
    if (socket && socket.connected) {
        socket.emit(eventName, data);
    }
};

export const onEmailEvent = (eventName: string, callback: (data: any) => void) => {
    if (socket) {
        socket.on(eventName, callback);
    }
};
