import { useState } from 'react';

const Form = ({onSubmit, item}) => {
    const [task, setTask] = useState("");

    const inputChange = (event) => {    
        setTask(event.target.value);
      };

    return(
        <div>
            <input type="text" value={task} onChange={inputChange} />
            <button onClick={() => { let id = item ? item.id : null; onSubmit(task, id);  setTask(""); }}>+</button>
        </div>
    );
}

export default Form;