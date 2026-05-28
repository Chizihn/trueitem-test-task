import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "todo-client-id";

export function generateClientId(): string {
  return uuidv4();
}

export function getOrCreateClientId(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored;
    }
  } catch {
    console.error("Local storage is not available");
  }

  const newId = generateClientId();

  try {
    localStorage.setItem(STORAGE_KEY, newId);
  } catch {
    console.error("Local storage is not available");
  }

  return newId;
}
