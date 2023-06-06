import React, { useEffect, useState } from "react";
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { styled } from "@mui/system";
import { Delete } from "@mui/icons-material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

import userService from "../../../services/user-service";
import { UserEntity } from "../../../types/api";


const DeleteButton = styled(Button)`
  color: white;
  background-color: #f44336;
  &:hover {
    background-color: #d32f2f;
  }
`;

const StyledTableCell = styled(TableCell)`
  font-weight: bold;
  background-color: #f5f5f5;
`;


const UserManagement = () => {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserEntity | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchUsers();
  }, [sortOrder]);

  const fetchUsers = async () => {
    try {
      const usersData = await userService.getAllUsers(sortOrder);
      if (usersData) {
        setUsers(usersData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };


  const deleteUser = async (id: string) => {
    try {
      await userService.deleteUser(id);
      // Refresh the user list after successful deletion
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteUser = (user: UserEntity) => {
    setSelectedUser(user);
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmationDelete = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id);
    }
    setConfirmationOpen(false);
    setSelectedUser(null);
  };

  return (
    <Container sx={{ margin: "auto", marginTop: "5%" }}>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>
                {sortOrder === "asc" ? (
                  <ArrowUpward onClick={toggleSortOrder} sx={{ marginLeft: "4px" }}/>
                ) : (
                  <ArrowDownward onClick={toggleSortOrder} sx={{ marginLeft: "4px" }}/>
                )}
                Username
              </StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>
                  <DeleteButton
                    startIcon={<Delete />}
                    onClick={() => handleDeleteUser(user)}
                    variant="contained"
                  >
                    Delete
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the user?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose}>Cancel</Button>
          <Button onClick={handleConfirmationDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;
