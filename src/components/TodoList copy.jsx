import React, { useState } from "react";
import Form from "./Form";
import List from "./List";

const TodoList = ({item, list}) => {
  const [dataTasks, setDataTasks] = useState([]);

  const onSubmit = (task, parentId) => {
    if (parentId === null) {
      setDataTasks(
        [...dataTasks ,
        {
          id: Date.now(),
          task: task,
          parentId: null,
          collection: []
        }
      ])
    } else {
      let clonedDataTasks = [...dataTasks];
      let parentItem = parentItem.collection;
      parentItem.push({
        id: Date.now(),
          task: task,
          parentId: null,
          collection: []
      });
      setDataTasks(clonedDataTasks)
    }

  };

  console.log(dataTasks)

  return(
    <div className="todolist">
      <Form onSubmit={onSubmit}/>
      <List dataTasks={dataTasks} onSubmit={onSubmit}  />
    </div>
  )
}

export default TodoList;