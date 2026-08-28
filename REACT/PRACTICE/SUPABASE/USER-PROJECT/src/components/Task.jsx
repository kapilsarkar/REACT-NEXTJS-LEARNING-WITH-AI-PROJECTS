import { useState } from "react";

const Task = () => {
    const [newTask,setNewTask] = useState({title:"",description:""});
  return (
    <>
      <div class="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md font-sans">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          TASK MANAGER CRUD :
        </h2>

        <form class="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter a task..."
            onChange={(e)=>setNewTask((prev)=>({...prev,title:e.target.value}))}
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
          >
            Add
          </button>
        </form>

        <ul class="space-y-3">
          <li class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <span class="flex-1 text-gray-800 cursor-pointer select-none">
              Design landing page UI
            </span>
            <div class="flex items-center gap-2">
              <button class="px-3 py-1 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded transition">
                Edit
              </button>
              <button class="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition">
                Delete
              </button>
            </div>
          </li>

          <li class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <span class="flex-1 text-gray-400 line-through cursor-pointer select-none">
              Set up Tailwind CSS
            </span>
            <div class="flex items-center gap-2">
              <button class="px-3 py-1 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded transition">
                Edit
              </button>
              <button class="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition">
                Delete
              </button>
            </div>
          </li>

          <li class="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <input
              type="text"
              value="Write API documentation"
              class="flex-1 px-3 py-1 text-sm bg-white border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button class="px-3 py-1 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded transition">
              Save
            </button>
            <button class="px-3 py-1 text-sm bg-gray-400 hover:bg-gray-500 text-white rounded transition">
              Cancel
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Task;
