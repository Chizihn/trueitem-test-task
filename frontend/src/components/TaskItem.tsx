import { Trash } from "lucide-react";
import type { Task } from "../types";
import Button from "./ui/Button";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
}

export default function TaskItem({ task, onDelete, onToggle }: Props) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-900 hover:border-neutral-700 transition group">
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id, !task.completed)}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition ${
          task.completed
            ? "bg-orange-600 border-orange-600"
            : "border-neutral-600 hover:border-orange-400"
        }`}
      >
        {task.completed && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Title */}
      <span
        className={`flex-1 text-sm transition ${
          task.completed ? "line-through text-neutral-500" : "text-white"
        }`}
      >
        {task.title}
      </span>

      {/* Delete */}
      <Button
        variant="danger"
        size="icon"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100"
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
}
