import React from 'react';

import './menubar.scss';


 export default class MenuBar extends React.Component {
    render(){
        return (
            <div className="menubar">
                <div className="button">Файл</div>
                <div className="button">Справка</div>
            </div>
        )
    }
}