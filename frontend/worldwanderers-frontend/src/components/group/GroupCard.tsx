import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import { Stack, Box, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';
import groupService from '../../services/group-service';
import Cookies from "js-cookie";


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface GroupCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const GroupCard: React.FC<GroupCardProps> = ({
  id,
  title,
  description,
  image,
}) => {
  // const loggedInUserId = useSelector((state: any) => state.authentication.userId);
  const loggedInUserId = Cookies.get('userId');

  const [expanded, setExpanded] = React.useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [openJoinSnackbar, setOpenJoinSnackbar] = React.useState(false);
  const [openLeaveSnackbar, setOpenLeaveSnackbar] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [isJoinedData] = await Promise.all([
          groupService.isGroupJoinedByUser(id, loggedInUserId),
        ]);

        setIsJoined(isJoinedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [loggedInUserId, id]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleJoinGroup = async () => {
    await groupService.addUserToGroup(loggedInUserId, id);
    setOpenJoinSnackbar(true);
    window.location.reload();
  };

  const handleRemoveFromGroup = async () => {
    await groupService.removeUserFromGroup(loggedInUserId, id);
    setOpenLeaveSnackbar(true);
    window.location.reload();
  };

  const navigateToGroup = () => {
    navigate(`/groups/${id}`);
  };

  const handleCloseJoinSnackbar = () => {
    setOpenJoinSnackbar(false);
  };

  const handleCloseLeaveSnackbar = () => {
    setOpenLeaveSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseJoinSnackbar}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Card sx={{ elevation: 10 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#569DAA' }} aria-label="recipe">
            {title.charAt(0)}
          </Avatar>
        }
        action={
          <>
            {isJoined ? (
              <Button onClick={handleRemoveFromGroup} variant="outlined" color="error">
                Leave
              </Button>
            ) : (
              <Button onClick={handleJoinGroup} variant="contained" color="success">
                Join
              </Button>
            )}

            <IconButton aria-label="share" onClick={navigateToGroup}>
              <ArrowForwardIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </>
        }
        titleTypographyProps={{ variant: "h6", sx: { textAlign: "left" } }}
        title={title}
        subheaderTypographyProps={{ variant: "subtitle1", sx: { textAlign: "left" } }}
        subheader={description}
      />
      <CardContent></CardContent>
      <CardActions disableSpacing></CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ textAlign: "left" }} paragraph>About the group</Typography>
          <Typography sx={{ textAlign: "left" }} paragraph>
            {description}
          </Typography>
        </CardContent>
      </Collapse>
      <Snackbar
        open={openJoinSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseJoinSnackbar}
        message="You have successfully joined the group"
        action={action}
      />
      <Snackbar
        open={openLeaveSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseLeaveSnackbar}
        message="You have successfully left the group"
        action={action}
      />
    </Card>
  );
};

export default GroupCard;
