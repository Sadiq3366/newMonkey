import './App.css';

import React, {useState} from 'react';
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
const App = ()=> {
   let pageSize= 5;
   let apiKey = process.env.REACT_APP_NEWS_API;
    const [progress, setProgressbar] = useState(10)
const setProgress = (progress) => {
    setProgressbar(progress)
}
    return (

        <Router>
            <LoadingBar
                color="red"
                progress={progress}
                height={3}
            />
            <NavBar />

            <div>
                <Routes>
                    <Route path="/" element={<News key="general" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='in' Category="general"/>}/>
                    <Route path="/business" element={<News key="business" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='in' Category="business"/>}/>
                    <Route path="/entertainment" element={<News key="entertainment" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='in' Category="entertainment"/>}/>
                    <Route path="/health" element={<News key="health" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='in' Category="health"/>} />
                    <Route path="/science" element={<News key="science" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='in' Category="science"/>} />
                    <Route path="/sports" element={<News key="sports" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='in' Category="sports"/>} />
                    <Route path="/technology" element={<News key="technology" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country='in' Category="technology"/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
