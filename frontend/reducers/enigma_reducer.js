import { RECEIVE_DEFAULT_ENIGMA,
         RECEIVE_NEW_ROTORS,
         RECEIVE_NEW_PLUGBOARD } from '../actions/enigma_actions';
import Rotor from '../util/enigma/rotor';
import Enigma from '../util/enigma/enigma';
import Plugboard from '../util/enigma/plugboard';

let rotors = [new Rotor(1, 0), new Rotor(2, 0), new Rotor(3, 0)];

const defaultLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let plugboard = new Plugboard(defaultLetters);

const defaultState = {
  enigma: new Enigma(...rotors, plugboard),
  rotor1: rotors[0],
  rotor2: rotors[1],
  rotor3: rotors[2],
  plugboard,
};

const EnigmaReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_DEFAULT_ENIGMA:
      return state;
    case RECEIVE_NEW_ROTORS:
      for (let rotor in action.rotors) {
        newState[rotor] = action.rotors[rotor];
      }

      const { rotor1, rotor2, rotor3 } = newState;
      newState.enigma = new Enigma(rotor1, rotor2, rotor3, newState.plugboard);
      return newState;
    case RECEIVE_NEW_PLUGBOARD:
      plugboard = new Plugboard(action.letters);
      newState.plugboard = plugboard;
      newState.enigma = new Enigma(newState.rotor1, newState.rotor2, newState.rotor3, plugboard);
      return newState;
    default:
      return state;
  }
};

export default EnigmaReducer;
