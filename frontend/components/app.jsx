import React from 'react';
import Header from './header';
import Chat from './chat';
import Enigma from './enigma';

const App = props => {

  return (
    <div>
      <Header />
      <Chat />
      <Enigma />
    </div>
  );
};

export default App;
