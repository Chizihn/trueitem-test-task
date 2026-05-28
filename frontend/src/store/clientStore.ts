import { getOrCreateClientId } from "../lib/generateClientId";
import { create } from "zustand";

interface ClientStore {
  clientId: string;
}

export const useClientStore = create<ClientStore>()(() => ({
  clientId: getOrCreateClientId(),
}));

