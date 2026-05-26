import { useState, type FormEvent } from "react";
import Button from "./ui/Button";

interface TaskFormProps {
  onAdd: (title: string) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition"
      />

      <Button
        disabled={!value.trim()}
        className="disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition"
      >
        Add Task
      </Button>
    </form>
  );
}
