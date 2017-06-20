class Enigma {
  constructor(rotor1, rotor2, rotor3, plugboard) {
    this.rotor1 = rotor1;
    this.rotor2 = rotor2;
    this.rotor3 = rotor3;
    this.plugboard = plugboard;
  }

  encryptMessage(message) {
    const encryptedMessage = [];

    for (let i = 0; i < message.length; i++) {
      const letter = message[i];
      encryptedMessage.push(this.encryptLetter(letter));
    }

    return encryptedMessage.join('');
  }

  encryptLetter(letter) {
    let encryptedLetter = letter.toUpperCase();
    encryptedLetter = this.plugboard.encryptLetter(encryptedLetter);

    this.shiftRotors();

    // first pass through rotors
    encryptedLetter = this.rotor1.encryptLetter(encryptedLetter);
    encryptedLetter = this.rotor2.encryptLetter(encryptedLetter);
    encryptedLetter = this.rotor3.encryptLetter(encryptedLetter);

    // hits reflector
    encryptedLetter = this.reflect(encryptedLetter);

    // second pass through rotors (inverted)
    encryptedLetter = this.rotor3.inverseEncryptLetter(encryptedLetter);
    encryptedLetter = this.rotor2.inverseEncryptLetter(encryptedLetter);
    encryptedLetter = this.rotor1.inverseEncryptLetter(encryptedLetter);

    encryptedLetter = this.plugboard.encryptLetter(encryptedLetter);
    return encryptedLetter;
  }

  shiftRotors() {
    this.rotor1.offsetRotor(1);

    if (this.rotor1.startingPosition === 26) {
      this.rotor2.offsetRotor(1);
      this.rotor1.startingPosition = 0;
    }

    if (this.rotor2.startingPosition === 26) {
      this.rotor3.offsetRotor(1);
      this.rotor2.startingPosition = 0;
    }
  }

  reflect(letter) {
    const reflector = {
      'A': 'Y',
      'B': 'R',
      'C': 'U',
      'D': 'H',
      'E': 'Q',
      'F': 'S',
      'G': 'L',
      'H': 'D',
      'I': 'P',
      'J': 'X',
      'K': 'N',
      'L': 'G',
      'M': 'O',
      'N': 'K',
      'O': 'M',
      'P': 'I',
      'Q': 'E',
      'R': 'B',
      'S': 'F',
      'T': 'Z',
      'U': 'C',
      'V': 'W',
      'W': 'V',
      'X': 'J',
      'Y': 'A',
      'Z': 'T'
    };

    return reflector[letter];
  }
}

export default Enigma;
