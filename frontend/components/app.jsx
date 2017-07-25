import React from 'react';
import Header from './header';
import Chat from './chat';
import Enigma from './enigma';
import Instructions from './instructions';

const App = props => {
  return (
    <div>
      <Header />
      <Chat />
      <Enigma />
      <Instructions />
    </div>
  );
};

export default App;
