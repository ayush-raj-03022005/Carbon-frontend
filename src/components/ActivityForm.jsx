import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ActivityForm = () => {
  const [type, setType] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type) return toast.error("Select an activity type");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/activities`,
        { type, data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Logged! CO₂: ${res.data.carbonFootprint} kg`);
      setType("");
      setData({});
    } catch (err) {
      toast.error("Error logging activity");
    } finally {
      setLoading(false);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  const renderInputs = () => {
    switch (type) {
      case "transport":
        return (
          <>
            <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
              <label className="block mb-1">Mode</label>
              <select
                className="w-full border p-2 rounded cursor-pointer"
                value={data.mode || ""}
                onChange={(e) => setData({ ...data, mode: e.target.value })}
              >
                <option value="">Select mode</option>
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="bike">Bike</option>
                <option value="train">Train</option>
              </select>
            </motion.div>
            <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
              <label className="block mt-4 mb-1">Distance (km)</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={data.distance || ""}
                onChange={(e) => setData({ ...data, distance: e.target.value })}
              />
            </motion.div>
          </>
        );
      case "electricity":
        return (
          <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
            <label className="block mb-1">Usage (kWh)</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={data.usage || ""}
              onChange={(e) => setData({ ...data, usage: e.target.value })}
            />
          </motion.div>
        );
      case "diet":
        return (
          <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
            <label className="block mb-1">Diet Type</label>
            <select
              className="w-full border p-2 rounded cursor-pointer"
              value={data.dietType || ""}
              onChange={(e) => setData({ ...data, dietType: e.target.value })}
            >
              <option value="">Select diet</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="nonVegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg transition-all"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">🚀 Log Your Activity</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1">Activity Type</label>
          <select
            className="w-full border p-2 rounded cursor-pointer"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setData({});
            }}
          >
            <option value="">Choose activity</option>
            <option value="transport">Transport</option>
            <option value="electricity">Electricity</option>
            <option value="diet">Diet</option>
          </select>
        </div>

        <div className="space-y-4">{renderInputs()}</div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200"
        >
          {loading ? "Logging..." : "Log Activity"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ActivityForm;
