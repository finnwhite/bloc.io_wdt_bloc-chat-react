import React, { Component } from 'react';
import './RoomList.css';

import MenuOption from './MenuOption';

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
    this.roomsRef.on( "child_added", ( snapshot ) => {
      const room = snapshot.val();
      room.__key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    } );
  }

  handleMenuSelect( e ) {
    this.props.handleSelectRoom( { room: e.value } );
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
    const room = this.props.activeRoom;
    const key = (room) ? room.__key : null;

    return (
      <div className="room-list">
        <ul className="chat-rooms">
          { this.state.rooms.map( ( room, index ) => {
            return (
              <li key={ index }>
                <MenuOption
                  icon="chat"
                  label={ room.name }
                  value={ room }
                  isSelected={ ( room.__key === key ) }
                  handleSelect={ ( e ) => this.handleMenuSelect( e ) }
                />
              </li>
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
