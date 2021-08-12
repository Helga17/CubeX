import React from "react";
import Buttons from "./Buttons";
import Input from "./Input";

const TodoList = ({todoItems, setItems, id = null, remove, onUp, onDown, setList}) => {

  const addTask = (task, ids = null) => {
    if (!task) {
      return;
    }
    setItems(id,task)
  } 

  const onDelete = (id) => {
    remove(id);
  }

  const onMoveUp = (id, parentId) => {
    onUp(id, parentId);
  }

  const onMoveDown = (id, parentId) => {
    onDown(id, parentId);
  }
  

  const todos = todoItems && todoItems.map((todoItem, index) => {
    let firstItem = index === 0;
    let lastItem = index === todoItems.length - 1;
    return (
      <li key={index}>
        {todoItem.task}
        <Buttons 
          onDelete={onDelete} 
          onMoveUp={onMoveUp} 
          onMoveDown={onMoveDown} 
          id={todoItem.id}
          todoItems={todoItems} 
          parentId={todoItem.parentId} 
          item={todoItem} 
          first={firstItem}
          last={lastItem}
        />
        <TodoList todoItems={todoItem.collection} setItems={setItems} id={todoItem.id} remove={remove} onUp={onUp} onDown={onDown} />
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