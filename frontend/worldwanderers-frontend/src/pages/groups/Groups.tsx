import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import { Grid, Stack, Box, Typography } from '@mui/material';
import GroupCard from '../../components/group/GroupCard';
import ImageMaldives from '../../assets/images-groups/maldives.jpg'
import { useEffect, useState } from 'react';
import { GroupEntity } from '../../types/api';
import groupService from '../../services/group-service';
import { useSelector } from 'react-redux';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{width: '100%'}}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function GroupsPage() {
  const loggedInUserId = useSelector((state: any) => state.authentication.userId);
  const [value, setValue] = React.useState(0);
  const [allAvailableGroups, setAllAvailableGroups] = useState<GroupEntity[] | []>([]);
  const [allGroupsJoinedByUser, setAllGroupsJoinedByUser] = useState<GroupEntity[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allGroupsData, userGroupsData] = await Promise.all([
          groupService.getAllGroups(),
          groupService.getGroupsJoinedByUser(loggedInUserId)
        ]);

        setAllAvailableGroups(allGroupsData);
        setAllGroupsJoinedByUser(userGroupsData)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [loggedInUserId]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ bgcolor: 'background.paper', display: 'flex', marginTop: '100px' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', width: '25%' }}
      >
        <Tab label="Your Groups" {...a11yProps(0)} />
        <Tab label="Available Groups" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Stack spacing={6} sx={{ marginRight: '20px' }}>
            {allGroupsJoinedByUser?.map((group) => (
              <GroupCard
                key={group.id}
                id={group.id}
                title={group.title}
                image={ImageMaldives}
                description={group.description}
              ></GroupCard>
            ))}
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Stack spacing={6} sx={{  marginRight: '20px' }}>
            {allAvailableGroups?.map((group) => (
              <GroupCard
                key={group.id}
                id={group.id}
                title={group.title}
                image={ImageMaldives}
                description={group.description}
              ></GroupCard>
            ))}
        </Stack>
      </TabPanel>
    </Box>
  );
}
