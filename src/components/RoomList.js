import React, { Component } from 'react';

class RoomList extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      rooms: []
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

  render() {
    return (
      <ul className="room-list">
        { this.state.rooms.map( ( room, index ) => {
          return (
            <li key={ room.key }>{ room.name }</li>
          );
        } ) }
      </ul>
    );
  }
}

export default RoomList;
