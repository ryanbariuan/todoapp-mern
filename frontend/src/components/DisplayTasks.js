import React from 'react';
//import {connect} from 'react-redux';

class DisplayTasks extends React.Component
{
  render()
  {
    return(
      <tr>
          <td>{this.props.task.name}</td>
          <td>{this.props.task.status}</td>
      </tr>
    );
  }
}

export default DisplayTasks;