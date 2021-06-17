import React from 'react';
import './checklist.scss';
import Plus from '../../../res/icons/ic24-plus.png';

class Checklist extends React.Component {
  
  state = {
    task: '',
  }
  componentDidMount = () => {
    const { elementState } = this.props;
    if(elementState.todos === undefined) {
      this.props.updateData({ ...elementState, currentId: 0,  todos: [] });
    }
    
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
    return {...elementState, todos: newTodos}
  }
  addTask = (task) => {
    const { currentId, todos } = this.props.elementState;

    const newTask = { id: currentId, checked: false, text: task };
    const newTodos = [...todos, newTask];
    console.log({...this.props.elementState, currentId: currentId + 1, todos: newTodos});
    this.props.updateData({...this.props.elementState, currentId: currentId + 1, todos: newTodos});
    this.setState({task: ''});  
  }
  onInputChange = (e) => {
    this.setState({task: e.target.value})
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
          <div className="add">
            <div className="add-task" onClick={() => this.addTask(this.state.task)}><img src={Plus}/></div>
            <input className="add-task-input" type="text" value={this.state.task} onChange={(e) => this.onInputChange(e)}/>
          </div>
        {todosComponents}
      </div>
    )
  }
}

export default Checklist;