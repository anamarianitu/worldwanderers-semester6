import { styled } from '@mui/material/styles';
import { Stack, Box } from '@mui/material';
import GroupCard from '../../components/group/GroupCard';
import ImageMaldives from '../../assets/images-groups/maldives.jpg'
import ImageBucharest from '../../assets/images-groups/bucharest.jpg'
import ImageMadeira from '../../assets/images-groups/madeira.jpg'
import ImageLech from '../../assets/images-groups/lech.jpg'
import ImageBusteni from '../../assets/images-groups/busteni.jpg'

const Feed = () => {
  return (
    <Box
    sx={{
        width: '80%',
        margin: '0 auto',
        marginTop: '100px',
        marginBottom: '100px',
    }}
>
    <Stack spacing={8}>
    <GroupCard title='Maldives and Beaches' image={ImageMaldives} description='Made up of around 1200 islands, the Maldives is hands-down one of the most interesting tropical destinations in the world. It first became popular with jet-setting celebrities a few years ago, particularly loved-up couples looking for a romantic getaway to a private tropical island. '></GroupCard>
    <GroupCard title='Bucharest' image={ImageBucharest} description='Bucharest is the capital city of Romania and one of the largest cities in Eastern Europe. It is known for its rich history, stunning architecture, and vibrant culture. Visitors can explore a variety of museums, including the National Museum of Art of Romania and the Museum of the Romanian Peasant, or take a stroll through one of the city many parks. Bucharest is also a hub for nightlife, with a variety of bars, clubs, and restaurants to choose from.'></GroupCard>
    <GroupCard title='Madeira' image={ImageMadeira} description='Madeira is a Portuguese island located off the coast of Africa. Known as the "Pearl of the Atlantic," it is a popular destination for its stunning natural beauty, including lush green landscapes, towering cliffs, and crystal-clear waters. Visitors can explore the island many hiking trails, take a dip in one of its natural swimming pools, or indulge in the local cuisine, which includes fresh seafood and a variety of traditional dishes.'></GroupCard>
    <GroupCard title='Lech' image={ImageLech} description='Lech is a picturesque town located in the Austrian Alps. It is a popular destination for skiing and winter sports, with a variety of ski runs and snow parks to choose from. In the summer, visitors can hike through the surrounding mountains, take a dip in the town outdoor pool, or enjoy a game of tennis or golf. Lech is also known for its luxurious accommodations and fine dining options.'></GroupCard>
    <GroupCard title='Busteni' image={ImageBusteni} description='Busteni is a small mountain town located in Romania Carpathian Mountains. It is a popular destination for hiking and outdoor activities, with a variety of trails and natural landmarks to explore. Visitors can take a cable car to the top of the nearby Bucegi Mountains, explore the town historic train station, or visit the nearby Peles Castle, a stunning 19th-century palace that was once the summer residence of the Romanian royal family.'></GroupCard>
    </Stack>
    </Box>
  );
};

export default Feed;





