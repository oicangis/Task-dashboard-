import { Task } from '@/types/task'
import Button from '@/components/atoms/button/buttons'
import Checkbox from '@/components/atoms/checkbox/checkbox'

type TaskItemProps = {
  task: Task
  onEdit: (task: Task) => void
  deleteTask: (task: Task) => void
  editarTask: (task: Task, newTitle: string, newDescription: string | null, newCompleted: boolean) => void
}

export default function TaskItem({ task, onEdit, deleteTask, editarTask }: TaskItemProps) {
  return (
    <li className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onChange={() => editarTask(task, task.title, task.description, !task.completed)}
          className="h-4 w-4 accent-blue-600"
        />
        <div>
          <p className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-gray-500 break-all">{task.description}</p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onEdit(task)} className="text-xs text-blue-500 hover:text-blue-700">
          Editar
        </Button>
        <Button onClick={() => deleteTask(task)} className="text-xs text-red-400 hover:text-red-600">
          Eliminar
        </Button>
      </div>
    </li>
  )
}