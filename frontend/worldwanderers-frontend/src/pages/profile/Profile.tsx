import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  Email,
  LocationOn,
  PhotoCamera,
} from "@mui/icons-material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useDispatch, useSelector } from "react-redux";
import userService from "../../services/user-service";
import postService from "../../services/post-service";
import { UserEntity } from "../../types/api";
import profileImg from "../../assets/profileImg.jpg";
import { logout } from "../../services/auth-service";
import Cookies from "js-cookie";

interface ExportProps {
  data: any;
  fileName: string;
  fileType: any;
}

const ProfilePage = () => {
  const loggedInUserId = useSelector((state: any) => state.authentication.userId);
  // const loggedInUserId = Cookies.get('userId');
  const [user, setUser] = useState<UserEntity | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData] = await Promise.all([
          userService.getUserById(loggedInUserId),
        ]);

        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [loggedInUserId]);

  const openModal = () => {
    setIsModalOpen(true);
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setEmail(user?.email || "");
    setUsername(user?.username || "");
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };


  const downloadFile = ({ data, fileName, fileType }: ExportProps) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const handleExportData = async () => {
    const data = await postService.exportCsvData(loggedInUserId);
    downloadFile({
      data: data,
      fileName: "data.csv",
      fileType: "text/csv",
    });
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      userService
        .deleteUser(loggedInUserId)
        .then(() => {
          // Handle successful deletion
          console.log("User deleted successfully");
        })
        .catch((error) => {
          // Handle error
          console.error("Error deleting user:", error);
        });
      dispatch(logout());
    }
  };

  const handleUpdateUser = () => {
    const updatedUser = { ...user, firstName, lastName, email, username };
    // Call the updateUserById method from the userService to update the user details
    userService
      .updateUserById(updatedUser.id, updatedUser.firstName, updatedUser.lastName, updatedUser.email, updatedUser.username)
      .then(() => {
        // Handle successful update
        console.log("User details updated successfully");
        // Close the modal
        closeModal();
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating user details:", error);
      });
  };

  return (
    <Box sx={{ maxWidth: '90%', margin: '100px auto' }}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Avatar
                src={profileImg}
                alt={`${user?.firstName} ${user?.lastName}`}
                sx={{ width: 120, height: 120 }}
              />
            </Grid>
            <Grid item xs={8}>
              <Box marginLeft={2}>
                <Typography variant="h5" component="div" gutterBottom>
                  {`${user?.firstName} ${user?.lastName}`}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {`@${user?.username}`}
                </Typography>
                <Typography variant="body1" component="div">
                  <Box fontWeight="fontWeightBold">About me</Box>
                  <Box fontStyle="italic">This is the description of the user.</Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2} textAlign="right">
              <IconButton>
                <PhotoCamera />
              </IconButton>
              <IconButton onClick={openModal}>
                <ModeEditIcon />
              </IconButton>
              <Modal open={isModalOpen} onClose={closeModal}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Edit User Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" onClick={handleUpdateUser} sx={{margin: "5px"}}>
                        Save
                      </Button>
                      <Button variant="contained" onClick={closeModal} sx={{margin: "5px"}}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>

            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            </Grid>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Email />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Email" secondary={`${user?.email}`} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocationOn />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Location" secondary="Eindhoven, NL" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
        <Button variant="outlined" color="error" onClick={handleDeleteAccount} sx={{margin: "10px"}}>
          Delete Account
        </Button>
        <Button variant="outlined" onClick={handleExportData} sx={{margin: "10px"}}>
          Export CSV
        </Button>
      </Card>
    </Box>
  );

};

export default ProfilePage;
