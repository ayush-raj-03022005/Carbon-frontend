import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, ResponsiveContainer
} from 'recharts';
import { useGoal } from "./GoalContext";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [tips, setTips] = useState([]);
  const { goal } = useGoal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [activitiesRes, summaryRes, tipsRes] = await Promise.all([
          axios.get(`${API_URL}/api/activities/my`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/api/activities/weekly-summary`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/api/tips`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setActivities(activitiesRes.data);
        setWeeklySummary({
          ...summaryRes.data,
          goal: goal ?? summaryRes.data.goal,
        });
        setTips(tipsRes.data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    fetchData();
  }, [goal]);

  const emissionsByType = activities.reduce((acc, act) => {
    acc[act.type] = (acc[act.type] || 0) + act.carbonFootprint;
    return acc;
  }, {});

  const chartDataByType = Object.keys(emissionsByType).map(type => ({
    type,
    carbon: parseFloat(emissionsByType[type].toFixed(2))
  }));

  const chartDataByDate = activities.map(act => ({
    date: new Date(act.createdAt).toLocaleDateString(),
    carbon: parseFloat(act.carbonFootprint.toFixed(2))
  })).reverse();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-green-600 text-white p-6 rounded-lg mb-6 shadow">
        <h2 className="text-2xl font-bold">Welcome back, Ayush!</h2>
        <p>Track, Reduce, Achieve — One Sustainable Step at a Time!</p>
      </div>

      {weeklySummary && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-2">Weekly Goal Summary</h3>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <p><strong className="text-green-600">{weeklySummary.total} kg</strong> Current CO₂ Emissions</p>
            <p><strong className="text-blue-600">{weeklySummary.goal} kg</strong> Weekly Goal</p>
            <p className="text-green-600">{weeklySummary.status === "under" ? "✅ Under Goal" : "❌ Over Goal"}</p>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{ width: `${Math.min((weeklySummary.total / weeklySummary.goal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-2">CO₂ Emissions by Activity</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartDataByType}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="carbon" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-2">CO₂ Trend Over Time</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartDataByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="carbon" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-3">Recent Activities</h4>
          {activities.slice(0, 3).map((act, index) => (
            <div key={index} className="mb-3 text-sm border-b pb-2">
              <p className="font-medium">{act.type.charAt(0).toUpperCase() + act.type.slice(1)}</p>
              <p className="text-gray-500">{act.carbonFootprint.toFixed(2)} kg CO₂ - {new Date(act.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-3">Eco-Friendly Tips</h4>
          {tips.map((tip, index) => (
            <div key={index} className="p-3 mb-2 rounded border-l-4 bg-green-50 border-green-400 text-sm">
              🌿 {tip.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
