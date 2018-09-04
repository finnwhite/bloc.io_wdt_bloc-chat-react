import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase';
import User from './components/User';
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

    this.state = {
      user: this.getGuestUser(),
      activeRoom: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setUser( user );
      }
      else {
        this.setUser( this.getGuestUser() );
      }
    } );
  }

  setUser( user ) {
    this.setState( { user: user } );
  }
  getGuestUser() {
    return { displayName: "Guest", uid: "GUEST" };
  }

  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup( provider )
      .then( ( result ) => {
        console.log( "Sign-in successful: " + result.user.displayName )
      } )
      .catch( ( error ) => { console.log( error.toString() ) } );
  }
  signOut() {
    firebase.auth().signOut()
      .then( () => { console.log( "Sign-out successful" ) } )
      .catch( ( error ) => { console.log( error.toString() ) } );
  }

  selectRoom( e ) {
    const prev = this.state.activeRoom;
    const next = e.room;
    if ( !prev || ( next.__key !== prev.__key ) ) {
      this.setState( { activeRoom: next } );
    }
  }

  render() {
    const user = this.state.user;
    const isGuest = ( user.uid === this.getGuestUser().uid );
    
    return (
      <div className="app">
        <section className="main-menu">
          <header>
            <h1>Bloc Chat</h1>
            <User
              firebase={ firebase }
              user={ user }
              isSignedIn={ !isGuest }
              handleSignIn={ () => this.signIn() }
              handleSignOut={ () => this.signOut() }
            />
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
            user={ user }
            activeRoom={ this.state.activeRoom }
          />
        </section>
      </div>
    );
  }
}

export default App;
