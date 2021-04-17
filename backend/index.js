const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todoappdb',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(cors());

const Task = require('./models/Task.js');


// used to display data
app.get('/tasks', (req, res)=>{
  console.log(process.env.MONGODB_URI);
  Task.find().then((data)=> {
    res.send(data);
  });
});

// used to save new data to DB
app.post('/tasks', (req, res)=>{
  let newTask = new Task(req.body);
  newTask.save().then(data =>{
    res.send(data);
  });
});

// used for delete by checking the _id on database
app.delete('/tasks/:_id', (req, res) =>{
  Task.findByIdAndDelete(req.params._id).then(deletedTask =>{
    res.send(deletedTask);
  });
});

// used for updating by checking the_id on database
app.put('/tasks/:_id', (req, res) =>{
  Task.findByIdAndUpdate(req.params._id, req.body).then(oldTask =>{
    res.send(oldTask);
  });
});


app.listen(port, () =>{
  console.log(`todoappserver is listennnig to port ${port}`);
});