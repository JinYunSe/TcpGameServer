import { CLIENT_VERSION } from '../../constants/env.js';
import { getProtoTypeNameByHandlerId } from '../../handler/index.js';
import { getProtosMessages } from '../../init/loadProto.js';

export const packetParser = (data) => {
  const protoMessages = getProtosMessages();

  const commonPacket = protoMessages.common.Packet;
  let packet;
  try {
    packet = commonPacket.decode(data);
  } catch (error) {
    console.error(error);
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.version;

  if (clientVersion !== CLIENT_VERSION) throw Error();

  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (protoTypeName) new Error();

  const [namespace, typeName] = protoTypeName.split('.');
  const payloadType = protoMessages[namespace][typeName];
  let payload;

  try {
    payload = payloadType.decode(packet.payload);
  } catch (error) {
    console.error(error);
  }

  const expectedFields = Object.keys(payloadType.fields);
  const acutalFields = Object.keys(payload);
  const missingFields = expectedFields.filter((field) => !acutalFields.includes(field));

  if (missingFields > 0) throw Error();

  return { handlerId, userId, payload };
};
