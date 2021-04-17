//import logo from './logo.svg';
import './App.css';
import Tasks from './Tasks.js';
import AddTasks from './AddTasks.js';
import {connect} from 'react-redux';
import React from 'react';
//import axios from 'axios';


class App extends React.Component {



  render()
  {
    return (
      <div className="App">
        <h1>To Do App</h1>
        <Tasks></Tasks>
        <AddTasks></AddTasks>
      </div>
    );
  }
}

const mapStateToProps = store =>
{
  return {
    tasks: store.tasks,
  };
};

export default connect(mapStateToProps)(App);

//export default App;