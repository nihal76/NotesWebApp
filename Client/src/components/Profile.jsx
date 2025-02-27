import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Box, TextField } from '@mui/material';
import axios from 'axios'
import { useContext } from 'react';
import { UserContext } from '../ContextAPI/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userinfo,setuserinfo, notes, setNotes }) => {
   const [edit, setedit] = useState(false)
   const [edittext, setedittext] = useState({
    username : '',
    email : ''
   })
   const [logoutuser, setlogout] = useState(false)
  const { username, setUsername, isLogged, setIsLogged } =
    useContext(UserContext);
     isLogged, setIsLogged, username, setUsername;
    const token = localStorage.getItem('token')

  const editProfile = async() => {
    console.log('to be updated ', edittext)
      const result = await axios.put(
        `http://localhost:3000/users/update/${userinfo.username}`,
        edittext,
        {
          headers: { Authorization: `${token || ""}` },
        }
      );
      console.log('profile update ',result.data)
        setedit(false);
      setuserinfo(result.data)
            setUsername(result.data.username);
      setedittext({
        username: "",
        email: "",
      });
  }

  const logout = async() => {
    const result = axios.delete(
      `http://localhost:3000/users/delete/${userinfo.username}`
    );
    // update context api
    setIsLogged(false);
    setNotes([]);
    setuserinfo({});
    setlogout(!logoutuser);
  }

  return (
    <>
      {logoutuser ? (
        <h3>You have been logged out create account</h3>
      ) : (
        <Box
          sx={{
            p: 2,
            backgroundColor: "#F0F8FF",
            borderRadius: "8px",
            maxWidth: "400px",
            margin: "auto",
          }}
        >
          {!edit ? (
            <>
              <Typography variant="h5">Profile</Typography>
              <Typography variant="body1">
                <strong>Username:</strong> {userinfo.username}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {userinfo.email}
              </Typography>
            </>
          ) : (
            <>
              <Box>
                <Typography>Username</Typography>
                <TextField
                  value={edittext.username}
                  onChange={(e) =>
                    setedittext({ ...edittext, username: e.target.value })
                  }
                />
              </Box>
              <Box>
                <Typography value={edittext.email}>Email</Typography>
                <TextField
                  value={edittext.email}
                  onChange={(e) =>
                    setedittext({ ...edittext, email: e.target.value })
                  }
                />
              </Box>
            </>
          )}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            {!edit ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setedit(true);
                  setedittext({
                    username: userinfo.username,
                    email: userinfo.email,
                  });
                }}
              >
                Edit
              </Button>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button color="error" variant="contained" onClick={editProfile}>
                  Save
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => setedit(!edit)}
                >
                  Cancel
                </Button>
              </Box>
            )}
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};


export default Profile;