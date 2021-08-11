import React from 'react';

const Buttons = ({onDelete, onUp, onDown, id, index, parentId}) => {
    return (
        <span className="buttons">
            <button onClick={()=> onUp(id, parentId)}><i className='fas fa-angle-up'></i></button>
            <button onClick={()=> onDown(id, index)}><i className='fas fa-angle-down'></i></button>
            <button onClick={()=> onDelete(id, index)}>X</button>
        </span>
    )
}

export default Buttons;