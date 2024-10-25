import { onData } from './onData.js';
import { onEnd } from './onEnd.js';
import { onError } from './onError.js';

export const onConnection = (socket) => {
  console.log(`Client connected from : ${socket.remoteAddress}:${socket.remotePort}`);

  socket.buffer = Buffer.alloc(0);
  // socket 객체에 buffer라는 key를 만들어주고,
  // Buffer.alloc를 이용해 크기가 0인 버퍼를 가지게 만듭니다.

  socket.on('data', onData(socket));
  socket.on('end', onEnd(socket));
  socket.on('error', onError(socket));
};
