/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { useState, useEffect } from 'react';
import userService from '../../services/user-service';

interface CommentSectionProps {
  userId: string;
  comment: string;
}

const CommentSection = ({
  userId,
  comment,
}: CommentSectionProps) => {

  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData] = await Promise.all([
          userService.getUserById(userId),
        ]);

        if (userData) {
          setUsername(userData.username);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);


  return (
    <Typography fontSize="sm" textAlign="left">
    <Link
        component="button"
        color="neutral"
        fontWeight="lg"
        textColor="text.primary"
    >
        {username}
    </Link>{' '}
    {comment}
    </Typography>
  );
}

export default CommentSection;
