import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/navbar/Navbar';
import Feed from './pages/feed/Feed';
import Login from './pages/authenticate/Login';
import ProtectedRoute from './services/require.auth';
import Group from './pages/group/Group';
import { useSelector } from "react-redux";


function App() {
  const user = useSelector((state: any) => state.authentication.authenticated);

  return (
    <div className="App">
    { user ? <NavigationBar/> : null }
    <BrowserRouter>
      <Routes>
      <Route
        path="/feed"
        element={
          <ProtectedRoute>
              <Feed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
      element={
          <ProtectedRoute>
              <Feed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/group"
        element={
          <ProtectedRoute>
              <Group />
          </ProtectedRoute>
        }
      />

      <Route path = "/log-in" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
