import { Task } from "@/types/task";
import { useEffect, useState } from "react";



export default function useTasks(){
    const [tasks,setTasks] = useState<Task[]>([]);
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [filter,setFilter] = useState("all")
    const [editingTask,seteditingTask] = useState<Task | null>(null)
    const [error,setError] = useState ("")


    async function traerTasks() {  
      const res = await fetch('/api/tasks')
      const data = await res.json()
      if(!res.ok){console.log("error", res.status)}
      setTasks(data)
      }

    useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    if(e.key === 'Escape') {
      setTitle('')
      setDescription('')
      seteditingTask(null)
    }
  }
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [])

    useEffect(()=>{
     traerTasks();
   
     }, []);
     useEffect(() => {
      console.log(editingTask)
    }, [editingTask])
    

     async function crearTasks(){
      console.log("TITULO",title)
      console.log("DESCRIPCION",description)
      const res = await fetch ('/api/tasks',{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
          title,
          description,
          completed:false,
          userId: "usuario-prueba-1"
        })
      })
      await traerTasks()
     }
     

      async function editarTask(task: Task, newtitle: string, newdescription: string | null, newCompleted: boolean){
        const res = await fetch(`/api/tasks/${task.id}`,{
          method:'PATCH',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            title:newtitle,
            description:newdescription,
            completed:newCompleted,
            userId: "usuario-prueba-1"
          })
        })
         if(!res.ok){console.log("error", res.status)}
        await traerTasks()
     }

     async function deleteTask(task: Task){
      const res = await fetch (`/api/tasks/${task.id}`,{
        method:'DELETE',
      })
       if(!res.ok){console.log("error", res.status)}
      await traerTasks()
     }
      async function handleCreate(e: React.FormEvent){
        e.preventDefault()
        console.log(editingTask)
        if(editingTask){ 
          console.log(editingTask)
          editarTask(editingTask, title, description, editingTask.completed)
          seteditingTask(null)
        }
        else if(title === null || title.length<3){setError("el titulo esta vacio o tiene menos de 3 caracteres")
          console.log("esto anda marcando error",error)
        }
        else {
          await crearTasks()
          setError('')
        }
        setTitle('')
        setDescription('')
      }
     const filteredTasks = tasks.filter((task) => {
      if (filter === 'pending') return !task.completed;
      if (filter === 'completed') return task.completed;
      if (filter === 'all') return true;
      });
      console.log(filteredTasks)

      function onEdit(task: Task){
          seteditingTask(task);
          setTitle(task.title);
          setDescription(task.description ?? '');
      }


    return{
    tasks,
    title,
    setTitle,
    description,
    setDescription,
    filter,
    setFilter,
    editingTask,
    seteditingTask,
    error,
    handleCreate,
    onEdit,
    deleteTask,
    editarTask,
    filteredTasks
    }
}