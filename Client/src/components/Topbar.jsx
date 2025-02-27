import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NoteIcon from '@mui/icons-material/Note';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CreateIcon from "@mui/icons-material/Create";
import { Select, TextField, MenuItem } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../ContextAPI/ContextProvider";
import axios from 'axios';
const Topbar = ({notes,setNotes}) => {
  const location = useLocation()
  // check if user is logged in
  const user =  useContext(UserContext)
  console.log('logged in ', user)
  const navigate = useNavigate()
// state for search
const [search, setSearch] = React.useState('')
// state for sort
const [sort, setSort] = React.useState('None')
const token = localStorage.getItem('token')

const [current,setcurrent] = useState('Home')

// search Notes
const Search = async (searchText) => {
  console.log('searching..', searchText)
  const result = await axios.get(
    `http://localhost:3000/searchNotes?username=${user.username}&searchTerm=${search}`,
    {
      headers: { Authorization: `${token || ""}` },
    }
  );
  console.log('search result ..', result.data)
    // update home page with searched notes
    if(result.status === 200){
      setNotes(result.data)
    }
    else{
      setNotes()
    }
}

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#ADD8E6", color: "black" }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="note">
          <NoteIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Note
        </Typography>
        {/* searching and sorting functionality  only after login*/}
        {user.isLogged ? (
          <Box sx={{ width: "50%" }}>
            <TextField
              label="Search"
              variant="filled"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                mx: 2,
                backgroundColor: "white",
                color: "black",
                height: "3em",
              }}
            />
            <Button
              sx={{
                backgroundColor: "darkred",
                color: "white",
                fontSize: "small",
              }}
              onClick={() => Search(search)}
            >
              Search
            </Button>
          </Box>
        ) : null}

        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            borderBottom: location.pathname == "/" ? "3px solid red" : null,
          }}
        >
          Home
        </Button>

        {user.isLogged ? (
          <>
            <Button
              color="inherit"
              component={Link}
              to={`/createNote/${user.username}`}
              sx={{
                display: "flex",
                gap: "10px",
                borderBottom:
                  location.pathname == `/create/${user.username}`
                    ? "3px solid red"
                    : null,
              }}
            >
              <h4> Create Note</h4>
              <CreateIcon />
            </Button>
            <Typography variant="h6" component="div" sx={{ mx: 2 }}>
              {user.username}
            </Typography>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/signin"
              sx={{
                borderBottom:
                  location.pathname == "/signin" ? "3px solid red" : null,
              }}
            >
              Sign In
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/signup"
              sx={{
                borderBottom:
                  location.pathname == "/signup" ? "3px solid red" : null,
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};


export default Topbar;