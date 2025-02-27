import React, { useEffect } from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import axios from 'axios'
import { UserContext } from "../ContextAPI/ContextProvider";
import { useContext } from "react";

const SidebarSort = ({notes, setNotes}) => {
  const [sortOrder, setSortOrder] = React.useState('none');
  const User = useContext(UserContext)
  const token = localStorage.getItem('token')

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };
  
  useEffect(() => {
    const sortNotes = async () => {
      const result = await axios.get(
        `http://localhost:3000/notes/sortbytitle?username=${User.username}&sortOrder=${sortOrder}`,
        {
          headers: { Authorization: `${token || ""}` },
        }
      );
      setNotes(result.data)
    }
    if(sortOrder !== 'none'){
          sortNotes();
    }

  },[sortOrder,  User.username])

  return (
    <div style={{marginLeft : '2em', marginTop : '2em'}}>
      <Typography variant='h6'>Sorting Order</Typography>
      <RadioGroup
        name="sort-order"
        value={sortOrder}
        onChange={handleSortChange}
      >
        <FormControlLabel value="none" control={<Radio />} label="None" />
        <FormControlLabel value="ascending" control={<Radio />} label="Ascending" />
        <FormControlLabel value="descending" control={<Radio />} label="Descending" />
      </RadioGroup>
    </div>
  );
};

export default SidebarSort;