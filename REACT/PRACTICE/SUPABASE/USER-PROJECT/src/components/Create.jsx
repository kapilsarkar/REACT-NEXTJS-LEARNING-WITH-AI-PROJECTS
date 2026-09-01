import { useState } from "react";
import { supabase } from "../supabse-client.js";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all fields correctly.");
      return;
    }

    const {
      data: { user },
      error: useError,
    } = await supabase.auth.getUser();

    if (useError || !user) {
      setFormError("You Must be logged in to create data");
      return;
    }

    const { error } = await supabase
      .from("newuser")
      .insert([{ title, method, rating:Number(rating), user_id: user.id }]);

    if (error) {
      console.log(error);
      setFormError("Could not save to database.");
    } else {
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Create Data</h2>
        <p className="text-sm text-gray-500">Add a new data to your list.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            placeholder="e.g. Banana Boost"
          />
        </div>

        <div>
          <label
            htmlFor="method"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Method:
          </label>
          <textarea
            id="method"
            rows="3"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            placeholder="e.g. Blend banana, milk, and oats..."
          />
        </div>

        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Rating:
          </label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            placeholder="e.g. 5"
          />
        </div>

        {formError && (
          <p className="text-sm text-red-500 bg-red-50 p-2 rounded border border-red-200">
            {formError}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-md transition"
        >
          Create Data
        </button>
      </form>
    </div>
  );
};

export default Create;
