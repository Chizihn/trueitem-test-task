import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { generateClientId } from "../lib/generateClientId";

interface ClientStore {
  clientId: string;
}

export const useClientStore = create<ClientStore>()(
  persist(
    () => ({
      clientId: generateClientId(),
    }),
    {
      name: "todo-client",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
