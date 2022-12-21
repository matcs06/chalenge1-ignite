import { HTMLAttributeAnchorTarget, useState } from 'react'
import logo from './logo.svg'
import styles from './App.module.css'
import { Task } from './components/Task'
import {BiPlusCircle} from "react-icons/bi"
import { v4 as uuidv4 } from 'uuid';
import {TbReportAnalytics} from "react-icons/tb"

interface Item{
  id: string,
  title: string,
  isDone: boolean,
}
function App() {
  const [item, setItem] = useState<Item[]>([])
  const [taskInputed, setTaskInputed] = useState("")

  function handleTodoValue(event: React.ChangeEvent<HTMLInputElement>){
    event?.preventDefault()
    setTaskInputed(event?.target.value)

  }

  const checkedTasks = item.filter((itemchecked)=> itemchecked.isDone)

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>){
    event?.preventDefault()

    const newItem = {id: uuidv4(), title: taskInputed, isDone: false}


    setItem([...item, newItem])
    setTaskInputed("")
  }

  function checkItem(isDone: boolean, id:string){
    const updatedItems = item.map((eachItem)=>{
      if(eachItem.id === id){
        eachItem.isDone = isDone
      }
      return eachItem
    })

    setItem(updatedItems)

  }

  function deleteItem(id:string){

    const remainingItems = item.filter((item)=> item.id !== id )

    setItem(remainingItems)
  }
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src="../assets/rocket.png" alt="image-foguete" />
        <img src="../assets/todo.png" alt="todo-header-logo" />
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
         <input className={styles.input} type="text" placeholder='Adicione uma nova tarefa' onChange={handleTodoValue} value={taskInputed}/>
          <button type='submit'>Criar <BiPlusCircle size={16}/></button>
        </form>
        <div className={styles.summary}>
          <p>Tarefas criadas <span>{item.length}</span></p>
          <p>Concluídas <span>{checkedTasks.length} de {item.length}</span></p>
        </div>
        <main className={styles.items}>
          {item.length > 0 ? item.map((item: Item)=>{
            return <Task id={item.id} isDone={item.isDone} key={item.id} title={item.title} deleteItem={deleteItem} checkItem={checkItem}/>
          }): (
            <div className={styles.empty}>
              <TbReportAnalytics size={70}/>
              <p> <b>Você ainda não tem tarefas cadastradas</b> </p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </main>
        
      
      </main>
    </div>
  )
}

export default App
