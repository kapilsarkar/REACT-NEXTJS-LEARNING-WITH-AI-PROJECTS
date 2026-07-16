import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"


const useNameStore = create(devtools(persist((set, get) => ({
    name: "sachin ramesh tendulkar",

    capitalizeName: () => {
        const { name } = get();

        const capitalized = name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

        set({ name: capitalized })
    },
    noCapitalizeName: () => {
        const { name } = get();
        const unCapitalized = name.split(" ").map(word => word.charAt(0).toLowerCase() + word.slice(1)).join(" ");

        set({ name: unCapitalized })
    },
}

),
    { name: "name-store" }
)
)
)

export default useNameStore;


// Visual Flow

// "sachin ramesh tendulkar"
//             ↓ split(" ")
// ["sachin", "ramesh", "tendulkar"]
//             ↓ map()
// ["Sachin", "Ramesh", "Tendulkar"]
//             ↓ join(" ")
// "Sachin Ramesh Tendulkar"
//             ↓ set()
// Store Updated