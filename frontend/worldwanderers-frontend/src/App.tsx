import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/navbar/Navbar';
import Feed from './pages/feed/Feed';
import Login from './pages/authenticate/Login';
import ProtectedRoute from './services/require.auth';
import Group from './pages/group/Group';
// import { useSelector } from "react-redux";
import Signup from './pages/authenticate/Signup';
import ProfilePage from './pages/profile/Profile';
import GroupsPage from './pages/groups/Groups';
import Cookies from "js-cookie";


function App() {
  // const token = useSelector((state: any) => state.authentication.token);
  const token = Cookies.get("accessToken");

  return (
    <div className="App">
    { token && <NavigationBar/> }
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
        path="/groups/:id"
        element={
          <ProtectedRoute>
              <Group />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups"
        element={
          <ProtectedRoute>
              <GroupsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
              <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path = "/log-in" element={<Login/>}></Route>
      <Route path = "/sign-up" element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
