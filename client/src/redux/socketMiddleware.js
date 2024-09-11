// socketMiddleware.js
import {io} from 'socket.io-client';
import {setSocketConnection} from './userSlice';

const socketMiddleware = store => next => action => {
    if (action.type === 'user/setSocketConnection') {
        const socketConnection = io(process.env.REACT_APP_SERVER_URL);
        action.payload = socketConnection;
        socketConnection.on('disconnect', () => {
            store.dispatch({type: 'user/disconnectSocket'});
        });
    }
    return next(action);
};

export default socketMiddleware;