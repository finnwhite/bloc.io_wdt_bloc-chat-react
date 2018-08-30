import React, { Component } from 'react';
import './MenuOption.css';

class MenuOption extends Component {
  constructor( props ) {
    super( props );
    this.state = { isActive: false };
  }

  handleSelect() {
    this.props.handleSelect( { value: this.props.value } );
  }

  render() {
    const selected = this.props.isSelected;
    const name = ( selected ) ? "menu-option-selected" : "menu-option";

    return (
      <div className={ name }
        onClick={ () => this.handleSelect() }
      >
        <div className="menu-option-label">
          <i className="material-icons md-18">{ this.props.icon }</i>
          <span>{ this.props.label }</span>
        </div>
        <div className="menu-option-actions">
          <i className="material-icons md-18">create</i>
          <i className="material-icons md-18">delete</i>
        </div>
      </div>
    );
  }
}

export default MenuOption;
