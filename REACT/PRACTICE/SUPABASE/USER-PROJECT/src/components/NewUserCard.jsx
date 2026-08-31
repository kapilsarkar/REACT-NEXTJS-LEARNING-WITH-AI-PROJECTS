import { Link } from "react-router-dom";
import { supabase } from "../supabse-client";

const NewUserCard = ({ user, onDelete }) => {
  const handleDelete = async () => {
    const { error } = await supabase
      .from("newuser")
      .delete()
      .eq("id", user.id);

    if (error) {
      console.log(error);
    } else {
      // Call onDelete if there was no error
      if (onDelete) {
        onDelete(user.id);
      }
    }
  };

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
      {/* Title & Rating */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800">{user.title}</h3>
        <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
          ★ {user.rating}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2">{user.method}</p>

      {/* Action Buttons */}
      <div className="pt-2 flex justify-end items-center gap-3 text-xs font-medium">
        <Link
          to={`/${user.id}`}
          className="text-blue-600 hover:underline"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NewUserCard;