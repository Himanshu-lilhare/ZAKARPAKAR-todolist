import React from 'react'
import { Todo } from '../App'
import "../App.css"
import SingleTodo from './SingleTodo'


interface Props{
    todos:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoWrapper = ({todos,setTodos}:Props) => {
  return (
    <div className='todoWrapper'>
      {
        todos.map((todo)=>{
          return ( <SingleTodo key={todo.id}
                               todo={todo}
                               setTodos={setTodos}
                               todos={todos}
          />)
        })
      }
    
    </div>
  )
}

export default TodoWrapper