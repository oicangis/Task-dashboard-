import TaskItem from "@/components/molecules/TaskItem/TaskItem"
import { Task } from "@/types/task"


type TaskListProp ={
    onEdit:(task: Task)=>void
    editarTask:(task: Task, newtitle: string, newdescription: string | null, newCompleted: boolean)=> void
    deleteTask: (task:Task)=>void
    filteredTasks:(Task[])
}

export default function TaskList ({onEdit,editarTask,deleteTask, filteredTasks}: TaskListProp){
    return(
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
  )
}