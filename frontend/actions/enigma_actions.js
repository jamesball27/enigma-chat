export const RECEIVE_DEFAULT_ENIGMA = 'RECEIVE_DEFAULT_ENIGMA';

export const receiveDefaultEnigma = () => ({
  type: RECEIVE_DEFAULT_ENIGMA
});

export const RECEIVE_NEW_ROTORS = 'RECEIVE_NEW_ROTORS';

export const receiveNewRotors = rotors => ({
  type: RECEIVE_NEW_ROTORS,
  rotors
});

export const RECEIVE_NEW_PLUGBOARD = 'RECEIVE_NEW_PLUGBOARD';

export const receiveNewPlugboard = letters => ({
  type: RECEIVE_NEW_PLUGBOARD,
  letters
});
