import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
}

export default function TaskList({ tasks, onDelete, onToggle }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 text-neutral-600 text-sm">
        No tasks yet. Add one above.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
