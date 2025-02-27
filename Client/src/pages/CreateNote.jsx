import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import {UserContext} from '../ContextAPI/ContextProvider'
import { useContext } from 'react';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState("");
  const token = localStorage.getItem('token')
  // get username from context api to create note
   const User = useContext(UserContext)
  const handleSubmit =async (e) => {
    e.preventDefault();
   const result = await axios.post(
     `http://localhost:3000/createNote/${User.username}`,
     {
       title,
       description,
     },
     {
       headers: { Authorization: `${token || ""}` },
     }
   );
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "2em" }}>
      <Typography variant="h4" component="h1">
        Create a New Note
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Note
        </Button>
      </form>
    </Container>
  );
};

export default CreateNote;