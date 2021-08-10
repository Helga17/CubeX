import React from "react";
import Buttons from "./Buttons";
import Input from "./Input";

const TodoList = ({todoItems, setTodoItems, setItems, id = null,}) => {

  const addTask = (task, ids = null) => {
    if (!task) {
      return;
    }
    setItems(id,task)
  } 

  const onDelete = (id, index) => {
    let newTodo = [...todoItems];
    newTodo = newTodo.filter(task => task.id !== id);

    setTodoItems(newTodo);
  }

  const onUp = (id, index) => {
    let clonedArray = [...todoItems];
    let temporary = clonedArray[index];
    clonedArray[index] = clonedArray[index - 1];
    clonedArray[index - 1] = temporary;
    setTodoItems(clonedArray);
  }

  const onDown = (id, index) => {
    let clonedArray = [...todoItems];
    let temporary = clonedArray[index];
    clonedArray[index] = clonedArray[index + 1];
    clonedArray[index + 1] = temporary;
    setTodoItems(clonedArray);
  }

  const todos = todoItems.map((todoItem, index) =>{
    console.log(todoItem)
    return (
      <li key={index}>
        {todoItem.task}
        <Buttons onDelete={onDelete} onUp={onUp} onDown={onDown} id={todoItem.id} index={index} />
        <TodoList todoItems={todoItem.collection} setItems={setItems} id={todoItem.id} />
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