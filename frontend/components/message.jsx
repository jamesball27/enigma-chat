import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.message.username,
      message: this.props.message.message
    };

    this.decryptMessage = this.decryptMessage.bind(this);
  }

  decryptMessage() {
    const decryptedMessage = this.props.decryptMessage(this.state.message);
    this.setState({ message: decryptedMessage });
  }

  renderClass() {
    if (this.state.username === this.props.currentUser.username) {
      return 'blue';
    }

    return 'red';
  }

  render() {
    return(
      <li className="message">
        <div>
          <span className={ this.renderClass() }>
            { this.state.username }:
          </span>
          { ' ' + this.state.message }
        </div>
        <button onClick={ this.decryptMessage } >Decrypt</button>
      </li>
    );
  }
}

export default Message;
