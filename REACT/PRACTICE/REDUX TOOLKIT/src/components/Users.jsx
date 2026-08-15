import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/features/user/userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user.users);
  console.log(users);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <>
      <div>Users</div>
    </>
  );
};

export default Users;
