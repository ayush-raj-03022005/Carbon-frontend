import { useEffect, useState } from "react";
import axios from "axios";

function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/achievements`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAchievements(res.data.achievements || []);
      } catch (err) {
        console.error("Failed to load achievements", err);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-green-700">🏅 Achievements</h2>

      {achievements.length === 0 ? (
        <p className="text-gray-500">No achievements unlocked yet. Keep tracking and reaching your goals!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((badge, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 border border-green-100 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-green-800 mb-2">{badge.title}</h3>
              <p className="text-gray-700">{badge.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Achievements;
