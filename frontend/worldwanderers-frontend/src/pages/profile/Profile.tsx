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
import { useSelector } from "react-redux";
import userService from "../../services/user-service";
import { UserEntity } from "../../types/api";
import profileImg from "../../assets/profileImg.jpg";

const ProfilePage = () => {
  const loggedInUserId = useSelector((state: any) => state.authentication.userId);
  const [user, setUser] = useState<UserEntity | undefined>();

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
      </Card>
    </Box>
  );

};

export default ProfilePage;
