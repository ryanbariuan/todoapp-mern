//import {v4} from 'uuid';

const initialState = {
  /*tasks: [
    {
      id: v4(),
      name: 'eat',
      status: 'pending'
    },
    {
      id: v4(),
      name: 'code',
      status: 'pending'
    },
    {
      id: v4(),
      name: 'sleep',
      status: 'done'
    },
  ],*/

  tasks: []
  
};

const reducer = (state = initialState, action) => 
{
  if(action.type === 'ADD_TASK')
  {
    let tasksCopy = state.tasks.slice(0);
    //tasksCopy.id = v4();
    tasksCopy.push(action.payload);
    return state = {
      tasks: tasksCopy,
    }
  }
  if(action.type === 'DEL_TASK')
  {
    //let tasksCopy = state.tasks.slice(0);
    //let filterCopy = tasksCopy.filter(task => task.id !== action.payload);
    return state = {
      //tasks: filterCopy,
      tasks: action.payload // if already filtered in the component this refreshes the state?
    }
  }
  if(action.type === 'DEL_PENDING_TASK')
  {
    let tasksCopy = state.tasks.slice(0);
    let findPendingTaskCopy = tasksCopy.findIndex(task => task._id === action.payload._id);
    tasksCopy[findPendingTaskCopy] = action.payload;
    //console.log(findPendingTaskCopy);
    //console.log(action.payload);
    return state = 
    {
      tasks: tasksCopy,
    }
  }
  if(action.type === 'SET_DATA')
  {
    return{
      ...state,
      tasks: action.payload,
    };
  }
  return state;
}

export default reducer;