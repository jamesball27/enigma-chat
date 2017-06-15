import React from 'react';
import Pusher from 'pusher-js';
import { connect } from 'react-redux';
import { receiveMessage } from '../actions/message_actions';
import { createMessage } from '../util/message_api_util';
import { receiveNewRotors } from '../actions/enigma_actions';
import Rotor from '../util/enigma/rotor';
import Message from './message';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = { message: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.decryptMessage = this.decryptMessage.bind(this);
  }

  componentWillMount() {
    this.pusher = new Pusher('2dc685679e4817020228');
    this.chat = this.pusher.subscribe('enigma-chat');
  }

  componentDidMount() {
    this.chat.bind('new_message', (message) => {
      this.props.receiveMessage(message);
    }, this);
  }

  encryptMessage(message) {
    const encryptedMessage = this.props.enigma.enigma.encryptMessage(message);

    const rotors = {
      rotor1: new Rotor(1, this.props.enigma.rotor1.startingPosition),
      rotor2: new Rotor(2, this.props.enigma.rotor2.startingPosition),
      rotor3: new Rotor(3, this.props.enigma.rotor3.startingPosition)
    };

    this.props.receiveNewRotors(rotors);
    return encryptedMessage;
  }

  decryptMessage(message) {
    return this.encryptMessage(message);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ message: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const encryptedMessage = this.encryptMessage(this.state.message);
    createMessage({ message: encryptedMessage });
    this.setState({ message: '' });
  }

  render() {
    let disabled = true,
        submitText = 'Log In to Send a Message';

    if (this.props.currentUser) {
      disabled = false;
      submitText = 'Send';
    }

    return(
      <section className="chat">
        <ul className="messages">
          {
            this.props.messages.map((message, idx) =>
              <Message
                key={ idx }
                message={ message }
                currentUser={ this.props.currentUser }
                decryptMessage={ this.decryptMessage }
              />
            )
          }
        </ul>
        <form onSubmit={ this.handleSubmit }>
          <input
            className="message-input"
            type="text"
            value={ this.state.message }
            onChange={ this.handleChange }
            disabled={ disabled }
            placeholder="Enter message"
          />
          <input
            className="submit"
            type="submit"
            value={ submitText}
            disabled={ disabled }
          />
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
  currentUser: state.session.currentUser,
  enigma: state.enigma
});

const mapDispatchToProps = dispatch => ({
  receiveMessage: message => dispatch(receiveMessage(message)),
  receiveNewRotors: rotors => dispatch(receiveNewRotors(rotors))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
