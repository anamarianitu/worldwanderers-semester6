import * as React from 'react';
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

import { Stack, Box } from '@mui/material';


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface GroupCardProps {
    id: string,
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


  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigateToGroup = () => {
    alert(id);
    //get the id of the group from this navigate
    navigate(`/groups/${id}`);
};

    return (
        <Card sx={{ elevation: 10 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#569DAA' }} aria-label="recipe">
              {title.charAt(0)}
            </Avatar>
          }
          action={
            <Button onClick={navigateToGroup} color="secondary">View Group</Button>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Group Image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>About the group:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
              aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              {description}
            </Typography>
            <Typography paragraph>
              {description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );

};

export default GroupCard;

