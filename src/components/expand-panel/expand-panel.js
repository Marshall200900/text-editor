import React from 'react';
import './expand-panel.scss';
import ElementsContainer from '../elements-container';
import { connect } from 'react-redux';

const ExpandPanel = ({openedPanel}) => {
  let panelComponent;
  let visible = true;
  switch (openedPanel) {
    case 'figures': panelComponent = <ElementsContainer/>; break;
    case null: panelComponent = null; visible = false; break;
  }
  return (
      <div className={`expand-panel window-element ${visible ? '' : 'invisible'}`}>
          {panelComponent}
      </div>
  )
}
const mapStateToProps = ({openedPanel}) => {
  return {
    openedPanel
  }
}


export default connect(mapStateToProps)(ExpandPanel);

