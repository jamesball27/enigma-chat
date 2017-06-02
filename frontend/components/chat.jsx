import React from 'react';
import Pusher from 'pusher-js';
import { connect } from 'react-redux';
import { receiveMessage } from '../actions/message_actions';
import { createMessage } from '../util/message_api_util';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = { message: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderMessageClass = this.renderMessageClass.bind(this);
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

  handleChange(e) {
    e.preventDefault();
    this.setState({ message: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    createMessage(this.state);
    this.setState({ message: '' });
  }

  renderMessageClass(message) {
    if (this.props.currentUser) {
      if (message.username === this.props.currentUser.username) {
        return 'blue';
      }
    }

    return 'red';
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
          { this.props.messages.map((message, idx) => (
            <li key={ idx }>
              <span className={ this.renderMessageClass(message) }>
                { message.username }:
              </span>
              { message.message }
            </li>))
          }
        </ul>
        <form onSubmit={ this.handleSubmit }>
          <input className="message-input" type="text" value={ this.state.message } onChange={ this.handleChange } disabled={ disabled } placeholder="Enter message"/>
          <input className="submit" type="submit" value={ submitText} disabled={ disabled } />
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  receiveMessage: message => dispatch(receiveMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
