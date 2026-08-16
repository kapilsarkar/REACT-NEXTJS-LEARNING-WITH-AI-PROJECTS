import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/features/user/userThunks.js";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p className="p-4 text-slate-400">Loading...</p>;
  if (error) return <p className="p-4 text-rose-500">Error: {error}</p>;

  return (
    <div className="max-w-md mx-auto my-6 p-4">
      <h2 className="text-xl font-bold text-slate-100 mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-lg"
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;