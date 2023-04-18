import React from 'react';
import Footer from '../FooterComponent';
import Header from '../HeaderComponent';
import Nav from '../NavComponent/';
import ToDoContent from '../ToDoContentComponent/';
import MenuModalWindow from '../MenuModalWindowComponent/';
import fakeData from '../../data/data.json';
import axios from 'axios';

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
      toDoList: [], // список задач
    };
  }

  // после рендера компонента подтягивает, если есть, данные с mongodb, иначе - фейковые
  componentDidMount() {
    axios
      .get(`http://localhost:8000/`)
      .then((res) => {
        console.log('res.data', res.data);
        const data = res.data || fakeData;
        this.setState({ toDoList: data });
      })
      .catch((err) => {
        console.error(err);
      });
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

  // функция сохранения изменений задач в state и localstorage
  saveUpdateToDoList = (obj) => {
    this.setState(obj);
  };

  // функция производит изменения в списке задач в зависимости от нажатой кнопки модального окна меню
  menuItemOperation = (buttonId, status) => {
    const updatedToDoList = this.state.toDoList.map((item) => {
      if (item._id === this.state.menuItemId) {
        return {
          ...item,
          status: status,
          isChecked: buttonId === this.constructor.statuses.TRASH ? false : item.isChecked,
        };
      } else {
        return { ...item };
      }
    });
    this.saveUpdateToDoList({ toDoList: updatedToDoList, isShowMenu: false });
    const item = updatedToDoList.find((item) => item._id === this.state.menuItemId);
    axios
      .patch(`http://localhost:8000/update/${item._id}`, item)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // обработчик нажатия отметки задачи
  handleClickCheckItem = (id) => {
    const updatedItem = this.state.toDoList.map((item) => {
      if (item._id === id) {
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
    this.saveUpdateToDoList({ toDoList: updatedItem });
    const item = updatedItem.find((item) => item._id === id);
    axios
      .patch(`http://localhost:8000/update/${item._id}`, item)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // обработчик нажания кнопок навигации
  handleClickNavButton = (id) => {
    this.setState({
      currentActiveNavButtonId: id,
      isShowMenu: false,
    });
  };

  // обработчик нажания кнопки добавления задачи
  handleClickAddToDoButton = async (newToDoObj) => {
    if (newToDoObj !== null) {
      await axios
        .post(`http://localhost:8000/todo`, newToDoObj)
        .then((res) => {
          console.log(res);
          this.saveUpdateToDoList({
            toDoList: [
              ...this.state.toDoList,
              {
                isChecked: false,
                ...res.data,
              },
            ],
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // функция возвращает отсортированный список задач в зависимости от текущей вкладки
  getFilteredToDoList = () => {
    const filteredToDoList = this.state.toDoList.filter((toDo) => {
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
    return filteredToDoList;
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
