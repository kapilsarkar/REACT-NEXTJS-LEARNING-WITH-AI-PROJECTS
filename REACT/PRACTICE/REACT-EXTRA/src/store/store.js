import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const store = persist((set, get) => ({
    count: 0,
    name: "kapil sarkar",
    increment: () => {
        set((state) => ({
            count: state.count + 1
        }
        ))
    },
    decrement: () => {
        set((state) => ({
            count: state.count > 0 ? state.count - 1 : 0
        }))
    },
    reset: () => {
        set(({
            count: 0
        }))
    },
    capitalizeName: () => {
        const { name } = get();
        set({
            name: name.charAt(0).toUpperCase() + name.slice(1)
        })
    },
    noCapitalizeName: () => {
        const { name } = get();
        set({
            name: name.charAt(0).toLowerCase() + name.slice(1)
        })
    }
}))

const useMyStore = create(devtools(store, {
    name: "myStore",
    storage: createJSONStorage(() => localStorage),
}));

export default useMyStore;