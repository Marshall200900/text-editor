import React from 'react';
import { connect } from 'react-redux';
import Text from '../../res/icons/ic24-align-left.png';
import Check from '../../res/icons/ic24-check.png';
import Kanban from '../../res/icons/ic24-calendar.png';
import { switchTool } from '../../actions';
import './elements-container.scss';
const ButtonSwitchTool = ({tool, image, switchTool}) => {
  return (
    <div className="btn btn-outline-dark" onClick={() => switchTool(tool)}>
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
    
    const { elements } = this.props;
    const switchTool = this.switchTool;
    return (
        <div className="elements-container">
          <ButtonSwitchTool tool={'text'} image={Text} {...{switchTool}}/>
          <ButtonSwitchTool tool={'kanban'} image={Kanban} {...{switchTool}}/>
          <ButtonSwitchTool tool={'checklist'} image={Check} {...{switchTool}}/>
        </div>
    )
  }
}
const mapStateToProps = ({elements}) => {
  return {
    elements
  }
}

export default connect(mapStateToProps)(ElementsContainer);