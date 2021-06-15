import React from 'react';
import './text-sticker.scss';

class TextSticker extends React.Component {
  state = { 
    text: this.props.text,
  }
  constructor(props) {
    super(props);
    
  }

  onChange = (e) => {
    this.setState({text: e.target.value});
  }

  render() {
    return <textarea className="text-sticker" value={this.state.text} onChange={this.onChange}/>
  }
}

export default TextSticker;