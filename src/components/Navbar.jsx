import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 text-white px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
      <h1 className="text-2xl font-bold mb-2 sm:mb-0">🌿 Carbon Tracker</h1>

      <div className="space-x-2 flex flex-wrap items-center justify-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-semibold underline" : "hover:underline"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "font-semibold underline" : "hover:underline"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/activity"
          className={({ isActive }) =>
            isActive ? "font-semibold underline" : "hover:underline"
          }
        >
          Log Activity
        </NavLink>

        <NavLink
          to="/goals"
          className={({ isActive }) =>
            isActive ? "font-semibold underline" : "hover:underline"
          }
        >
          Goals
        </NavLink>

        <NavLink
          to="/achievements"
          className={({ isActive }) =>
            isActive ? "font-semibold underline" : "hover:underline"
          }
        >
          Achievements
        </NavLink>

        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            isActive ? "font-semibold underline" : "hover:underline"
          }
        >
          Leaderboard
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "font-semibold underline" : "hover:underline"
          }
        >
          Profile
        </NavLink>

        {user ? (
          <button
            onClick={handleLogout}
            className="ml-2 bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
