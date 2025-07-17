import { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/activities/leaderboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Error loading leaderboard", err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-extrabold text-green-700 text-center mb-6">
        📈 Weekly Leaderboard
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Rank</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Total CO₂ (kg)</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr
                key={u._id}
                className={`transition-all duration-150 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-green-50`}
              >
                <td className="py-3 px-4 font-semibold">
                  <span
                    className={`inline-block w-8 h-8 text-center leading-8 rounded-full text-white ${
                      idx === 0
                        ? "bg-yellow-400"
                        : idx === 1
                        ? "bg-gray-300"
                        : idx === 2
                        ? "bg-orange-400"
                        : "bg-green-400"
                    }`}
                  >
                    {idx + 1}
                  </span>
                </td>
                <td className="py-3 px-4">{u.name}</td>
                <td className="py-3 px-4 font-medium text-green-700">
                  {u.totalCO2.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
