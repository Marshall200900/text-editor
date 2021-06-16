import React from 'react';
import { connect } from 'react-redux';
import Text from '../../res/icons/ic24-align-left.png';
import Check from '../../res/icons/ic24-check.png';
import Kanban from '../../res/icons/ic24-calendar.png';
import { switchTool } from '../../actions';
import './elements-container.scss';
const ButtonSwitchTool = ({tool, image, switchTool, className}) => {
  return (
    <div className={`btn btn-outline-dark ${className}`} onClick={() => switchTool(tool)}>
      <img src={image}/>
    </div>
  )
}
class ElementsContainer extends React.Component {
  switchTool = (tool) => {
    const { dispatch } = this.props;
    dispatch(switchTool(tool));
  }

  render() {
    const { elements, currentTool } = this.props;


    const switchTool = this.switchTool;
    return (
        <div className="elements-container">
          <ButtonSwitchTool tool={'text'} image={Text} {...{switchTool}} className={currentTool === 'text' ? 'selected': ''}/>
          <ButtonSwitchTool tool={'kanban'} image={Kanban} {...{switchTool}} className={currentTool === 'kanban' ? 'selected': ''}/>
          <ButtonSwitchTool tool={'checklist'} image={Check} {...{switchTool}} className={currentTool === 'checklist' ? 'selected': ''}/>
        </div>
    )
  }
}
const mapStateToProps = ({elements, currentTool}) => {
  return {
    elements,
    currentTool
  }
}

export default connect(mapStateToProps)(ElementsContainer);