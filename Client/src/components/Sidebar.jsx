import React from 'react'
import SidebarSort from './SidebarSort'
import Profile from './Profile';

const Sidebar = ({ notes, setNotes, userinfo, setuserinfo }) => {
  return (
    <div>
      <SidebarSort notes={notes} setNotes={setNotes} />
      <Profile userinfo={userinfo} setuserinfo={setuserinfo}/>
    </div>
  );
};

export default Sidebar