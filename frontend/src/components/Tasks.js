import React from 'react';
import { connect } from 'react-redux';
import './Tasks.css';
//import DisplayTasks from './DisplayTasks.js';
import axios from 'axios';

class Tasks extends React.Component {
  componentDidMount() {
    //let backendURL = process.env.BACKEND_URI;

    axios
      .get(`https://rbariuan-demo-mern-todoapp-01.herokuapp.com/tasks`)
      .then((res) => {
        this.props.setTask(res.data);
      });

    // axios.get('http://localhost:8080/tasks').then(res => {
    //   this.props.setTask(res.data);
    // });
  }

  btnDeleteTask = (event) => {
    let delTaskID = event.target.value;

    //let backendURL = process.env.BACKEND_URI;

    axios
      .delete(
        `https://rbariuan-demo-mern-todoapp-01.herokuapp.com/tasks/${delTaskID}`
      )
      .then((res) => {
        let deleteTask = this.props.tasks.filter(
          (task) => task._id !== event.target.value
        );
        this.props.deleteTask(deleteTask);
      });

    // axios.delete(`http://localhost:8080/tasks/${delTaskID}`).then((res) => {
    //   let deleteTask = this.props.tasks.filter(
    //     (task) => task._id !== event.target.value
    //   );
    //   this.props.deleteTask(deleteTask);
    //   //this.props.deleteTask(delTaskID); // testing if sa reducer yung filtering
    // });

    //alert(event.target.value);

    //this.props.deleteTask(delTaskID);
  };

  btnDeletePendingTask = (event) => {
    let updatePending = {
      _id: event.target.value,
      name: event.target.name,
      status: 'done',
    };

    let backendURL = process.env.BACKEND_URI;

    axios
      .put(
        `https://rbariuan-demo-mern-todoapp-01.herokuapp.com/tasks/${event.target.value}`,
        updatePending
      )
      .then((res) => {
        this.props.donePendingTask(updatePending);
      });

    // axios
    //   .put(`http://localhost:8080/tasks/${event.target.value}`, updatePending)
    //   .then((res) => {
    //     this.props.donePendingTask(updatePending);
    //   });

    //this.props.donePendingTask(updatePending);
  };

  render() {
    //console.log(this.props.tasks);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Task Name:</th>
              <th>Task Status:</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map((task) => {
              return (
                <tr key={task._id}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
                /*<DisplayTasks //if using component
                    task = {task}
                    key = {task.name}
                  />*/
              );
            })}
          </tbody>
        </table>
        <h2>Pending</h2>
        <table>
          <thead>
            <tr>
              <th>Task Name:</th>
              <th>Task Status:</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tasks
              .filter((task) => {
                return task.status === 'pending';
              })
              .map((task) => {
                return (
                  <tr key={task._id}>
                    <td>
                      <button
                        name={task.name}
                        value={task._id}
                        onClick={(e) => this.btnDeletePendingTask(e)}
                      >
                        X
                      </button>
                      {task.name}
                    </td>
                    <td>{task.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <h2>Done</h2>
        <table>
          <thead>
            <tr>
              <th>Task Name:</th>
              <th>Task Status:</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tasks
              .filter((task) => {
                return task.status === 'done';
              })
              .map((task) => {
                return (
                  <tr key={task._id}>
                    <td>
                      <button
                        value={task._id}
                        onClick={(e) => this.btnDeleteTask(e)}
                      >
                        X
                      </button>
                      {task.name}
                    </td>
                    <td>{task.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
    deleteTask: (deleteID) => {
      let action = {
        type: 'DEL_TASK',
        payload: deleteID,
      };
      dispatch(action);
    },

    donePendingTask: (updatePendingTask) => {
      let action = {
        type: 'DEL_PENDING_TASK',
        payload: updatePendingTask,
      };
      dispatch(action);
    },

    setTask: (setData) => {
      let action = {
        type: 'SET_DATA',
        payload: setData,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
