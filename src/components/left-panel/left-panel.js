import React from 'react';
import './left-panel.scss';
import FigureButton from '../../res/icons/ic24-play.png';
import FileButton from '../../res/icons/ic24-file.png';

const LeftPanel = () => {
    return (
        <div className="left-panel window-element">
            <div className="button">
                <img src={FigureButton}/>
            </div>
            <div className="button">
                <img src={FileButton}/>
            </div>

        </div>
    )

}

export default LeftPanel;