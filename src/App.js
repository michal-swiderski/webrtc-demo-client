import React, {Component} from 'react';
import './App.sass';
import {BrowserRouter, Route} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import VideoChat from "./components/VideoChat";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path='/' component={LoginPage}/>
                    <Route path='/room/:room' component={VideoChat}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
