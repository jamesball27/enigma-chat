import React from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';


const PlugItem = SortableElement(({ value }) =>
  <li>{ value }</li>
);

const PlugList = SortableContainer(({ letters }) => {
  return (
    <ul className="plug-list">
      {letters.map((value, index) => (
        <PlugItem key={ index } index={ index } value={ value } />
      ))}
    </ul>
  );
});

class Plugboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { letters: props.letters };
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      letters: arrayMove(this.state.letters, oldIndex, newIndex)
    });

    this.props.receiveNewPlugboard(this.state.letters);
  }

  render() {
    return (
      <PlugList
        letters={ this.state.letters }
        onSortEnd={ this.onSortEnd }
        axis="xy"
      />
    );
  }
}

export default Plugboard;
