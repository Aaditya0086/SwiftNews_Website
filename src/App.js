import './App.css';
import React, {useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  // Switch,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App =()=> {
  const pageSize= 5;
  const country= 'in';
  const apikey = process.env.REACT_APP_NEWS_API
  
  const [progress, setProgress] = useState(0)

    return (
      
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        // height={3}
        color='#f11946'
        progress={progress}
        
      />
        <Routes>
          <Route exact path ="/" element={<News setProgress = {setProgress} apikey={apikey} key="general" pageSize={pageSize} country={country} category="general"/>}/>
          <Route exact path ="/business" element={<News setProgress = {setProgress} apikey={apikey} key="business" pageSize={pageSize} country={country} category="business"/>}/>
          <Route exact path ="/entertainment" element={<News setProgress = {setProgress} apikey={apikey} key="entertainment" pageSize={pageSize} country={country} category="entertainment"/>}/>
          <Route exact path ="/general" element={<News setProgress = {setProgress} apikey={apikey} key="general" pageSize={pageSize} country={country} category="general"/>}/>
          <Route exact path ="/health" element={<News setProgress = {setProgress} apikey={apikey} key="health" pageSize={pageSize} country={country} category="health"/>}/>
          <Route exact path ="/science" element={<News setProgress = {setProgress} apikey={apikey} key="science" pageSize={pageSize} country={country} category="science"/>}/>
          <Route exact path ="/sports" element={<News setProgress = {setProgress} apikey={apikey} key="sports" pageSize={pageSize} country={country} category="sports"/>}/>
          <Route exact path ="/technology" element={<News setProgress = {setProgress} apikey={apikey} key="technology" pageSize={pageSize} country={country} category="technology"/>}/>       
        </Routes>
        </Router>
      </div>
      
    )
  
}

export default App;