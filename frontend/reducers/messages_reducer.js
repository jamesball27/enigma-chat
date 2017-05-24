import { RECEIVE_MESSAGE } from '../actions/message_actions';

const MessagesReducer = (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_MESSAGE:
      const newState = Object.assign([], state);
      newState.push(action.message);
      return newState;
    default:
      return state;
  }
};

export default MessagesReducer;
