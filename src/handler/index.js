import { HANDLER_IDS } from '../constants/handlerIds.js';
import locationUpdateHandler from './game/loactionUpdate.handler.js';
import initialHandler from './user/initial.hander.js';

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    handler: initialHandler,
    protoType: 'initial.InitialPayload',
  },
  [HANDLER_IDS.LOCATION_UPDATE]: {
    handler: locationUpdateHandler,
    protoType: 'game.LocationUpdatePayload',
  },
};

export const getHanderById = (handlerId) => {
  if (!handlers[handlerId]) throw Error();
  console.log('getProtoTypeNameByHandlerId : ', handlerId);
  return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  console.log('handlerId : ', handlers[handlerId]);
  if (!handlers[handlerId]) throw Error();
  console.log('getProtoTypeNameByHandlerId : ', handlerId);
  return handlers[handlerId].protoType;
};
