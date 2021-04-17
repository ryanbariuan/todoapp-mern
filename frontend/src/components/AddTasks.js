import React from 'react';
import { connect } from 'react-redux';
//import {v4} from 'uuid';
import axios from 'axios';

class AddTasks extends React.Component {
  state = {
    //id: '',
    name: '',
    status: 'pending',
    statusList: ['pending', 'done'],
  };

  taskNameChangeHandler = (event) => {
    this.setState({
      name: event.target.value,
    });

    //console.log(event.target.value);
  };

  taskStatusChangeHandler = (event) => {
    this.setState({
      status: event.target.value,
    });

    //console.log(event.target.value);
  };

  btnSubmitTask = () => {
    let submitTask = {
      //id: v4(),
      name: this.state.name,
      status: this.state.status,
    };

    //let backendURL = process.env.BACKEND_URI;

    axios
      .post(
        `https://rbariuan-demo-mern-todoapp-01.herokuapp.com/tasks`,
        submitTask
      )
      .then((res) => {
        this.props.saveTask(res.data);
      });

    // axios.post('http://localhost:8080/tasks', submitTask).then(res =>{
    //   this.props.saveTask(res.data);
    // });

    //this.props.saveTask(submitTask);

    this.setState({
      name: '',
      status: 'pending',
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => this.taskNameChangeHandler(e)}
        ></input>
        <select
          value={this.state.status}
          onChange={(e) => this.taskStatusChangeHandler(e)}
        >
          {this.state.statusList.map((stat) => {
            return <option key={stat}>{stat}</option>;
          })}
        </select>
        <button onClick={(e) => this.btnSubmitTask(e)}>Submit Task</button>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    tasks: store.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveTask: (submitTask) => {
      let action = {
        type: 'ADD_TASK',
        payload: submitTask,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTasks);
