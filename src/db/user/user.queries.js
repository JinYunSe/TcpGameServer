export const USER_QUERIES = {
  FIND_USER_BY_DEVICE_ID: 'SELECT * FROM user WHERE device_id = ?',
  CREATE_USER: 'INSERT INTO user (device_id) VALUES (?)',
  UPDATE_USER_LOGIN: 'UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE device_id = ?',
  UPDATE_USER_LOCATION: 'UPDATE user SET x_coord = ?, y_coord = ? WHERE device_id = ?',
};

// SQL QUEREY에서 ?의 위치는 다른 user.db.js 파일에서
// USER_QUERIES 객체가 import 돼
// USER_QUERIES 객체의 KEY에 따른 VALUES로 SQL QUEREY가
// 호출될 경우

// ex) await dbPool.query(USER_QUERIES.UPDATE_USER_LOCATION, [x, y, deviceId]);
// 정리하면 => dbPool.query('UPDATE user SET x_coord = ?, y_coord = ? WHERE device_id = ?', [x,y,deviceId]) 가 돼
// '?' 순서대로 x, y, deviceId가 대응되게 만들어줍니다.
