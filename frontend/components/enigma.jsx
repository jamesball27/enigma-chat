import React from 'react';
import { connect } from 'react-redux';
import { receiveDefaultEnigma } from '../actions/enigma_actions';

class Enigma extends React.Component {

  componentWillMount() {
    this.props.receiveDefaultEnigma();
  }

  render() {
    return(
      <div>
        Enigma here
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
