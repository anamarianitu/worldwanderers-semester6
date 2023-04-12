import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/navbar/Navbar';
import Feed from './pages/feed/Feed';

function App() {
  return (
    <div className="App">
    <NavigationBar/>
    <BrowserRouter>
      <Routes>
      <Route path = "/feed" element={<Feed/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
