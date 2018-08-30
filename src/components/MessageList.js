import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref( "messages" );
  }

  componentDidMount() {
    this.messagesRef.on( "child_added", ( snapshot ) => {
      const msg = snapshot.val();
      msg.__key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( msg ) });
    } );
  }

  renderTimestamp( dateValue ) {
    const stampDate = new Date( dateValue );
    const stamp = stampDate.toLocaleTimeString();
    return (
      <time className="timestamp">{ stamp }</time>
    );
  }

  render() {
    const room = this.props.activeRoom;
    const key = (room) ? room.__key : null;
    const messages = this.state.messages;
    const list = messages.filter( ( m ) => ( m.roomId === key ) );

    return (
      <div className="message-list">
        <header>
          { ( room )
            ?
            <h2>
              <i className="material-icons">chat</i>
              <span>{ room.name }</span>
            </h2>
            :
            <p className="nodata">No room selected</p>
          }
        </header>
        <section className="chat-message-list">
          { ( list.length )
            ?
            list.map( ( msg, index ) => {
              return (
                <article key={ index } className="chat-message">
                  <header>
                    <address className="chat-handle">{ msg.username }</address>
                    { this.renderTimestamp( msg.sentAt ) }
                  </header>
                  <p>{ msg.content }</p>
                </article>
              );
            } )
            :
            <p className="nodata">No messages to display.</p>
          }
        </section>
      </div>
    );
  }
}

export default MessageList;
