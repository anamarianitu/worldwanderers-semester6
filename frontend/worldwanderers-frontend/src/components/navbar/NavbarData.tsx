import HomeIcon from '@mui/icons-material/Home';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShareIcon from '@mui/icons-material/Share';
// import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LogoutIcon from '@mui/icons-material/Logout';

export const pages = [
    {
      key: 0,
      text: 'Feed',
      href: '/feed',
      icon: <HomeIcon />,
    },
    {
      key: 1,
      text: 'Groups',
      href: '/groups',
      icon: <ShareIcon />,
    },
    {
      key: 2,
      text: 'Profile',
      href: '/profile',
      icon: <AccountCircleIcon />,
    },
];
