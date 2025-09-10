
import { useState } from 'react'
import './App.css'




function App() {
  const [todos, setTodos] = useState([]);
  const [title , setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = () => {
    setTodos([...todos, {id : Date.now() , title, description}])
    setDescription("");
    setTitle("");
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  return (
    <div>
        <input type="text" placeholder='Enter your title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder='Enter your description'  value={description} onChange={(e) => setDescription(e.target.value)}/>
        <button onClick={addTodo}>Added Todo</button>
        
        {
          todos.map((todo, index) => {
            return  (
              <div key={todo.id}>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <button onClick={() => removeTodo(todo.id)}>Remove Todo</button>
              </div>
            )
          })
        }
    </div>
  )
}

export default App
