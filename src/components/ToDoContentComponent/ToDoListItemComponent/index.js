import React from 'react';
import ShowMenuButton from './ButtonsComponent/ShowMenuButtonComponent';
import CheckBoxButton from './ButtonsComponent/CheckBoxButtonComponent';

class ToDoListItem extends React.Component {
  render() {
    return (
      <li className="to-do-list-item">
        <ShowMenuButton
          id={this.props.item.id}
          handleClickShowMenu={this.props.handleClickShowMenu}
        />
        <CheckBoxButton
          id={this.props.item.id}
          handleClickCheckItem={this.props.handleClickCheckItem}
          isChecked={this.props.item.isChecked}
          currentActiveNavButtonId={this.props.currentActiveNavButtonId}
        />
        <div
          className={
            'to-do-list-item-description ' +
            (this.props.item.isChecked ? 'description-cross-out' : '')
          }>
          {this.props.item.description}
        </div>
      </li>
    );
  }
}

export default ToDoListItem;
