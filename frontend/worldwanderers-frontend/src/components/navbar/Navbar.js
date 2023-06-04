import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import { InputBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

import { useDispatch } from "react-redux";
import { logout } from "../../services/auth-service";
import Cookies from "js-cookie";

const NavigationBar = () => {
  const styles = {
    appBar: {
      zIndex: 1,
      backgroundColor: "#37306B",
      color: "#000",
    },
    leftIcons: {
      display: "flex",
      alignItems: "center",
      flex: 1,
    },
    iconButton: {
      borderRadius: "50%",
      backgroundColor: "#494569",
      marginRight: "16px",
    },
    iconButtonCenter: {
      marginRight: "16px",
      borderRadius: 0,
      "&:hover": {
        backgroundColor: "#fff",
      },
    },
    icon: {
      color: "#fff",
    },
    active: {
      color: "#fff",
      borderBottom: "2px solid #fff",
    },
    separator: {
      height: "24px",
      borderRight: "1px solid #ccc",
      marginLeft: "16px",
      marginRight: "16px",
    },
    centerIcons: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "45%",
    },
    rightIcons: {
      display: "flex",
      alignItems: "center",
      position: "absolute",
      right: 0,
    },
  };
  const [active, setActive] = useState("");
  const handleClick = (value) => {
    setActive(value);
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userId");
  };

  const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar>
        <div style={styles.leftIcons}>
          <IconButton sx={styles.iconButton} href="/feed">
            <div
              style={{
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                W
              </p>
            </div>
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{color: 'white'}} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{color: 'white'}}
            />
          </Search>
        </div>
        <div style={styles.centerIcons}>
          <IconButton
            href="/feed"
            onClick={() => handleClick("home")}
            sx={{margin: '10px'}}
          >
            <Badge badgeContent={0} color="primary">
              <HomeIcon sx={styles.icon} />
            </Badge>
          </IconButton>
          <IconButton
            onClick={() => handleClick("groups")}
            href="/groups"
            sx={{margin: '10px'}}
          >
            <Badge badgeContent={0} color="primary">
              <GroupsIcon sx={styles.icon} />
            </Badge>
          </IconButton>
          <IconButton
            onClick={() => handleClick("map")}
            href="/map"
            sx={{margin: '10px'}}
          >
            <Badge badgeContent={0} color="primary">
              <MapIcon sx={styles.icon} />
            </Badge>
          </IconButton>
        </div>
        <div style={styles.rightIcons}>
          <IconButton sx={styles.iconButton} href="/profile">
            <Badge badgeContent={0} color="primary">
              <AccountCircleIcon sx={styles.icon} />
            </Badge>
          </IconButton>
          <IconButton sx={styles.iconButton} onClick={handleLogout}>
            <Badge badgeContent={0} color="primary">
              <LogoutIcon sx={styles.icon} />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default NavigationBar;
