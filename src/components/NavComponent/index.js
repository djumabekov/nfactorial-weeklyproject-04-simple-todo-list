import React from 'react';

class Nav extends React.Component {
  // название навигационных вкладок
  buttonNames = ['To Do', 'Done', 'Trash'];
  render() {
    return (
      <section className="nav">
        {this.buttonNames.map((buttonName, i) => (
          <input
            onClick={() => this.props.handleClickNavButton(i)}
            key={i}
            type="button"
            className={'nav-button' + (i === this.props.active ? ' nav-active' : '')}
            value={buttonName}
          />
        ))}
      </section>
    );
  }
}

export default Nav;
