import './App.css';

import React, {Component} from 'react';
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
class App extends Component {
    pageSize= 5;
    apiKey = process.env.REACT_APP_NEWS_API;
    state = {
        progress : 0
    }
setProgress = (progress) => {
        this.setState({progress: progress})
}
  render() {
    return (

        <Router>
            <LoadingBar
                color="red"
                progress={this.state.progress}
                height={3}
            />
            <NavBar />

            <div>
                <Routes>
                    <Route path="/" element={<News key="general" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' Category="general"/>}/>
                    <Route path="/business" element={<News key="business" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' Category="business"/>}/>
                    <Route path="/entertainment" element={<News key="entertainment" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' Category="entertainment"/>}/>
                    <Route path="/health" element={<News key="health" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' Category="health"/>} />
                    <Route path="/science" element={<News key="science" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' Category="science"/>} />
                    <Route path="/sports" element={<News key="sports" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' Category="sports"/>} />
                    <Route path="/technology" element={<News key="technology" setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country='in' Category="technology"/>} />
                </Routes>
            </div>
        </Router>
    );
  }
}

export default App;
