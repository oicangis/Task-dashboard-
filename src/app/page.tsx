'use client';

import { useEffectEvent, useState, useEffect } from 'react';
import  Button  from '@/components/atoms/button/buttons';
import Input from '@/components/atoms/input/input';
import Textarea from '@/components/atoms/textarea/textarea';
import Checkbox from '@/components/atoms/checkbox/checkbox';
import { Task } from '@/types/task';
import TaskItem from '@/components/molecules/TaskItem/TaskItem';
import FilterButton from '../components/molecules/Filterbutton/Filterbutton';


  export default function DashboardPage() {
    

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

      return (
     <main className="mx-auto max-w-2xl px-4 py-10">
  <h1 className="text-2xl font-semibold text-gray-900 mb-6">Mis tareas</h1>

  <form onSubmit={handleCreate} className="mb-8 space-y-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <Input
      type="text"
      placeholder="Título de la tarea"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p className="text-xs text-red-500">{error}</p>
    <Textarea
      placeholder="Descripción (opcional)"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={2}
    />
    <Button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
      {editingTask?`EDITAR TAREA`:`AGREGAR TAREA`}
    </Button>
    {editingTask && <Button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"onClick={()=>{
    setTitle("")
    setDescription("")
    seteditingTask(null)
  }}>
    Cancelar
    </Button>}
  </form>

  <FilterButton
  filter={filter}
  setfilter={setFilter}
  />

  <ul className="space-y-2">
    {filteredTasks.map((task) => (
      <TaskItem
      key={task.id}
      task={task}
      deleteTask={deleteTask}
      editarTask={editarTask}
      onEdit={onEdit}    
      />
    ))}
  </ul>
</main>
  );
  }