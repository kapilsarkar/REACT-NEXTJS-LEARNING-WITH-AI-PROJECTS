import { Link } from "react-router-dom";

const NewUserCard = ({ user }) => {
  return (
    <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800">{user.title}</h3>
        <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
          ★ {user.rating}
        </span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2">{user.method}</p>

      <div className="pt-2 text-right">
        <Link
          to={`/${user.id}`}
          className="text-xs font-medium text-blue-600 hover:underline"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default NewUserCard;
