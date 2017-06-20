class Plugboard {
  constructor(row1, row2) {
    this.row1 = row1;
    this.row2 = row2;
  }

  encryptLetter(letter) {
    const index = this.row1.indexOf(letter);
    return this.row2[index];
  }
}

export default Plugboard;
