const express = require('express');
const mongoose = require('mongoose');
const authentication = require('./routes/auth');
const profile = require('./routes/Profile');
const createNote = require('./routes/createNote');
const GetNotes = require('./routes/GetNotes');
const deleteNote = require('./routes/deletenote')
const editNote = require('./routes/editnote')
const searchNote = require("./routes/searchnote");
const userRoute = require('./routes/users')
const updateUser = require('./routes/update')
const deleteUser = require('./routes/delete')
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO)
.then(() => console.log('connected'))
.catch(() => console.log('error'))

// Routes

app.use('/auth', authentication);
app.use('/createNote', createNote);
app.use('/notes',GetNotes);
app.use('/deletenote',deleteNote);
app.use('/editnote',editNote);
app.use('/searchNotes', searchNote);
app.use('/users',userRoute)
app.use('/users/update', updateUser)
app.use('/users/delete', deleteUser)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});