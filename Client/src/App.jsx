import React, { useState } from 'react'
// import SignUp from '../pages/SignUp'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import {  Routes, Route } from 'react-router-dom'
import Topbar from './components/Topbar'
import CreateNote from './pages/CreateNote'

const App = () => {
  // common state for multiple components 
  const [notes,setNotes] = useState([])
  return (
    <>
      <Topbar notes={notes} setNotes={setNotes} />
      <Routes>
        <Route path="/" element={<Home notes={notes} setNotes={setNotes} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createNote/:username" element={<CreateNote />} />
      </Routes>
    </>
  );
}

export default App;