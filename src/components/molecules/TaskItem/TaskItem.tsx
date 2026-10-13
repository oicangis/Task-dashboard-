import { Task } from "@/types/task"

type TaskItemProp = {
    task: Task;
    onEdit: (task:Task) => void
    deleteTask: (task:Task) => void
    editarTask:(task: Task, newtitle: string, newdescription: string | null, newCompleted: boolean)=> void

}

export default function TaskItem ({task,onEdit,deleteTask,editarTask}:TaskItemProp){
    
}