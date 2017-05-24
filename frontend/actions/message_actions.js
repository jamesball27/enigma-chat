import * as MessageApiUtil from '../util/message_api_util';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const createMessage = message => dispatch => {
  return MessageApiUtil.createMessage(message)
    .then(newMessage => dispatch(receiveMessage(newMessage)));
};
