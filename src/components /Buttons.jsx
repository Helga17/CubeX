import React from 'react';

const Buttons = ({onDelete, onMoveUp, onMoveDown, id,parentId, item, first, last}) => {
    return (
        <span className="buttons">

            {item &&
            <span>
                {!first && <button onClick={()=> onMoveUp(id, parentId)}><i className='fas fa-angle-up'></i></button>}
                {!last && <button onClick={()=> onMoveDown(id, parentId)}><i className='fas fa-angle-down'></i></button>}
            </span>}
            <button onClick={()=> onDelete(id)}>X</button>
        </span>
    )
}

export default Buttons;