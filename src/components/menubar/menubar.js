import React from 'react';
import { connect } from 'react-redux';
import { readStateFromFile } from '../../actions';
import './menubar.scss';


class MenuBar extends React.Component {
  
  
  save = () => {
    const fs = require('fs');
    try { 
      fs.writeFileSync('data.json', JSON.stringify(this.props.state), 'utf-8'); 
      console.log('Successfully saved');
    }
    catch(e) { alert('Failed to save the file: ' + e); }
  }
  load = () => {
    const { dispatch } = this.props;
    const fs = require('fs');
    try {
      const data = fs.readFileSync('data.json', 'utf8')

      dispatch(readStateFromFile(JSON.parse(data)));
      console.log('Successfully loaded');
    } catch (err) {
      console.error(err)
    }
  }
  render(){
      return (
          <div className="menubar">
              <div className="button">Файл</div>
              <div className="button" onClick={this.save}>Сохранить</div>
              <div className="button" onClick={this.load}>Загрузить</div>
              <div className="button">Справка</div>
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