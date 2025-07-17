// pages/Goals.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useGoal } from "../components/GoalContext";
import { motion } from "framer-motion";

const Goals = () => {
  const [goalInput, setGoalInput] = useState("");
  const { goal, setGoal, fetchGoal } = useGoal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goalInput) return toast.error("Please enter a goal");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/goals`,
        { weeklyGoal: parseFloat(goalInput) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      fetchGoal();
      setGoalInput("");
    } catch (err) {
      toast.error("Error setting goal");
    }
  };

  useEffect(() => {
    fetchGoal();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
          🎯 Set Weekly CO₂ Goal
        </h2>

        {goal !== null && (
          <p className="text-center text-gray-600 mb-6">
            Your current goal: <span className="font-semibold text-green-800">{goal} kg CO₂</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            placeholder="Enter goal in kg CO₂"
            className="w-full border-2 border-green-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            {goal !== null ? "Update Goal" : "Set Goal"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Goals;
