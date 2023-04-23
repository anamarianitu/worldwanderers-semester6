import { styled } from '@mui/material/styles';
import { Stack, Box, Container, Button } from '@mui/material';
import GroupCard from '../../components/group/GroupCard';
import ImageMaldives from '../../assets/images-groups/maldives.jpg'
import ImageBucharest from '../../assets/images-groups/bucharest.jpg'
import ImageMadeira from '../../assets/images-groups/madeira.jpg'
import ImageLech from '../../assets/images-groups/lech.jpg'
import ImageBusteni from '../../assets/images-groups/busteni.jpg'
import PostCard from '../../components/post/PostCard';

const Group = () => {
  return (
    <>
    <Container
      sx={{
        width: '90%',
        margin: '0 auto',
        marginTop: '100px',
    }}
    >
      <Button>Add post</Button>

    </Container>
      <Box
      sx={{
          width: '60%',
          margin: '0 auto',
          marginTop: '30px',
      }}
  >
      <Stack spacing={5}>
      <PostCard username='anamarianitu181' description='Wandering through the colorful streets of Marrakech 🧡 What is your favorite travel destination?'></PostCard>
      <PostCard username='elena123' description='Catching a glimpse of the Northern Lights in Iceland ✨ Truly a magical experience!'></PostCard>
      <PostCard username='bibisor_mic' description='Exploring the ancient ruins of Machu Picchu 🏛️ A true wonder of the world!'></PostCard>
      <PostCard username='streche_aa' description='Feeling small next to the towering mountains of Patagonia 🏔️ Nature never ceases to amaze me.'></PostCard>
      <PostCard username='anilinque_55' description='Dipping my toes in the crystal-clear waters of the Maldives 🌴 Paradise found!'></PostCard>
      </Stack>
      </Box>
    </>

  );
};

export default Group;





