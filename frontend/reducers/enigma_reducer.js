import { RECEIVE_DEFAULT_ENIGMA, RECEIVE_NEW_ROTORS } from '../actions/enigma_actions';
import Rotor from '../util/enigma/rotor';
import Enigma from '../util/enigma/enigma';

let rotors = [new Rotor(1, 0), new Rotor(2, 0), new Rotor(3, 0)];

const defaultState = {
  enigma: new Enigma(...rotors),
  rotor1: rotors[0],
  rotor2: rotors[1],
  rotor3: rotors[2],
};

const EnigmaReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_DEFAULT_ENIGMA:
      return state;
    case RECEIVE_NEW_ROTORS:
      const newState = Object.assign({}, state);

      for (let rotor in action.rotors) {
        newState[rotor] = action.rotors[rotor];
      }

      const { rotor1, rotor2, rotor3 } = newState;
      newState.enigma = new Enigma(rotor1, rotor2, rotor3);
      return newState;
    default:
      return state;
  }
};

export default EnigmaReducer;
