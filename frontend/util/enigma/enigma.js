class Enigma {
  constructor(rotor1, rotor2, rotor3) {
    this.rotor1 = rotor1;
    this.rotor2 = rotor2;
    this.rotor3 = rotor3;

    this.rotor1RotationCount = 0;
    this.rotor2RotationCount = 0;
    this.rotor3RotationCount = 0;
  }

  encryptMessage(message) {
    const messageWithoutSpaces = message.split(' ').join('');
    const encryptedMessage = [];

    for (let i = 0; i < messageWithoutSpaces.length; i++) {
      const letter = messageWithoutSpaces[i];
      encryptedMessage.push(this.encryptLetter(letter));
    }

    return encryptedMessage.join('');
  }

  encryptLetter(letter) {
    this.shiftRotors();

    // first pass through rotors
    let encryptedLetter = this.rotor1.encryptLetter(letter.toUpperCase());
    encryptedLetter = this.rotor2.encryptLetter(encryptedLetter);
    encryptedLetter = this.rotor3.encryptLetter(encryptedLetter);

    // hits reflector
    encryptedLetter = this.reflect(encryptedLetter);

    // second pass through rotors (inverted)
    encryptedLetter = this.rotor3.inverseEncryptLetter(encryptedLetter);
    encryptedLetter = this.rotor2.inverseEncryptLetter(encryptedLetter);
    encryptedLetter = this.rotor1.inverseEncryptLetter(encryptedLetter);

    return encryptedLetter;
  }

  shiftRotors() {
    this.rotor1RotationCount += 1;
    this.rotor1.offsetRotor(1);

    if (this.rotor1RotationCount === 26) {
      this.rotor2RotationCount += 1;
      this.rotor1RotationCount = 0;

      this.rotor2.offsetRotor(1);
    }

    if (this.rotor2RotationCount === 26) {
      this.rotor3RotationCount += 1;
      this.rotor2RotationCount = 0;

      this.rotor3.offsetRotor(1);
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
