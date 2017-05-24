import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { logIn, signUp, logOut, receiveErrors } from '../actions/session_actions';
import Errors from './errors.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      formType: '',
      username: '',
      password: ''
    };

    this.openModal = this.openModal.bind(this);
    this.reset = this.reset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  openModal(formType) {
    return (e) => this.setState({ modalIsOpen: true, formType });
  }

  handleChange(property) {
    return (e) => this.setState({ [property]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const user = { username, password };

    if (this.state.formType === 'Log In') {
      this.props.logIn(user).then(() => this.reset());
    } else {
      this.props.signUp(user).then(() => this.reset());
    }
  }

  reset() {
    this.props.clearErrors();
    this.setState({
      modalIsOpen: false,
      formType: '',
      username: '',
      password: ''
    });
  }

  renderButtons() {
    if (this.props.currentUser) {
      return(
        <div className="header-right">
          <h4>Welcome { this.props.currentUser.username}</h4>
          <button onClick={ this.props.logOut }>Log Out</button>
        </div>
      );
    } else {
      return(
        <div className="header-right">
          <button onClick={ this.openModal('Log In') }>Log In</button>
          <button onClick={ this.openModal('Sign Up') }>Sign Up</button>
        </div>
      );
    }
  }

  render() {

    return(
      <header>
        <h1>Enigma Chat</h1>
        { this.renderButtons() }
        <Modal
           isOpen={ this.state.modalIsOpen }
           onRequestClose={ this.reset }
           contentLabel="Auth Form"
         >
          <h3>{ this.state.formType }</h3>
          <form onSubmit={ this.handleSubmit }>
            <Errors errors={ this.props.errors } />
            <input
              type="text"
              value={ this.state.username }
              placeholder="Username"
              onChange={ this.handleChange('username') }
            />
            <input
              type="password"
              value={ this.state.password }
              placeholder="Password"
              onChange={ this.handleChange('password')}
            />
            <input type="submit" value={ this.state.formType } />
          </form>
        </Modal>
      </header>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser,
  errors: session.errors
});

const mapDispatchToProps = dispatch => ({
  signUp: user => dispatch(signUp(user)),
  logIn: user => dispatch(logIn(user)),
  logOut: () => dispatch(logOut()),
  clearErrors: () => dispatch(receiveErrors([]))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
