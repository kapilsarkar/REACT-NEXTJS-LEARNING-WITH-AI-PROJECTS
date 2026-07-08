import { useAppStore } from "../store/AppStore.js";

const NavBar = () => {
  const user = useAppStore((state) => state.user);
  const theme = useAppStore((state) => state.theme);
  const logout = useAppStore((state) => state.logout);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  return (
    <>
      <div>
        <h2>NavBar</h2>
        <span>Theme: {theme}</span>
        <button onClick={toggleTheme}>Toggle Theme</button>
        {user ? (
          <>
            <span>Hi ,{user.name} </span>
            <button onClick={logout}>LogOut</button>
          </>
        ) : (
          <span> Guest </span>
        )}
      </div>
    </>
  );
};

export default NavBar;
