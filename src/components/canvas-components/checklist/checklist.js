import React from 'react';
import './checklist.scss';

class Checklist extends React.Component {
  

  componentDidMount = () => {
    const { elementState } = this.props;
    this.props.updateData({ ...elementState, todos: [
      {
        id: 0,
        text: 'do dishes',
        checked: false,
      },
      {
        id: 1,
        text: 'make the text editor',
        checked: false,
      },
      {
        id: 2,
        text: 'get some sleep',
        checked: false,
      }
    ] });
    
  }
  onChecked = (id) => {
    const { elementState } = this.props;
    const { todos } = elementState;
    const todoId = todos.findIndex(el => el.id === id);
    const todo = todos[todoId];
    const newTodo = {...todo, checked: !todo.checked};
    const newTodos = [
      ...todos.slice(0, id),
      newTodo,
      ...todos.slice(id + 1)
    ];
    console.log(newTodos);
    return {...elementState, todos: newTodos}
  }
  render() {
    const { elementState } = this.props;
    if(elementState.todos === undefined) return null;    
    const { todos } = elementState;
    const { updateData } = this.props;    
    const todosComponents = todos.map(todo => {
      const clazz = todo.checked ? ' done': '';
      return (
        <div className="todo" key={todo.id}>
          <input type="checkbox" className="checkbox" checked={todo.checked} onMouseDown={(e) => e.stopPropagation()} onChange={() => updateData(this.onChecked(todo.id))}/>
          <span className={"todo-text"+clazz}>{todo.text}</span>
        </div>
      )
    })
    return (
      <div className="checklist">
        {todosComponents}
      </div>
    )
  }
}

export default Checklist;