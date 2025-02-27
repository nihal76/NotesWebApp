import React, { useEffect, useState } from 'react'
import { Box, Typography, Card, IconButton, Button,TextField } from "@mui/material";
import axios from 'axios'
import { UserContext } from '../ContextAPI/ContextProvider'
import { useContext } from 'react'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const AllNotes = ({notes, setNotes}) => {
         const User = useContext(UserContext);
         const token = localStorage.getItem('token')
          console.log('all notes ', User)
          // note editing
          const[isEdit, setisEdit] = useState(false)
          const[editText, seteditText] = useState({
            title : '',
            description : ''
          })
          const[editId, seteditId] = useState('')

  useEffect(() => {
    async function fetchNotes(){
       const result = await axios.get(
         `http://localhost:3000/notes/${User.username}`,
         {
           headers: { Authorization: `${token || ""}` },
         }
       );
       if(result.status === 200){
          setNotes(result.data)
       }
    }
    fetchNotes()
  },[])

  // delete note
  const deleteNote =async (noteId) => {
    const result = await axios.delete(
      `http://localhost:3000/deletenote/${noteId}`,
      {
        headers: { Authorization: `${token || ""}` },
      }
    );
    setNotes(result.data.remainingNotes);
  }
  // edit note
  const editNote = async (noteId) => {
    console.log('note id', noteId)
    const result = await axios.put(
      `http://localhost:3000/editnote/${noteId}`,
      editText,
      {
        headers: { Authorization: `${token || ""}` },
      }
    );
    setNotes(result.data.notes)
     setisEdit(false);
    seteditText({
      title: "",
      description: "",
    });
  }

  return (
    <>
      {notes.length > 0 ? (
        <Box sx={{display : 'flex'}}>
          {notes.map((note) => {
            return (
              <>
                {isEdit && note._id === editId ? (
                  <Box>
                    <TextField
                      value={editText.title}
                      onChange={(e) =>
                        seteditText({ ...editText, title: e.target.value })
                      }
                      fullWidth
                    />
                    <TextField
                      value={editText.description}
                      onChange={(e) =>
                        seteditText({
                          ...editText,
                          description: e.target.value,
                        })
                      }
                      fullWidth
                      multiline
                    />
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => editNote(note._id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => setisEdit(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Card
                    key={note._id}
                    sx={{
                      maxWidth: 400,
                      m: 2,
                      p: 2,
                      boxShadow: 3,
                      borderRadius: 2,
                      bgcolor: "background.paper",
                    }}
                  >
                    {/* edit , delete */}
                    <Box>
                      <IconButton
                        color="warning"
                        onClick={() => {
                          setisEdit(true);
                          seteditId(note._id);
                          seteditText({
                            title: note.title,
                            description: note.description,
                          });
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="red"
                        onClick={() => deleteNote(note._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="h6">{note.title}</Typography>
                    <Typography variant="body2">{note.description}</Typography>
                  </Card>
                )}
              </>
            );
          })}
        </Box>
      ) : (
          <Typography sx={{textAlign : 'center'}}>No Notes found</Typography>
      )}
    </>
  );
}

export default AllNotes