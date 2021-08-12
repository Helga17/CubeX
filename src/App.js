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

  const findById = (data, itemId) => {
    for (let item of data) {
      if (item.id === itemId) {
        return item;
      }

      if(item.collection) {
        let desiredItem = findById(item.collection, itemId);
        if (desiredItem) {
          return desiredItem;
        }
      }
    }
    return false;
  };

  const onMoveUpItem = (id, parentId) => {
    let clonedArray = [...list];
    if (parentId) {
      let desiredItem = findById(clonedArray, parentId);
      let index = desiredItem.collection.findIndex((task) => task.id === id);
      if (index > 0) {
        let tmp = desiredItem.collection[index];
        desiredItem.collection[index] = desiredItem.collection[index - 1];
        desiredItem.collection[index - 1] = tmp;
      }
    } else {
      let index = clonedArray.findIndex((task) => task.id === id);
      if (index > 0) {
        let findTask = clonedArray[index];
        clonedArray[index] = clonedArray[index - 1];
        clonedArray[index - 1] = findTask;
      }
    }
    
    return clonedArray;
  }

  const onUp = (id, parentId) => {
    setList((list) => [...onMoveUpItem(id, parentId, list)]);
  }

  const onMoveDownItem = (id, parentId) => {
    let clonedArray = [...list];
    if (parentId) {
      let desiredItem = findById(clonedArray, parentId);
      let index = desiredItem.collection.findIndex((task) => task.id === id);
        if (index !== desiredItem.collection.length - 1) {
          let tmp = desiredItem.collection[index];
          desiredItem.collection[index] = desiredItem.collection[index + 1];
          desiredItem.collection[index + 1] = tmp;
        }
    } else {
      let index = clonedArray.findIndex((task) => task.id === id);
        if(index !== clonedArray.length - 1) {
          let findTask = clonedArray[index];
          clonedArray[index] = clonedArray[index + 1];
          clonedArray[index + 1] = findTask;
        }
    }
    return clonedArray;
  }

  const onDown = (id, parentId) => {
    setList((list) => [...onMoveDownItem(id, parentId, list)]);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <div className="container">
            <h1>TodoList</h1>
            <TodoList todoItems={list} setItems={addItem} remove={removeItem} setList={setList}
            onUp={onUp} 
            onDown={onDown} />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
