import { create } from "zustand";
import { logger } from "./logger";

interface CounterState {
  value: number;
}

export interface CounterStore extends CounterState {
  setValue: (args: number) => void;
}

const initialState: Pick<CounterStore, keyof CounterState> = {
  value: 0,
};

export const useCounterStore = create<CounterStore>()(
  logger<CounterStore>(
    (set) => ({
      ...initialState,
      setValue: (number) => {
        set({ value: number });
      },
    }),
    "authStore"
  )
);
