import React from "react";
import Form from "./Form";
import TodoList from "./TodoList";

  const List = ({dataTasks,onSubmit }) => {

    return (
      <div>
        {dataTasks.map((item) => {
          return(
            <ul key={item.id}>
              <li>{item.task}</li>
              <button>x</button>
              {/* <TodoList item={item.id} list={item.collection} /> */}
              <Form item={item} onSubmit={onSubmit} />

              <List dataTasks={item.collection} onSubmit={onSubmit} />
            </ul>
            
          )}
        )}
      </div>
    );
}

export default List;