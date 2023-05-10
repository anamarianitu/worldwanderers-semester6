import { styled } from '@mui/material/styles';
import { Stack, Box, Container, Button } from '@mui/material';
// import GroupCard from '../../components/group/GroupCard';
// import ImageMaldives from '../../assets/images-groups/maldives.jpg'
// import ImageBucharest from '../../assets/images-groups/bucharest.jpg'
// import ImageMadeira from '../../assets/images-groups/madeira.jpg'
// import ImageLech from '../../assets/images-groups/lech.jpg'
// import ImageBusteni from '../../assets/images-groups/busteni.jpg'
import PostCard from '../../components/post/PostCard';
import { PostEntity } from '../../types/api';
import postService from '../../services/post-service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const Group = () => {

  const [posts, setPosts] = useState<PostEntity[] | []>([]);
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state.authentication.userId);
  const { id } = useParams();

  const navigateAddNewPost = () => {
    alert("navigate to add new post in group page");
  };

  useEffect(() => {
    void (async () => {
      setPosts(await postService.getAllPostsFromGroup(id));
    })();
    }, []);

    console.log(posts);


  return (
    <>
    <Container
      sx={{
        width: '90%',
        margin: '0 auto',
        marginTop: '100px',
    }}
    >
      <Button onClick={navigateAddNewPost}>Add post</Button>

    </Container>
      <Box
      sx={{
          width: '60%',
          margin: '0 auto',
          marginTop: '30px',
      }}
  >
      <Stack spacing={5}>

    {
        posts?.map((post) => (
          <PostCard key={post.id} postId={post.id} userId={post.userId} description={post.description} ></PostCard>
        ))
    }
      {/* <PostCard username='anamarianitu181' description='Wandering through the colorful streets of Marrakech 🧡 What is your favorite travel destination?'></PostCard>
      <PostCard username='elena123' description='Catching a glimpse of the Northern Lights in Iceland ✨ Truly a magical experience!'></PostCard>
      <PostCard username='bibisor_mic' description='Exploring the ancient ruins of Machu Picchu 🏛️ A true wonder of the world!'></PostCard>
      <PostCard username='streche_aa' description='Feeling small next to the towering mountains of Patagonia 🏔️ Nature never ceases to amaze me.'></PostCard>
      <PostCard username='anilinque_55' description='Dipping my toes in the crystal-clear waters of the Maldives 🌴 Paradise found!'></PostCard> */}
      </Stack>
      </Box>
    </>

  );
};

export default Group;





