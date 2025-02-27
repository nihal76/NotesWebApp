import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Card, IconButton, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../ContextAPI/ContextProvider';
import { useContext } from 'react';


const CreateNoteCard = () => {
  const navigate = useNavigate()
      const User =  useContext(UserContext)

    const createNote = () => {
         if(User.isLogged){
              navigate(`/createNote/${User.username}`);
         }
         else{
          navigate('/signin')
         }
    };

  return (
    <Card
      sx={{width : '25vw', display : 'flex', flexDirection : 'column', margin : '2em'}}
    >
      <Typography variant="h6">Click the icon to create new note</Typography>
      <IconButton sx={{pointer : 'cursor'}} onClick={createNote}>
        <AddIcon />
      </IconButton>
    </Card>
  );
};

export default CreateNoteCard;
