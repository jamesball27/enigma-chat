import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import MessagesReducer from './messages_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  messages: MessagesReducer
});

export default RootReducer;
