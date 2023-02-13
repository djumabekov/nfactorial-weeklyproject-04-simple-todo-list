import React from 'react';
import MenuButton from './MenuButtonComponent';

class MenuModalWindow extends React.Component {
  //перечень кнопок меню модального окна
  static menuButtons = [
    {
      id: 0,
      name: 'Move to Trash',
      img: 'trash',
    },
    {
      id: 1,
      name: 'Delete Forever',
      img: 'trash',
    },
    {
      id: 2,
      name: 'Move Back To To Do',
      img: 'back',
    },
  ];

  // функция возвращает отфильтрованный перечень меню в зависимости от текущей вкладки
  getFilteredMenuButtons = () => {
    const filteredMenuButtons = [];
    switch (this.props.currentActiveNavButtonId) {
      case 0:
      case 1:
        filteredMenuButtons.push(this.constructor.menuButtons[0]);
        break;
      case 2:
        filteredMenuButtons.push(this.constructor.menuButtons[1]);
        filteredMenuButtons.push(this.constructor.menuButtons[2]);
        break;
      default:
        break;
    }
    return filteredMenuButtons;
  };

  render() {
    return (
      this.props.isShowMenu && (
        <div className="to-do-list-menu-modal-window">
          {this.getFilteredMenuButtons().map((button, i) => (
            <MenuButton
              key={i}
              button={button}
              handleClickMenuItem={this.props.handleClickMenuItem}
            />
          ))}
        </div>
      )
    );
  }
}

export default MenuModalWindow;
