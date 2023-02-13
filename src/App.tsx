import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import TodoWrapper from './components/TodoWrapper'


export interface Todo{
  id:number;
  todo:string;
  isDone:boolean;
}
function App() {
  const [todo, settodo] = useState<string>('')
  const [todos,setTodos]=useState<Todo[]>([])

  function handleAdd(e:any){
    e.preventDefault()
     if(todo){
    
        todos.push({id:Date.now(),todo:todo,isDone:false})
        localStorage.setItem('todos',JSON.stringify(todos))
        settodo('')
      
     
      console.log(todos)
     }
  }
  useEffect(()=>{
     const storedTodos=localStorage.getItem('todos')
     if(storedTodos){
 setTodos(JSON.parse(localStorage.getItem('todos') || ''))
      
     }
       
  },[])

  
  return (
  <div className='app'>
   <div className='wrapper glow black'>
    <div className='inputWrapper' >
      <input
      onKeyUp={(e)=>e.key==='Enter' && handleAdd(e)}
      onChange={(e)=>{
      settodo(e.target.value)
    }} placeholder='ADD YOUR TASK' value={todo}/>
   <button onClick={(e)=>handleAdd(e)}>ADD</button>
  </div>

<TodoWrapper todos={todos} setTodos={setTodos}/>

  
   </div>
  </div>
  )
}

export default App
