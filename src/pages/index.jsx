import React from 'react';
import logo from '../assets/logo.svg';
import Count from '../components/Count';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React + AntD!</p>
        <p>
          Edit <code>App.jsx</code> and save to reload.
        </p>
        <Count />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
