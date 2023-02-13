import React from 'react';
import Footer from '../FooterComponent';
import Header from '../HeaderComponent';
import Nav from '../NavComponent/';
import ToDoContent from '../ToDoContentComponent/';
import MenuModalWindow from '../MenuModalWindowComponent/';

class Home extends React.Component {
  // статусы списка задач
  static statuses = Object.freeze({
    TODO: 0,
    DONE: 1,
    TRASH: 2,
    DELETE: 3,
  });

  constructor() {
    super();

    this.state = {
      currentActiveNavButtonId: this.constructor.statuses.TODO, // текущая активная вкладка (по умолчанию первая)
      isShowMenu: false, // переключатель показа модального окна меню (по умолчанию скрыта)
      menuItemId: -1, // id нажатой кнопки модального окна меню (по умолчанию никакая кнопка не нажата)

      // список задач
      toDoList: [
        {
          id: 0,
          description: 'Write Essay',
          status: this.constructor.statuses.TODO,
          isChecked: false,
        },
        {
          id: 1,
          description: 'One Hour CSS Course Online',
          status: this.constructor.statuses.TODO,
          isChecked: false,
        },
        {
          id: 2,
          description: 'Buy One Way Tickets to San Fransico',
          status: this.constructor.statuses.TODO,
          isChecked: false,
        },
        {
          id: 3,
          description: 'Go to Gym',
          status: this.constructor.statuses.TODO,
          isChecked: false,
        },
        {
          id: 4,
          description: 'Buy Groceries',
          status: this.constructor.statuses.TODO,
          isChecked: false,
        },
      ],
    };
  }

  // обработчик нажатия кнопки показа модального окна меню
  handleClickShowMenu = (id) => {
    this.setState({
      isShowMenu: !this.state.isShowMenu,
      menuItemId: id,
    });
  };

  // обработчик нажатия кнопок модального окна меню
  handleClickMenuItem = (buttonId) => {
    let status = this.constructor.statuses.TODO;
    if (+this.state.menuItemId !== -1) {
      switch (buttonId) {
        case 0:
          status = this.constructor.statuses.TRASH;
          break;
        case 1:
          status = this.constructor.statuses.DELETE;
          break;
        case 2:
          status = this.constructor.statuses.TODO;
          break;
        default:
          break;
      }
      this.menuItemOperation(buttonId, status);
    }
  };

  // функция производит изменения в списке задач в зависимости от нажатой кнопки модального окна меню
  menuItemOperation = (buttonId, status) => {
    const updatedToDoList = this.state.toDoList.map((item) => {
      if (item.id === +this.state.menuItemId) {
        return {
          ...item,
          status: status,
          isChecked: buttonId === this.constructor.statuses.TRASH ? false : item.isChecked,
        };
      } else {
        return { ...item };
      }
    });
    this.setState({ toDoList: updatedToDoList, isShowMenu: false });
  };

  // обработчик нажатия отметки задачи
  handleClickCheckItem = (id) => {
    const updatedItem = this.state.toDoList.map((item) => {
      if (item.id === Number(id)) {
        return {
          ...item,
          status:
            item.status === this.constructor.statuses.DONE
              ? this.constructor.statuses.TODO
              : this.constructor.statuses.DONE,
          isChecked: !item.isChecked,
        };
      } else {
        return { ...item };
      }
    });
    this.setState({ toDoList: updatedItem });
  };

  // обработчик нажания кнопок навигации
  handleClickNavButton = (id) => {
    this.setState({
      currentActiveNavButtonId: id,
      isShowMenu: false,
    });
  };

  // обработчик нажания кнопки добавления задачи
  handleClickAddToDoButton = (newToDoObj) => {
    if (newToDoObj !== null) {
      this.setState({
        toDoList: [
          ...this.state.toDoList,
          {
            id: this.state.toDoList.length,
            isChecked: false,
            status: this.constructor.statuses.TODO,
            ...newToDoObj,
          },
        ],
      });
    }
  };

  // функция возвращает отсортированный список задач в зависимости от текущей вкладки
  getFilteredToDoList = () => {
    const filtereToDoList = this.state.toDoList.filter((toDo) => {
      switch (this.state.currentActiveNavButtonId) {
        case 0:
          return (
            toDo.status === this.constructor.statuses.TODO ||
            toDo.status === this.constructor.statuses.DONE
          );

        case 1:
          return toDo.status === this.constructor.statuses.DONE;
        case 2:
          return toDo.status === this.constructor.statuses.TRASH;
        default:
          return toDo.status === this.constructor.statuses.TODO;
      }
    });
    return filtereToDoList;
  };

  render() {
    return (
      <>
        <Header />
        <main>
          <Nav
            active={this.state.currentActiveNavButtonId}
            handleClickNavButton={this.handleClickNavButton}
          />
          <ToDoContent
            toDoList={this.getFilteredToDoList()}
            handleClickShowMenu={this.handleClickShowMenu}
            currentActiveNavButtonId={this.state.currentActiveNavButtonId}
            handleClickAddToDoButton={this.handleClickAddToDoButton}
            handleClickCheckItem={this.handleClickCheckItem}
            isShowMenu={this.state.isShowMenu}
            handleClickMenuItem={this.handleClickMenuItem}
          />
        </main>
        <MenuModalWindow
          currentActiveNavButtonId={this.state.currentActiveNavButtonId}
          isShowMenu={this.state.isShowMenu}
          handleClickMenuItem={this.handleClickMenuItem}
        />
        <Footer />
      </>
    );
  }
}

export default Home;
