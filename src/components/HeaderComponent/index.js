import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="header">
          <div className="header-title">Simple To Do List</div>
          <div className="header-description">
            Today is awesome day. The weather is awesome, you are awesome too!
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
