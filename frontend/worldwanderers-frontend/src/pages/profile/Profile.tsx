import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Email,
  LocationOn,
  PersonAdd,
  Phone,
  PhotoCamera,
} from "@mui/icons-material";
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
  // const loggedInUserId = useSelector((state: any) => state.authentication.userId);
  const loggedInUserId = Cookies.get('userId');
  const [user, setUser] = useState<UserEntity | undefined>();
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
