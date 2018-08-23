import React, { Component } from 'react';
import RoomList from './components/RoomList';

import './App.css';

import * as firebase from 'firebase';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCuNcLzOua1z5YyAFiNC6qy9iR8rw5ReSw",
    authDomain: "bloc-io-wdt-bloc-chat-react.firebaseapp.com",
    databaseURL: "https://bloc-io-wdt-bloc-chat-react.firebaseio.com",
    projectId: "bloc-io-wdt-bloc-chat-react",
    storageBucket: "bloc-io-wdt-bloc-chat-react.appspot.com",
    messagingSenderId: "621366978109"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="app">
        <section className="main-menu">
          <h1>Bloc Chat</h1>
          <RoomList firebase={ firebase } />
        </section>
        <section className="chat-room">
          <h2>Chat Room Name</h2>
        </section>
      </div>
    );
  }
}

export default App;
