import React from 'react';
import { connect } from 'react-redux';
import { readStateFromFile } from '../../actions';
import './menubar.scss';

class MenuBar extends React.Component {
  save = () => {
    const fs = require('fs');
    try { 
      const { currentId, elements } = this.props.state;
      const dataToSave = { currentId, elements };

      fs.writeFileSync('data.json', JSON.stringify(dataToSave), 'utf-8'); 
      console.log('Successfully saved');
    }
    catch(e) { alert('Failed to save the file: ' + e); }
  }
  open = (path) => {
    const { dispatch } = this.props;
    const fs = require('fs');
    try {
      const data = fs.readFileSync(path, 'utf8');
      dispatch(readStateFromFile(JSON.parse(data)));
      console.log('Successfully loaded');
    } catch (err) {
      console.error(err)
    }
  }
  constructor(props) {
    super(props);
    this.inputFile = React.createRef();

  }
  onButtonClick = () => {
    this.inputFile.current.click();
  };
  render(){
    const onChange = (e) => {
      const { path } = e.target.files[0];
      this.open(path);
    }
    return (
        <div className="menubar">
          <div className="button" onClick={this.onButtonClick}>Открыть</div>
          <input type='file' id='file' ref={this.inputFile} style={{display: 'none'}} onChange={onChange}/>
          <div className="button" onClick={this.save}>Сохранить</div>
        </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(MenuBar)