import { create } from "zustand";

const useMyStore = create((set) => ({
    count: 0,
    name: "Kapil",
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

    },
}))

export default useMyStore;