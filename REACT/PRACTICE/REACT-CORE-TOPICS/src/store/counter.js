import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const counter = persist((set) => ({
    count: 0,

    increment: () => {
        set((state) => ({
            count: state.count + 1
        }))
    },
    decrement: () => {
        set((state) => ({
            count: state.count > 0 ? state.count - 1 : 0
        }))
    },
    reset: () => set({ count: 0 }),

}),
    {
        name: "counter-storage",
        storage: createJSONStorage(() => localStorage),
    }
)

const useCounterStore = create(devtools(counter, {
    name: "counter-storage",
}))

export default useCounterStore;