import React from 'react';
import { connect } from 'react-redux';
import { receiveDefaultEnigma, receiveNewRotors } from '../actions/enigma_actions';
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
        <Rotor rotor={ this.props.enigma.rotor1 } rotorNumber="1" receiveNewRotors={ this.props.receiveNewRotors } />
        <h4>Rotor II</h4>
        <Rotor rotor={ this.props.enigma.rotor2 } rotorNumber="2" receiveNewRotors={ this.props.receiveNewRotors }/>
        <h4>Rotor III</h4>
        <Rotor rotor={ this.props.enigma.rotor3 } rotorNumber="3" receiveNewRotors={ this.props.receiveNewRotors }/>
      </div>
    );
  }
}

const mapStateToProps = ({ enigma }) => ({
  enigma
});

const mapDispatchToProps = dispatch => ({
  receiveDefaultEnigma: () => dispatch(receiveDefaultEnigma()),
  receiveNewRotors: rotors => dispatch(receiveNewRotors(rotors))
});

export default connect(mapStateToProps, mapDispatchToProps)(Enigma);
