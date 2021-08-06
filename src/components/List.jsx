import React from "react";
import TodoList from "./TodoList";

  const List = ({index, dataTasks, setDataTasks}) => {
    // const [inputState, setInputState] = useState({});
    // let [subTasks, setSubTasks] = useState({});
   
    // const inputChangeSubTask = (event, index) => {
    //   let clonedSubTasks = { ...subTasks };
    //   clonedSubTasks[index] = event.target.value;
  
    //   setSubTasks(clonedSubTasks);
    // };

    // const onSubmitSubTask = (index) => {
    //   let clonedSubTasks = { ...subTasks };
    //   if (subTasks) {
    //     dataTasks[index].collection.push(subTasks[index]);
    //   }
  
    //   clonedSubTasks[index] = "";
    //   setSubTasks(clonedSubTasks);
  
    //   return dataTasks[index].collection;
    // };
  
    const onRemoveSubTask = (index, subIndex) => {
      const clonedArray = [...dataTasks];
      let filtered = clonedArray[index].collection.filter((item, filteredIndex) => filteredIndex !== subIndex);
      clonedArray[index].collection = filtered;
      setDataTasks(clonedArray)
    }


    let listElements = dataTasks[index].collection.map((task, subIndex) => {
      return (
          <ul key={subIndex} className="subtasks">
              <li>
                  {task}
                  <button className="remove-subtask" onClick={() => onRemoveSubTask(index, subIndex)}>X</button>
                  <TodoList />
              </li>
            
          </ul>
      );
  })
  
    return (
      <div>
        {listElements}
      </div>
    );
}

export default List;