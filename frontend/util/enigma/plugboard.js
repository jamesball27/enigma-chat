class Plugboard {
  constructor(letters) {
    this.letters = letters;
  }

  encryptLetter(letter) {
    const index = this.letters.indexOf(letter);
    return index < 13 ? this.letters[index + 13] : this.letters[index - 13];
  }
}

export default Plugboard;
