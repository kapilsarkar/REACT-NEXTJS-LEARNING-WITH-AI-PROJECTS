import useUserStore from "../store/useUserStore.js";

const Profile = () => {
  const user = useUserStore((state) => state.user);
  //const clearUser = useUserStore((state) => state.clearUser);

  if (!user) {
    return <h2>No User Registration</h2>;
  }

  return (
    <>
      <div>
        <h2> User Profile</h2>
        <p>Name : {user.name}</p>
        <p>Email : {user.email}</p>
        <p>DOB :{user.dob}</p>
        <p>Contact : {user.contact}</p>

        <p>Gender : {user.gender}</p>

        <p>Country : {user.country}</p>

        <p>Experience : {user.experience}</p>

        <p>About : {user.about}</p>
      </div>
    </>
  );
};

export default Profile;
