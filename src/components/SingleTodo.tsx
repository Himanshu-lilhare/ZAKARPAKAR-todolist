import { useState, useRef, useEffect } from 'react'
import { FiEdit2 } from "react-icons/fi"
import {BsThreeDotsVertical} from 'react-icons/bs'
import { MdDeleteOutline, MdOutlineFileDownloadDone } from "react-icons/md"
import { Todo } from '../App'

import '../App.css'

interface Props{
  todo:Todo;
  todos:Todo[];
  setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}


const SingleTodo = ({todo,todos,setTodos}:Props) => {

 const [edit,setEdit]=useState<boolean>(false)
const [editTodo,setEditTodo]=useState<string>(todo.todo)
const active=useRef<HTMLInputElement>(null)
const display=useRef<HTMLDivElement>(null)
const [visible,setVisible]=useState<boolean>(false)

  function handleDelete(id:number){
    setTodos(todos.filter((todo)=>{
      return todo.id!==id
    }))
    localStorage.clear()
    localStorage.setItem('todos',JSON.stringify(todos))
  }
  function handleComplete(id:number){
   setTodos(todos.map((todo)=>{
    if(todo.id==id){
      return {
       ...todo,isDone:!todo.isDone
      }
    }else{
      return todo
    }
   }))
  }
function handleEdit(e:any,id:number){
  e.preventDefault()
  setTodos(todos.map((todo)=> todo.id==id ?{...todo,todo:editTodo} : todo ))
  localStorage.clear() 
  localStorage.setItem('todos',JSON.stringify(todos))
  setEdit(false)
}
useEffect(()=>{
active.current?.focus()

},[edit])
function handleVisible(){
setVisible(!visible)
}
  return (
    <div className='singleTodo'>
      <div className='todoContent'>

        {
         edit ? <form onSubmit={(e)=>handleEdit(e,todo.id)} className='editForm'>
 <input className='editInput' ref={active} type="text" value={editTodo} onChange={(e)=>setEditTodo(e.target.value)} />
         </form>

         : todo.isDone ?
           <s className='content'>
            {todo.todo}
           </s> 
           :   
           <span className='content'>
           {todo.todo}
           </span>
         
        }

 
      </div>
      <div ref={display} className={visible ? 'displayflex todoIcons' : 'displaynone todoIcons'}>
    <span onClick={(e)=>{
     if(!edit && !todo.isDone){
        setEdit(!edit)
      }}}>
        <FiEdit2 />
    </span>
    <span onClick={(e)=>handleDelete(todo.id)}><MdDeleteOutline/></span>
    <span><MdOutlineFileDownloadDone onClick={()=>handleComplete(todo.id)}/></span>
      </div>

  <BsThreeDotsVertical onClick={handleVisible} className='threeDotIcons' style={{position:'absolute',right:'5px',color:'white'}}/>
 

      
    </div>
  )
}

export default SingleTodo