import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  constructor( props ) {
    super( props );
    this.state = { activeRoom: null };
  }

  selectRoom( e ) {
    const prev = this.state.activeRoom;
    const next = e.room;
    if ( !prev || ( next.__key !== prev.__key ) ) {
      this.setState( { activeRoom: next } );
    }
  }

  render() {
    return (
      <div className="app">
        <section className="main-menu">
          <header>
            <h1>Bloc Chat</h1>
          </header>
          <RoomList
            firebase={ firebase }
            activeRoom={ this.state.activeRoom }
            handleSelectRoom={ ( e ) => this.selectRoom( e ) }
          />
        </section>
        <section className="chat-window">
          <MessageList
            firebase={ firebase }
            activeRoom={ this.state.activeRoom }
          />
        </section>
      </div>
    );
  }
}

export default App;
