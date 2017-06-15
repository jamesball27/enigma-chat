import React from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import Rotor from '../util/enigma/rotor';

const SortableItem = SortableElement(({ value }) =>
  <li>{ value }</li>
);

const SortableList = SortableContainer(({ rotors }) => {
  return (
    <ul>
      {rotors.map((value, index) => (
        <SortableItem key={ `rotor-${index}` } index={ index } value={ value } />
      ))}
    </ul>
  );
});

class RotorSort extends React.Component {
  constructor(props) {
    super(props);

    this.state = { rotors: ['Rotor I', 'Rotor II', 'Rotor III'] };

    this.onSortEnd = this.onSortEnd.bind(this);
  }

  moveRotors(prevRotorNumbers) {
    const rotorsArray = this.state.rotors.map(rotorName => {
      const rotorNumber = rotorName.split(' ')[1].length;
      const prevRotorPosition = prevRotorNumbers.indexOf(rotorNumber);
      return new Rotor(rotorNumber, this.props.enigma[`rotor${prevRotorPosition + 1}`].startingPosition);
    });

    const rotors = {
      rotor1: rotorsArray[0],
      rotor2: rotorsArray[1],
      rotor3: rotorsArray[2]
    };

    this.props.receiveNewRotors(rotors);
  }

  onSortEnd({ oldIndex, newIndex }) {
    const prevRotorNumbers = this.state.rotors.map(rotorName => {
      return rotorName.split(' ')[1].length;
    });

    this.setState({
      rotors: arrayMove(this.state.rotors, oldIndex, newIndex)
    });

    this.moveRotors(prevRotorNumbers);
  }

  render() {
    return (
      <SortableList rotors={ this.state.rotors } onSortEnd={ this.onSortEnd } />
    );
  }
}

export default RotorSort;
