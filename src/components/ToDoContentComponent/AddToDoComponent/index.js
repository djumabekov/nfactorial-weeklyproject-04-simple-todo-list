import React from 'react';

class AddToDo extends React.Component {
  constructor() {
    super();
    this.state = {
      showModalWindow: false, // переключательно показа модального окна
      // объект новой задачи
      newToDo: {
        description: '',
        status: 0,
      },
    };
  }

  //обработчик изменения текстового поля
  handleOnChangeText = (e) => {
    this.setState({
      newToDo: {
        description: e.target.value,
      },
    });
  };

  //обработчик изменения текстового поля
  handleClickPlusButton = () => {
    this.setState({
      showModalWindow: !this.state.showModalWindow,
      newToDo: {
        description: '',
      },
    });
  };

  //обработчик нажатия кнопки показа модального окна
  handleClickAddToDoButton = () => {
    this.props.handleClickAddToDoButton(this.state.newToDo);
    this.setState({
      showModalWindow: !this.state.showModalWindow,
    });
  };

  render() {
    return (
      <section className="add-to-do">
        <div className={'add-to-do-modal-window' + (!this.state.showModalWindow ? ' hide' : '')}>
          <div className="add-to-do-modal-window-description">Add New To Do</div>
          <textarea
            value={this.state.newToDo.description}
            onChange={this.handleOnChangeText}
            className="add-to-do-modal-window-textarea"
            maxLength="60"
            placeholder="Your text"></textarea>
          <input
            onClick={this.handleClickAddToDoButton}
            type="button"
            className="add-to-do-modal-window-add-button"
          />
        </div>
        <input
          onClick={this.handleClickPlusButton}
          type="button"
          className="add-to-do-plus-button"
        />
      </section>
    );
  }
}

export default AddToDo;
