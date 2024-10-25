export const packetNames = {
  common: {
    Packet: 'common.Packet',
    // packetNames의 common 키 안의 Packet 키에 따른 value로
    // common.proto 파일의 message Packet을 가져온다는 뜻
  },
  initial: {
    InitialPayload: 'initial.InitialPayload',
  },
  game: {
    LocationUpdatePayload: 'game.LocationUpdatePayload',
  },
  response: {
    Response: 'response.Response',
  },
  gameNotification: {
    LocationUpdate: 'gameNotification.LocationUpdate',
  },
};
