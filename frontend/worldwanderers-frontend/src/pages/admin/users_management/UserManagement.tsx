import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import userService from "../../../services/user-service";
import { UserEntity } from "../../../types/api";

const UserManagement = () => {
    const [users, setUsers] = useState<UserEntity[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [usersData] = await Promise.all([
              userService.getAllUsers(),
            ]);

            if (usersData) {
                setUsers(usersData);
            }
          } catch (error) {
            console.error(error);
          }
        };

        fetchData();
      }, [users]);


    const deleteUser = async (id: string) => {
      try {
        await userService.deleteUser(id);
        // Refresh the user list after successful deletion
        // getUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    return (
      <div>
        <h1>User Management</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  export default UserManagement;
