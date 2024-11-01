import { removeUser } from '../sessions/user.session.js';
import { getGameSession } from '../sessions/game.session.js';

export const onError = (socket) => async (error) => {
  console.error(`오류 : 클라이언트 연결이 종료되었습니다.`);

  await removeUser(socket);

  const gameSession = getGameSession();
  gameSession.removeUser(socket);
};
