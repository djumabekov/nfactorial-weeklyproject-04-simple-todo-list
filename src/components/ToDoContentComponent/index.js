import React from 'react';
import AddToDo from './AddToDoComponent';
import ToDoListItem from './ToDoListItemComponent';

class ToDoContent extends React.Component {
  render() {
    return (
      <section className="to-do-content">
        <div className="to-do-content-title">To Do</div>
        <div className="to-do-content-devider"></div>

        <ul className="to-do-list">
          {this.props.toDoList.map((toDoItem, i) => (
            <ToDoListItem
              key={i}
              item={toDoItem}
              handleClickShowMenu={this.props.handleClickShowMenu}
              handleClickCheckItem={this.props.handleClickCheckItem}
              currentActiveNavButtonId={this.props.currentActiveNavButtonId}
            />
          ))}
        </ul>
        <AddToDo handleClickAddToDoButton={this.props.handleClickAddToDoButton} />
      </section>
    );
  }
}

export default ToDoContent;
