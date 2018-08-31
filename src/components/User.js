import React, { Component } from 'react';
import './User.css';

class User extends Component {
  render() {
    return (
      <div className="user-auth">
        <div className="user-auth-info">
          <i className="material-icons md-18">person</i>
          <span className="chat-handle">{ this.props.user.displayName }</span>
        </div>
        <div className="user-auth-actions">
          { ( this.props.isSignedIn )
            ?
            <button onClick={ () => this.props.handleSignOut() }>
              <span>Sign out</span>
              <i className="material-icons md-18">close</i>
            </button>
            :
            <button onClick={ () => this.props.handleSignIn() }>
              <span>Sign in</span>
              <i className="material-icons md-18">open_in_new</i>
            </button>
          }
        </div>
      </div>
    );
  }
}

export default User;
