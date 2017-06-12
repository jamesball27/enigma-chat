import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import MessagesReducer from './messages_reducer';
import EnigmaReducer from './enigma_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  messages: MessagesReducer,
  enigma: EnigmaReducer
});

export default RootReducer;
