import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useCounterStore = create(
  devtools(
    persist(
      (set) => ({
        count: 0,

        increment: () =>
          set((state) => ({ count: state.count + 1 }), false, "increment"),

        decrement: () =>
          set(
            (state) => ({ count: Math.max(0, state.count - 1) }),
            false,
            "decrement"
          ),

        reset: () => set({ count: 0 }, false, "reset"),

        incrementByAmount: (amount) =>
          set(
            (state) => ({ count: state.count + Number(amount || 0) }),
            false,
            "incrementByAmount"
          ),

        decrementByAmount: (amount) =>
          set(
            (state) => ({
              count: Math.max(0, state.count - Number(amount || 0)),
            }),
            false,
            "decrementByAmount"
          ),

        multiplyByAmount: (amount) =>
          set(
            (state) => ({ count: state.count * Number(amount || 0) }),
            false,
            "multiplyByAmount"
          ),

        divideByAmount: (amount) => {
          const value = Number(amount);

          if (!value) return;

          set(
            (state) => ({ count: state.count / value }),
            false,
            "divideByAmount"
          );
        },
      }),
      {
        name: "counter-storage",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: "Counter Store",
    }
  )
);

export default useCounterStore;