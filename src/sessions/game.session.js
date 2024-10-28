import Game from '../classes/models/game.class.js';
import { gameSession } from './session.js';

export const addGameSession = (id) => {
  const session = new Game(id);
  gameSession.push(session);
  return session;
};

export const removeGameSession = () => {
  delete gameSession[0];
};

export const getGameSession = () => {
  return gameSession[0];
};
