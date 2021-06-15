import React from 'react';
import './text-sticker.scss';

class TextSticker extends React.Component {
  constructor(props) {
    super(props);
    
  }
  

  render() {
    const { elementState: {text}, updateData } = this.props;
    return <textarea className="text-sticker" value={text} onChange={(e) => updateData({...this.props.elementState, text: e.target.value})}/>
  }
}

export default TextSticker;