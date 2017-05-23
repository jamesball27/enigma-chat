import React from 'react';
import Header from './header';
import { Provider } from 'react-redux';

class Root extends React.Component {


  render() {
    return(
      <Provider store={this.props.store }>
        <Header />
      </Provider>
    );
  }
}

export default Root;
