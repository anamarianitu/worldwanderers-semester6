/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import postImg from '../../assets/images-groups/bucharest.jpg'
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import postService from '../../services/post-service';
import likeService from '../../services/like-service';
import commentService from '../../services/comment-service';
import userService from '../../services/user-service';
import CommentSection from './CommentSection';
import { Comment, Like } from '../../types/api';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface PostCardProps {
  postId: string;
  userId: string;
  description: string;
}

const PostCard = ({
  postId,
  userId,
  description,
}: PostCardProps) => {

  const loggedInUserId = useSelector((state: any) => state.authentication.userId);
  const [username, setUsername] = useState("");
  const [likes, setLikes] = useState<Like[]>([]);
  const [isLiked, setIsLiked] = useState();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, likesData, commentsData, isLikedData] = await Promise.all([
          userService.getUserById(userId),
          likeService.getAllLikesByPostId(postId),
          commentService.getAllCommentsByPostId(postId),
          likeService.isPostLikedByUser(postId, loggedInUserId)
        ]);

        if (userData) {
          setUsername(userData.username);
        }
        setLikes(likesData);
        setComments(commentsData);
        console.log(loggedInUserId);
        setIsLiked(isLikedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [loggedInUserId, postId, userId]);

  const handleLikeClick = async () => {
    if (!isLiked) {
      const newLike = await likeService.addNewLike(postId, userId);
      if (newLike) {
        setIsLiked(newLike);
        setLikes((prevLikes) => [...prevLikes, newLike]);
      }
    } else {
      const removed = await likeService.removeLike(postId, userId);
      if (removed) {
        setIsLiked(undefined);
        setLikes((prevLikes) => prevLikes.filter((like) => like.userId !== userId || like.postId !== postId));
      }
    }
  };




  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 300,
        '--Card-radius': (theme: any) => theme.vars.radius.xs,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', pb: 1.5, gap: 1 }}>
        <Box
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: '-2px',
              borderRadius: '50%',
              background:
                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
            },
          }}
        >
          <Avatar
            size="sm"
            src="/static/logo.png"
            sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
          />
        </Box>
        <Typography fontWeight="lg">{username}</Typography>
        <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
          <MoreHoriz />
        </IconButton>
      </Box>
      <CardOverflow>
        <AspectRatio>
          <img src={postImg} alt="" loading="lazy" />
        </AspectRatio>
      </CardOverflow>
      <Box sx={{ display: 'flex', alignItems: 'center', mx: -1, my: 1 }}>
        <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
        <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            onClick={handleLikeClick}
            value={isLiked}
        >
            {isLiked ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorder />}
        </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
        </Box>
        <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <BookmarkBorderRoundedIcon />
        </IconButton>
        </Box>
      </Box>
      <Link
        component="button"
        underline="none"
        fontSize="sm"
        fontWeight="lg"
        textColor="text.primary"
      >
        {likes.length} Likes
      </Link>

      <CommentSection key={userId} userId={userId} comment={description} ></CommentSection>

      <Link
        component="button"
        underline="none"
        fontSize="10px"
        sx={{ color: 'text.tertiary', my: 0.5 }}
      >
        13 Jul 2022
      </Link>

      {
        comments?.map((comment) => (
          <CommentSection key={comment.id} userId={comment.userId} comment={comment.comment} ></CommentSection>
        ))
      }

      <CardOverflow sx={{ p: 'var(--Card-padding)', display: 'flex' }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Face />
        </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flexGrow: 1, mr: 1, '--Input-focusedThickness': '0px' }}
        />
        <Button>
          Comment
        </Button>
      </CardOverflow>
    </Card>
  );
}

export default PostCard;
