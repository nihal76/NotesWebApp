import React, { useState, useEffect } from 'react'
import CreateNoteCard from '../components/CreateNoteCard'
import AllNotes from '../components/AllNotes'
import Sidebar from '../components/Sidebar'
import { Box } from '@mui/material'
import axios from 'axios'
import { UserContext } from "../ContextAPI/ContextProvider";
import { useContext } from 'react'

const Home = ({notes, setNotes}) => {
  // fetch userinfo
   const User = useContext(UserContext);
   const [userinfo, setuserinfo] = useState({})
   
   useEffect(() => {
      const fetchUser = async (params) => {
        const result = await axios.get(`http://localhost:3000/users/${User.username}`);
        if(result.status === 200){
          setuserinfo(result.data)
        }
      }
      fetchUser()
   },[])

  return (
    <Box sx={{ display: "flex" }}>
      { User.isLogged ?  <Sidebar notes={notes} setNotes={setNotes} userinfo ={userinfo} setuserinfo={setuserinfo}/> : null}
      <Box>
        <CreateNoteCard />
        <AllNotes notes={notes} setNotes={setNotes} />
      </Box>
    </Box>
  );
}

export default Home