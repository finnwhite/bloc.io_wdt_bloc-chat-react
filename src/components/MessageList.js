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
    return (
      <div className="message-list">
        <header>
          <h2>Chat Room Name</h2>
        </header>
        { this.state.messages.map( ( msg, index ) => {
            return (
              <article key={ msg.__key } className="chat-message">
                <header>
                  <address className="chat-handle">{ msg.username }</address>
                  { this.renderTimestamp( msg.sentAt ) }
                </header>
                <p>{ msg.content }</p>
              </article>
            );
          } ) }
      </div>
    );
  }
}

export default MessageList;
