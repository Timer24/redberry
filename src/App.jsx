import React from "react";
import './App.css';
import Header1 from './components/Header1'
import '@fontsource/firago';
import Filters from './components/Filters'


function App() {
  return (
    <div className="App">
      <Header1/>
      <Filters/>
    </div>
  );
}

export default App;
