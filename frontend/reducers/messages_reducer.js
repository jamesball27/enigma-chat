import { RECEIVE_MESSAGE } from '../actions/message_actions';

const defaultState = {
  messages: []
};

const MessagesReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_MESSAGE:
      const newState = Object.assign({}, state);
      newState.messages.push(action.message);
      return newState;
    default:
      return state;
  }
};

export default MessagesReducer;
