import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [userRes, activityRes] = await Promise.all([
          axios.get(`${API_URL}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`${API_URL}/api/activities`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setUserData(userRes.data);
        setActivities(activityRes.data.activities || []);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    };

    fetchData();
  }, []);

  const totalEmissions = activities.reduce(
    (sum, activity) => sum + activity.emissions,
    0
  ).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-green-700 mb-6">🌿 Dashboard</h1>

      {userData && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">
            Welcome, {userData.name}
          </h2>
          <p className="text-gray-700">Email: {userData.email}</p>
          <p className="text-gray-700">Goal: {userData.goal} kg CO₂/month</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          Your Carbon Footprint
        </h3>
        <p className="text-gray-800 text-lg mb-2">
          Total Emissions Tracked:{" "}
          <span className="font-bold">{totalEmissions} kg CO₂</span>
        </p>

        {activities.length === 0 ? (
          <p className="text-gray-500">
            No activities logged yet. Start adding to track your emissions!
          </p>
        ) : (
          <ul className="divide-y divide-green-100">
            {activities.map((activity, index) => (
              <li key={index} className="py-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700 capitalize">
                    {activity.type} - {activity.amount} {activity.unit}
                  </span>
                  <span className="text-green-700 font-semibold">
                    {activity.emissions} kg CO₂
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
