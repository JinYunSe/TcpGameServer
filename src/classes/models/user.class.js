class User {
  // socket은 유저의 socket
  // id는 유저의 deviceId
  // playerId는 유저의 플레이어 Id,
  // latency는 유저의 클라이언트와 서버간 딜레이 시간
  constructor(socket, id, playerId, latency, coords) {
    this.socket = socket;
    this.id = id;
    this.playerId = playerId;
    this.latency = latency;
    this.x = coords.x;
    this.y = coords.y;
    this.lastUpdateTime = Date.now();
  }

  // 클라이언트의 위치 정보 업데이트
  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }
}

export default User;
