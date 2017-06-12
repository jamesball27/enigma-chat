import { RECEIVE_DEFAULT_ENIGMA } from '../actions/enigma_actions';
import Rotor from '../util/enigma/rotor';
import Enigma from '../util/enigma/enigma';

const defaultRotors = [
  new Rotor(1, 0),
  new Rotor(2, 0),
  new Rotor(3, 0)
];

const EnigmaReducer = (state = null, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_DEFAULT_ENIGMA:
      return new Enigma(...defaultRotors);
    // case RECEIVE_ROTORS:
    //   return Object.assign({}, state, action.rotors);
    default:
      return state;
  }
};

export default EnigmaReducer;
