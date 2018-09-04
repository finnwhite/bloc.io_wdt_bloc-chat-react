import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      messages: [],
      newMessage: ""
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

  handleCreateMessageChange( e ) {
    this.setState({ newMessage: e.target.value });
  }
  handleCreateMessageSubmit( e ) {
    e.preventDefault();
    const msg = this.state.newMessage;
    if ( !msg || !this.props.activeRoom ) { return }
    this.createMessage( msg );
    this.setState({ newMessage: "" });
  }
  createMessage( content ) {
    const room = this.props.activeRoom;
    const roomId = (room) ? room.__key : null;
    const user = this.props.user;
    const msg = {
      uid: user.uid,
      username: user.displayName,
      content: content,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: roomId
    };
    this.messagesRef.push( msg );
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
        <footer>
          <form
            id="createMessage"
            action=""
            method="POST"
            onSubmit={ (e) => this.handleCreateMessageSubmit(e) }
          >
            <label
              htmlFor="createMessage_content"
              className="labeltext-left"
              >Message:</label>
            <input type="text"
              id="createMessage_content"
              name="content"
              value={ this.state.newMessage }
              onChange={ (e) => this.handleCreateMessageChange(e) }
            />
            <button type="submit">Send</button>
          </form>
        </footer>
      </div>
    );
  }
}

export default MessageList;
