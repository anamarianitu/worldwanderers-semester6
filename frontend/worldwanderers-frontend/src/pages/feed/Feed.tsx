import { styled } from '@mui/material/styles';
import { Stack, Box, Container } from '@mui/material';
import GroupCard from '../../components/group/GroupCard';
import ImageMaldives from '../../assets/images-groups/maldives.jpg'
import ImageBucharest from '../../assets/images-groups/bucharest.jpg'
import ImageMadeira from '../../assets/images-groups/madeira.jpg'
import ImageLech from '../../assets/images-groups/lech.jpg'
import ImageBusteni from '../../assets/images-groups/busteni.jpg'
import { useEffect, useState } from 'react';
import { GroupEntity, PostEntity } from '../../types/api';
import groupService from '../../services/group-service';
import postService from '../../services/post-service';
import PostCard from '../../components/post/PostCard';

const Feed = () => {

const [posts, setPosts] = useState<PostEntity[] | []>([]);

useEffect(() => {
    void (async () => {
        setPosts(await postService.getAllPosts());
    })();
    }, []);

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

export default Feed;
