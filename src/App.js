import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';
import NccuCourse from 'containers/NccuCourse';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NccuCourse />
            </div>
        );
    }
}

export default withRouter(App);
