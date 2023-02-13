import React from 'react';

class ShowMenuButton extends React.Component {
  render() {
    return (
      <input
        id={this.props.id}
        onClick={(e) => this.props.handleClickShowMenu(e.target.id)}
        type="button"
        className="to-do-list-item-menu-button"
      />
    );
  }
}

export default ShowMenuButton;
