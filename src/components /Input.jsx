import React, { useState } from "react";

const Input = ({addTask, id}) => {
    const [task, setTask] = useState('');

    const inputChange = (event) => {
        setTask(event.target.value);
    }

    return(
       <span className="form">
            <input className="input" type="text" onChange={inputChange} value={task} placeholder="Add your task..." />
            <button className="btn-add" onClick={() => {addTask(task, id); setTask('');}}>+</button>
       </span>
    )
}

export default Input;