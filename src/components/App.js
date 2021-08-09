import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';

function App() {
const [list, setList] = useState([])

const addListItem = (id, data) => {
    if(!!list.length){
      return list.map(todo => {
        if (todo.id === id){
          todo.collection.push({...data});
          return todo;
        } else return addListItem(id, todo.collection);
      })
    } else {
      return list;
    }
}

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact><TodoList list={list} addListItem={addListItem}/></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
