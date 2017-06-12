import React from 'react';
import { connect } from 'react-redux';
import { receiveDefaultEnigma } from '../actions/enigma_actions';
import Rotor from './rotor';

class Enigma extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.receiveDefaultEnigma();
  }

  render() {
    if (!this.props.enigma) {
      return <div></div>;
    }

    return(
      <div className="enigma">
        <h4>Rotor I</h4>
        <Rotor rotor={ this.props.enigma.rotor1 } />
        <h4>Rotor II</h4>
        <Rotor rotor={ this.props.enigma.rotor2 } />
        <h4>Rotor III</h4>
        <Rotor rotor={ this.props.enigma.rotor3 } />
      </div>
    );
  }
}

const mapStateToProps = ({ enigma }) => ({
  enigma
});

const mapDispatchToProps = dispatch => ({
  receiveDefaultEnigma: () => dispatch(receiveDefaultEnigma())
});

export default connect(mapStateToProps, mapDispatchToProps)(Enigma);
