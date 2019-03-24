import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_WEBSOCKET_URL);

export function subscribe(event, callback){
  socket.on(event, callback);
}

export function emit(event, payload){
  socket.emit(event, payload);
}

export function unsubscribe(event){
  socket.removeAllListeners(event);
}