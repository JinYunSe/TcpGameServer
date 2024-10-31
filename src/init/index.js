import { addGameSession } from '../sessions/game.session.js';
import { testConnection } from '../utils/db/testConnection.js';
import { loadProtos } from './loadProto.js';
import { v4 as uuid4 } from 'uuid';

const initServer = async () => {
  try {
    await loadProtos();
    const gameId = uuid4();
    const gameSession = addGameSession(gameId);
    await testConnection();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default initServer;
