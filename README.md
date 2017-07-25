# Enigma Chat
Enigma Chat is a real-time chat app (built with React/Redux, Ruby on Rails, and the Pusher WebSocket API) that allows you to send encrypted messages using the World War II era enigma encryption scheme.

[Enigma Chat Live]()

_NB: The Enigma cipher was famously cracked by Alan Turing and his colleagues at Bletchley Park in the 1940s. This app was built for fun should not be used to send any important or sensitive information._

## Implementation

### Enigma Cipher
The original Enigma machine used electrical currents to map letters to their corresponding encrypted version. When the operator keyed in a letter, the current passed through the plugboard, through three rotors, bounced off a reflector plate, and then passed through the rotors and plugboard in reverse. After each keypress the first rotor would rotate; after the first rotor made a complete revolution (26 turns), the second rotor would rotate, and the third once the second made a complete revolution (much like on odometer in a car). To simulate this encryption scheme, the `Enigma` class calls the `encryptLetter` method in each `Rotor` and `Plugboard`.

```js
// frontend/util/enigma/enigma.js

encryptLetter(letter) {
  let encryptedLetter = letter.toUpperCase();

  // first pass through plugboard
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

  // second pass through plugboard
  encryptedLetter = this.plugboard.encryptLetter(encryptedLetter);

  return encryptedLetter;
}
```

The security in the Enigma encryption comes from the modularity of the machine. Users can change the order of the rotors, the initial setting of each rotor, and the matching of letter pairs on the plugboard. This allows for trillions of different combinations of settings, making the code extremely difficult to decipher.

The genius of the Enigma scheme is that it is completely reciprocal; as long as the machines are configured the same way, encrypted text will be automatically decrypted when entered in the second machine. For example, if `"H"` is encrypted to `"M"` on the first machine, `"M"` will map to `"H"` on the second machine (if the settings are the same).

For more information on how the Enigma machine encrypted messages, check out some of these resources:

* https://www.youtube.com/watch?v=G2_Q9FoD-oQ
* https://www.theguardian.com/technology/2014/nov/14/how-did-enigma-machine-work-imitation-game
* http://www.codesandciphers.org.uk/enigma/

### Chat
Real-time chat is achieved by leveraging the Pusher API to establish a WebSocket connection between the user and Rails server. All messages are encrypted using the user's current `Enigma` settings before sending. A public chat room shows incoming messages from all users, and a user may decrypt any message. However, the decryption will only be successful if a user's machine settings are exactly the same as the settings of the user who sent the message.

## Future Directions
* Users must agree on the initial settings before sending message. There is currently not a secure way to do this through the app; users must communicate their settings through another medium. Perhaps add some sort of public/private key encryption or private messages to allow users to communicate directly.
* In some of the later Enigma machines, there were more than three rotors to choose from, allowing for many more combinations. More rotors would allow for an increased level of security.
