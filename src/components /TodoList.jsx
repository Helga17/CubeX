import React from "react";
import Buttons from "./Buttons";
import Input from "./Input";

const TodoList = ({todoItems, setItems, id = null, remove, onMoveUp, onMoveDown, setList}) => {

  const addTask = (task, ids = null) => {
    if (!task) {
      return;
    }
    setItems(id,task)
  } 

  const onDelete = (id) => {
    remove(id);
  }

  const findById = (data, id) => {
    console.log(data, id, 'findbyid')
    for (let item of data) {
      if (item.id === id) {
        return item;
      }

      if(item.collection) {
        let disaredELement = findById(item.collection, id);
        if (disaredELement) {
          return disaredELement;
        }
      }
    }
    return false;
  }

  const onUp = (id, parentId) => {
    console.log(parentId,'parent')
    let clonedArray = [...todoItems];
    if (parentId) {
      let parentTask = findById(clonedArray, parentId);
      let index = parentTask.collection.findIndex((task) => task.id === id);
      let findTask = parentTask.collection[index];
      parentTask.collection[index] = parentTask.collection[index - 1];
      parentTask.collection[index - 1] = findTask;
    } else {
      let index = clonedArray.findIndex((task) => task.id === id);
      let findTask = clonedArray[index];
      clonedArray[index] = clonedArray[index - 1];
      clonedArray[index - 1] = findTask;
    }
    
    setList(clonedArray);
  }

  const onDown = (id, index) => {
    let clonedArray = [...todoItems];
    let temporary = clonedArray[index];
    if (index !== clonedArray.length - 1) {
      clonedArray[index] = clonedArray[index + 1];
      clonedArray[index + 1] = temporary;
    }
    
    setList(clonedArray);
  }

  const todos = todoItems.map((todoItem, index) =>{
    return (
      <li key={index}>
        {todoItem.task}
        <Buttons onDelete={onDelete} onUp={onUp} onDown={onDown} id={todoItem.id} index={index} todoItems={todoItems} parentId={todoItem.parentId} />
        <TodoList todoItems={todoItem.collection} setItems={setItems} id={todoItem.id} remove={remove}/>
      </li>
    );
  });

  return(
    <ul className="todolist">
      <Input addTask={addTask}/>
      {todos}
    </ul>
  )
}

export default TodoList;