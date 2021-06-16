import React from 'react';
import './kanban.scss';
import LeftArrow from '../../../res/icons/ic24-chevron-left.png';
import RightArrow from '../../../res/icons/ic24-chevron-right.png';
import Plus from '../../../res/icons/ic24-plus.png';

const KanbanElement = ({ status, text, id, clickLeftArrow, clickRightArrow }) => {
  const onMouseDown = (e) => {
    e.stopPropagation();
  }
  
  return (
    <div className="kanban-element">
      <button className="btn btn-outline-dark" onMouseDown={onMouseDown} onMouseUp={(e) => clickLeftArrow(e, id)}><img src={LeftArrow}/></button>
      <span>{text}</span>
      <button className="btn btn-outline-dark" onMouseDown={onMouseDown} onMouseUp={(e) => clickRightArrow(e, id)}><img src={RightArrow}/></button>
    </div>
  )
}

export default class Kanban extends React.Component {  
  
  state = {
    task: '',
  }
  clickLeftArrow = (e, id) => {
    const { kanbanData } = this.props.elementState;
    const elementId = kanbanData.findIndex(el => el.id === id);
    const element = {...kanbanData[elementId]};

    switch(element.status) {
      case 'in progress': element.status = 'not started'; break;
      case 'done': element.status = 'in progress'; break;
      default: break;
    }
    const newElements = [
      ...kanbanData.slice(0, elementId),
      ...kanbanData.slice(elementId + 1),
      element,
    ];
    const newState = {...this.props.elementState, kanbanData: newElements};
    
    this.props.updateData(newState);
    e.stopPropagation();
  }
  clickRightArrow = (e, id) => {
    const { kanbanData } = this.props.elementState;
    const elementId = kanbanData.findIndex(el => el.id === id);
    const element = {...kanbanData[elementId]};

    switch(element.status) {
      case 'in progress': element.status = 'done'; break;
      case 'not started': element.status = 'in progress'; break;
      default: break;
    }

    const newElements = [
      ...kanbanData.slice(0, elementId),
      ...kanbanData.slice(elementId + 1),
      element,
    ];
    const newState = {...this.props.data, kanbanData: newElements};
    this.props.updateData(newState);
    e.stopPropagation();
    e.preventDefault();
  }
  passDataToComponent = (element) => {
    
    return (
    <KanbanElement
      key={element.id}
      clickLeftArrow={this.clickLeftArrow}  
      clickRightArrow={this.clickRightArrow}  
      {...element}/>
    )
  }
  componentDidMount = () => {
    const { kanbanData } = this.props.elementState;
    if(kanbanData === undefined) {
      this.props.updateData({...this.props.elementState, currentId: 0, kanbanData: []});
    }
  }
  onInputChange = (e) => {
    this.setState({ task: e.target.value })
  }

  addTask = (task) => {
    const { kanbanData, currentId } = this.props.elementState;
    const newTask = { id: currentId, status: 'not started', text: task };
    const newKanbanData = [...kanbanData, newTask];
    this.props.updateData({...this.props.elementState, currentId: currentId + 1, kanbanData: newKanbanData});
    this.setState({task: ''})
  }
  render() {
    const { kanbanData } = this.props.elementState;
    if(kanbanData === undefined) return null;
    return (
      <div className="kanban">
        <div className="add-task" onClick={() => this.addTask(this.state.task)}><img src={Plus}/></div>
        <input className="add-task-input" type="text" value={this.state.task} onChange={(e) => this.onInputChange(e)}/>
        <div className="kanban-cols col-notstarted">
          <span>Not started</span>
          {kanbanData.filter(el => el.status === 'not started').map(this.passDataToComponent)}
        </div>
        <div className="kanban-cols col-inprogress">
          <span>In progress</span>
          {kanbanData.filter(el => el.status === 'in progress').map(this.passDataToComponent)}
        </div>
        <div className="kanban-cols col-done">
        <span>Done</span>
          {kanbanData.filter(el => el.status === 'done').map(this.passDataToComponent)}
        </div>
      </div>
    )
  }
}
