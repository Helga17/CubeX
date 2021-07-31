import { useState } from "react";
import "./styles.css";

const App = () => {
  let [task, setTask] = useState("");
  let [subTasks, setSubTasks] = useState({});
  const [dataTasks, setDataTasks] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [inputState, setInputState] = useState({});

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
    let clonedArray = [...dataTasks];
    let temporary = clonedArray[index];
    clonedArray[index] = clonedArray[index + 1];
    clonedArray[index + 1] = temporary;
    setDataTasks(clonedArray);
  };

  const handleClick = (index) => {
    let clonedInputState = { ...inputState };

    if (!clonedInputState.hasOwnProperty(index)) {
      clonedInputState[index] = true;
    } else {
      clonedInputState[index] = !clonedInputState[index];
    }

    setInputState(clonedInputState);
  };

  const onSubmitSubTask = (index) => {
    let clonedSubTasks = { ...subTasks };
    if (subTasks) {
      dataTasks[index].collection.push(subTasks[index]);
    }

    clonedSubTasks[index] = "";
    setSubTasks(clonedSubTasks);

    return dataTasks[index].collection;
  };

  const taskElements = dataTasks.map((item, index) => {
    return (
      <ul className="tasks">
        <li key={index} index={index}>
          {item.message}
          {dataTasks[index].collection.map((task, index) => {
            return (
              <ul key={index}>
                <li>{task}</li>
              </ul>
            );
          })}
        </li>
        <div className="buttons">
          <button className="remove" onClick={() => onRemove(index)}>
            X
          </button>
          <span className="btn-move">
            {index !== 0 ? (
              <button onClick={() => onMoveUp(index)}>Up</button>
            ) : null}
            {index !== dataTasks.length - 1 ? (
              <button onClick={() => onMoveDown(index)}>Down</button>
            ) : null}
          </span>
          <div className="under">
            <button className="btn-add" onClick={() => handleClick(index)}>
              Add +
            </button>
            {inputState[index] && (
              <div className="under-task">
                <input
                  type="text"
                  onChange={(event) => inputChangeSubTask(event, index)}
                  value={subTasks[index]}
                />
                <button
                  className="btn-add"
                  onClick={() => onSubmitSubTask(index)}
                >
                  OnSubmit
                </button>
              </div>
            )}
          </div>
        </div>
      </ul>
    );
  });
  return (
    <div className="App">
      <div className="block">
        <div className="content">{taskElements}</div>
        <div className="inner">
          <input type="text" onChange={inputChange} value={task} />
          <button className="btn-add" onClick={() => onSubmit()}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
