import React from 'react';
import './app.scss';
import ExpandPanel from '../expand-panel';
import LeftPanel from '../left-panel';
import Workspace from '../workspace';
import MenuBar from '../menubar';

import { render } from 'react-dom';
class App extends React.Component {
    render() {

        return (
            <div className="app">
                <MenuBar/>
                <div className="work-window">
                    <LeftPanel/>
                    <ExpandPanel/>
                    <div className="handler">
                        <div className="handler-out"></div>
                    </div>
                    <Workspace/>
                </div>
            </div>
        )
    }
}
export default App;
