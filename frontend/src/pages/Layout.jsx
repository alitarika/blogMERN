import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Layout = () => {
  // Consume/use context to get user state
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Do you want to Log out?")) {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      setUser({ username: null, posts: [] });
      navigate("/");
    }
  };

  return (
    <>
      <header className="bg-pr-500">
        <nav className="flex items-center justify-between px-4 py-2">
          <Link
            title="Home"
            to="/"
            className="fa-solid fa-house-chimney nav-link"
          ></Link>
          {user.username ? (
            <div className="flex items-center gap-2">
              <Link
                title="Create Post"
                to="/create"
                className="fa-solid fa-circle-plus nav-link"
              ></Link>
              <Link
                title="Dashboard"
                to="/dashboard"
                className="fa-solid fa-book-open nav-link"
              ></Link>
              <button
                title="Log Out"
                onClick={handleLogout}
                className="fa-solid fa-right-from-bracket nav-link"
              ></button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                title="Login"
                to="/login"
                className="fa-solid fa-right-to-bracket nav-link"
              ></Link>
              <Link
                title="Register"
                to="/register"
                className="fa-solid fa-user-plus nav-link"
              ></Link>
            </div>
          )}
        </nav>
      </header>

      <main className="px-4 py-8">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
