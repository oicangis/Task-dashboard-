import Button from "@/components/atoms/button/buttons";
import Input from "@/components/atoms/input/input";
import Textarea from "@/components/atoms/textarea/textarea";
import { Task } from "@/types/task";

type TaskFormProps = {
    title: (string);
    setTitle:(titulo:string)=> void
    description: (string);
    setDescription:(descripcion:string)=>void
    handleCreate:(e: React.FormEvent) => void
    error:(string)
    editingTask:(Task | null)
    seteditingTask:(task:Task| null)=>void 
}

export default function TaskForm({title, setTitle,description,setDescription,handleCreate,error,editingTask, seteditingTask}:TaskFormProps){
    return(
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
    )

}