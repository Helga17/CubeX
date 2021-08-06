import React, { useState } from "react";
import List from "./List";

const TodoList = () => {
  let [task, setTask] = useState("");
  let [subTasks, setSubTasks] = useState({});
  const [dataTasks, setDataTasks] = useState([]);
  const [inputState, setInputState] = useState({});

console.log('dsdsad')

  const inputChange = (event) => {
    setTask(event.target.value);
  };

  const inputChangeSubTask = (event, index) => {
    let clonedSubTasks = { ...subTasks };
    clonedSubTasks[index] = event.target.value;

    setSubTasks(clonedSubTasks);
  };

  const onSubmit = () => {
    if (task) {
      task = {
        message: task,
        collection: []
      };
      dataTasks.push(task);
    }
    setTask("");
    return dataTasks;
  };

  const onRemove = (index) => {
    const newDataTasks = [...dataTasks];
    newDataTasks.splice(index, 1);
    setDataTasks(newDataTasks);
  };

  const onMoveUp = (index) => {
    let clonedArray = [...dataTasks];
    let temporary = clonedArray[index];
    clonedArray[index] = clonedArray[index - 1];
    clonedArray[index - 1] = temporary;
    setDataTasks(clonedArray);
  };

  const onMoveDown = (index) => {
    setDataTasks(dataTasks => {
        let temporary = dataTasks[index]
        dataTasks[index] = dataTasks[index + 1];
        dataTasks[index + 1] = temporary;
        return dataTasks
    });
  };
  console.log("test")
//   const handleClick = (index) => {
//     let clonedInputState = { ...inputState };

//     if (!clonedInputState.hasOwnProperty(index)) {
//       clonedInputState[index] = true;
//     } else {
//       clonedInputState[index] = !clonedInputState[index];
//     }

//     setInputState(clonedInputState);
//   };

  const onSubmitSubTask = (index) => {
    let clonedSubTasks = { ...subTasks };
    if (subTasks) {
      dataTasks[index].collection.push(subTasks[index]);
    }

    clonedSubTasks[index] = "";
    setSubTasks(clonedSubTasks);

    return dataTasks[index].collection;
  };

//   const onRemoveSubTask = (index, subIndex) => {
//     const clonedArray = [...dataTasks];
//     let filtered = clonedArray[index].collection.filter((item, filteredIndex) => filteredIndex !== subIndex);
//     clonedArray[index].collection = filtered;
//     setDataTasks(clonedArray)
//   }

  const taskElements = dataTasks.map((item, index) => {
    return (
        <div className="content" key={index}>
            <ul className="tasks">
                
                <div className="buttons">
                   
                    <span className="btn-move">
                        {index !== 0 ? (
                        <button onClick={() => onMoveUp(index)}><i className='fas fa-angle-up'></i></button>
                        ) : null}
                        {index !== dataTasks.length - 1 ? (
                        <button onClick={() => onMoveDown(index)}><i className='fas fa-angle-down'></i></button>
                        ) : null}
                    </span>
                    <div className="subtasks-block">
                        {/* <button className="btn-show" onClick={() => handleClick(index)}>Add +</button> */}
                        {/* {inputState[index] && ( */}
                        <div className="subtask">
                            <input type="text" onChange={(event) => inputChangeSubTask(event, index)} value={subTasks[index] || ""} placeholder="add a subtask" />
                            <button className="btn-add-subtask" onClick={() => onSubmitSubTask(index)}>+</button>
                        </div>
                        {/* )} */}
                    </div>
                    <li>
                    {item.message}

                    <button className="remove-task" onClick={() => onRemove(index)}>X</button>
                    <List index={index} dataTasks={dataTasks} setDataTasks={setDataTasks} />
                </li>
                </div>
            </ul>
        </div>
      
    );
  });

  return (
    <div className="container">
        <div className="main">
            <div className="block">
                {/* <p className="title">ToDo List</p> */}
                <div className="fill-data">
                    <input type="text" onChange={inputChange} value={task} placeholder="Add a task..." />
                    <button className="btn-add" onClick={() => onSubmit()}>+</button>
                </div>
                {taskElements}
            </div>
        </div>
    </div>
  );
};

export default TodoList;