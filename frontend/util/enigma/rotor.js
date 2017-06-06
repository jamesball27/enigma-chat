class Rotor {
  constructor(rotorNumber, startingPosition) {
    this.startingPosition = startingPosition;
    this.setRotor(rotorNumber);

    this.alphabet =
      ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  }

  setRotor(rotorNumber) {
    const ROTOR_I =
      ['E','K','M','F','L','G','D','Q','V','Z','N','T','O','W','Y','H','X','U','S','P','A','I','B','R','C','J'];
    const ROTOR_II =
      ['A','J','D','K','S','I','R','U','X','B','L','H','W','T','M','C','Q','G','Z','N','P','Y','F','V','O','E'];
    const ROTOR_III =
      ['B','D','F','H','J','L','C','P','R','T','X','V','Z','N','Y','E','I','W','G','A','K','M','U','S','Q','O'];

    const ROTORS = {
      1: ROTOR_I,
      2: ROTOR_II,
      3: ROTOR_III
    };

    this.cipher = ROTORS[rotorNumber];
    this.offsetRotor(this.startingPosition);
  }

  offsetRotor(position) {
    const left = this.cipher.slice(0, position);
    const right = this.cipher.slice(position);

    this.cipher = right.concat(left);
  }

  encryptLetter(letter) {
    const index = this.alphabet.indexOf(letter);
    return this.cipher[index];
  }

  inverseEncryptLetter(letter) {
    const index = this.cipher.indexOf(letter);
    return this.alphabet[index];
  }
}

export default Rotor;
