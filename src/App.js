import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [list, setList] = useState([])

  const addListItem = (id, task, list) => {
     if(!!id){
        return list.map(todo => {
          if (todo.id === id){
            todo.collection.push({id: Date.now(), task, collection: [], parentId: id });
            return todo;
          } else return {...todo, collection: [...addListItem(id, task, todo.collection)]};
        })
      } else {
        return [...list, {id: Date.now(), task, collection: [], parentId: null}];
      }
  }

  const addItem = (id = null, item) => {
    setList((list) => [...addListItem(id, item, list)]);
  }


  const removeListItem = (id, todoItems) => {
    return todoItems.filter(todo => {
      if(todo.id === id) {
        return false;
      } else {
        todo.collection = removeListItem(id, todo.collection)
        return true;
      }
    })
  } 

  const removeItem = (id) => {
    setList((list) => [...removeListItem(id, list)])
  }

  // const onMoveUpItem = (id, index, todoItems) => {
  //   console.log(id)
  //   // let clonedArray = [...todoItems];
  //   // let findIndex = null;

  //   // for (let item of clonedArray) {
  //   //  console.log(item)
  //   // }
  //   //
  // }

 

  const onMoveDown = (id, index) => {

  }


  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <div className="container">
            <h1>TodoList</h1>
            <TodoList todoItems={list} setItems={addItem} remove={removeItem} setList={setList}
            // onMoveUp={onMoveUpItem} 
            onMoveDown={onMoveDown} />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
