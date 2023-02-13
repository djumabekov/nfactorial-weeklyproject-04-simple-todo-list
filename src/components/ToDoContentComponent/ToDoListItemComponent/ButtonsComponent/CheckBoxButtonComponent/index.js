import React from 'react';

class CheckBoxButton extends React.Component {
  handleClickCheckItem = (e) => {
    if (this.props.currentActiveNavButtonId === 0) {
      this.props.handleClickCheckItem(e.target.id);
    }
  };
  render() {
    return (
      <input
        disabled={this.props.currentActiveNavButtonId !== 0 && ': true'}
        id={this.props.id}
        onClick={(e) => this.handleClickCheckItem(e)}
        type="button"
        className={'to-do-list-item-checkbox' + (this.props.isChecked ? ' checkbox-checked' : '')}
      />
    );
  }
}

export default CheckBoxButton;
