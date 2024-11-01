import { createPingPacket } from '../../utils/notification/game.notification.js';

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
    this.lastX = 0;
    this.lastY = 0;
    this.lastUpdateTime = Date.now();
    this.speed = 3;
  }

  // 클라이언트의 위치 정보 업데이트
  updatePosition(x, y) {
    this.lastX = this.x;
    this.lastY = this.y;
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  ping() {
    const now = Date.now();
    this.socket.write(createPingPacket(now));
  }

  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;
    console.log(`${this.id} : ${this.latency}ms`);
  }

  calculatePosition(latency) {
    if (this.x === this.lastX && this.y === this.lastY) {
      return {
        x: this.x,
        y: this.y,
      };
    }
    // 위의 코드는 케릭터가 움직이지 않을 경우
    // 아래의 코드에 따라 계산이 발생하지 않게 해준다.
    // 이렇게 하지 않으면, 케릭터가 멈춰 있는 상태에서도
    // 계산된 값에 의해 위치가 변할 수 있는 오류를 방지할 수 있습니다.

    const timeDiff = (Date.now() - this.lastUpdateTime + latency) / 1000;
    // (현재 시간 - 마지막 업데이트 시간 + 네트워크 지연 시간) / 1000 으로
    // 초 단위로 경과 시간을 계산해줍니다.

    const distance = this.speed * timeDiff;
    // 이동 거리는 속도 * 경과 시간으로 계산한다.

    const directionX = this.x !== this.lastX ? Math.sign(this.x - this.lastX) : 0;
    // 현재 위치와 이전 위치가 다르다 => 이동 중이라면, Math.sign()을 사용해
    // 이동 방향을 가져온다. Math.sign()은 -1, 0, 1 중 하나가 나온다.

    const directionY = this.y !== this.lastY ? Math.sign(this.y - this.lastY) : 0;
    // 위와 동일하게 Y축 이동 방향 가져오기

    return {
      x: this.x + directionX * distance,
      // 현재 위치에 이동 방향으로 거리만큼 더해줍니다.
      y: this.y + directionY * distance,
      // 위와 동일하게 동작
    };
  }
}

export default User;
