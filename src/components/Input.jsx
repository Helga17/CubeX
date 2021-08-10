import React, { useState } from "react";

const Input = ({addTask, id}) => {
    const [task, setTask] = useState('');

    const inputChange = (event) => {
        setTask(event.target.value);
    }

    return(
       <span>
            <input type="text" onChange={inputChange} value={task} />
            <button onClick={() => {addTask(task, id); setTask('');}}>+</button>
       </span>
    )
}

export default Input;