import React, { Component } from 'react';

import './RoomList.css';

class RoomList extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      rooms: [],
      newRoomName: ""
    };

    this.roomsRef = this.props.firebase.database().ref( "rooms" );
  }

  componentDidMount() {
    this.roomsRef.on( "child_added", ( snapshot, prevChildKey ) => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    } );
  }

  handleCreateRoomChange( e ) {
    this.setState({ newRoomName: e.target.value });
  }
  handleCreateRoomSubmit( e ) {
    e.preventDefault();
    const name = this.state.newRoomName;
    if ( !name ) { return }
    this.createRoom( name );
    this.setState({ newRoomName: "" });
  }
  createRoom( name ) {
    const room = { name: name };
    this.roomsRef.push( room );
  }

  render() {
    return (
      <div className="room-list">
        <ul>
          { this.state.rooms.map( ( room, index ) => {
            return (
              <li key={ room.key }>{ room.name }</li>
            );
          } ) }
        </ul>
        <form
          id="createRoom"
          action=""
          method="POST"
          onSubmit={ (e) => this.handleCreateRoomSubmit(e) }
        >
          <label htmlFor="createRoom_roomName">Room name:</label>
          <input type="text"
            id="createRoom_roomName"
            name="roomName"
            value={ this.state.newRoomName }
            onChange={ (e) => this.handleCreateRoomChange(e) }
          />
          <input type="submit" value="Create room" />
        </form>
      </div>
    );
  }
}

export default RoomList;
