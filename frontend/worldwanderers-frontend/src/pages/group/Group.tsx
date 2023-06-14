import { styled } from "@mui/material/styles";
import {
  Stack,
  Box,
  Container,
  Button,
  Input,
  CardContent,
  Typography,
  Card,
} from "@mui/material";
import PostCard from "../../components/post/PostCard";
import { PostEntity } from "../../types/api";
import postService from "../../services/post-service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";


const Group = () => {
  const [posts, setPosts] = useState<PostEntity[] | []>([]);
  const [postDescription, setPostDescription] = useState("");
  const navigate = useNavigate();
  // const loggedInUser = useSelector((state: any) => state.authentication.userId);
  const loggedInUser = Cookies.get('userId');

  const { id } = useParams();

  useEffect(() => {
    void (async () => {
      setPosts(await postService.getAllPostsFromGroup(id));
    })();
  }, [id, posts]);

  const handleAddPostToGroup = async () => {
    try {
      const newPost = await postService.addNewPost(loggedInUser, postDescription, id);
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setPostDescription("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handlePostDescriptionInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPostDescription(value);
  };

  return (
    <>
      <Container
        sx={{
          width: "90%",
          margin: "0 auto",
          marginTop: "100px",
        }}
      ></Container>

      <Box
        sx={{
          width: "60%",
          margin: "0 auto",
          marginTop: "30px",
        }}
      >
        <Box>
          <Card sx={{marginBottom: '10px'}}>
            <CardContent>
              <Box>
                <Typography variant="h6" component="div" gutterBottom>
                  Create a Post
                </Typography>
                <Input
                  placeholder="What's on your mind?"
                  value={postDescription}
                  onChange={handlePostDescriptionInputChange}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                marginTop={2}
                marginBottom={2}
                justifyContent="space-between"
              >
                <Button variant="contained" component="label" sx={{backgroundColor: '#37306B'}}>
                  Upload Picture
                  <input type="file" hidden accept="image/*" />
                </Button>
                <Button variant="contained" sx={{backgroundColor: '#37306B'}} onClick={handleAddPostToGroup}>Post</Button>
              </Box>
            </CardContent>
          </Card>
          <Stack spacing={5}>
            {posts?.map((post) => (
              <PostCard
                key={post.id}
                postId={post.id}
                userId={post.userId}
                description={post.description}
              ></PostCard>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Group;
