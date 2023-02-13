import React from 'react';

class MenuButton extends React.Component {
  render() {
    return (
      <div
        onClick={() => this.props.handleClickMenuItem(this.props.button.id)}
        className="to-do-list-menu-modal-window-item">
        <div
          className={
            'to-do-list-menu-modal-window-item-img modal-window-item-img-' + this.props.button.img
          }
          alt=""></div>
        <div className="to-do-list-menu-modal-window-item-description">
          {this.props.button.name}
        </div>
      </div>
    );
  }
}

export default MenuButton;
