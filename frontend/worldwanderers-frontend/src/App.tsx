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
// import Cookies from "js-cookie";
import { useSelector } from 'react-redux';
import MapPage from './pages/map/Map';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import UserManagement from './pages/admin/users_management/UserManagement';

function App() {
  const token = useSelector((state: any) => state.authentication.token);
  // const token = Cookies.get("accessToken");

  const allowedRoleUser = ['ROLE_USER'];
  const allowedRoleAdmin = ['ROLE_ADMIN'];

  return (
    <div className="App">
    { token && <NavigationBar/> }
      <BrowserRouter>
        <Routes>
          <Route
            path="/feed"
            element={
              <ProtectedRoute allowedRoles={allowedRoleUser}>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={allowedRoleUser}>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/:id"
            element={
              <ProtectedRoute allowedRoles={allowedRoleUser}>
                <Group />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups"
            element={
              <ProtectedRoute allowedRoles={allowedRoleUser}>
                <GroupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute allowedRoles={allowedRoleUser}>
                <MapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={allowedRoleAdmin}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={allowedRoleAdmin}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
