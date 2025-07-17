import { useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaPlus,
  FaBullseye,
  FaTrophy,
  FaUser,
  FaListOl,
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: "Dashboard",
      icon: <FaChartLine className="text-green-700 text-lg" />,
      color: "bg-green-50",
      path: "/dashboard",
    },
    {
      label: "Log Activity",
      icon: <FaPlus className="text-blue-600 text-lg" />,
      color: "bg-blue-50",
      path: "/activity",
    },
    {
      label: "Goals",
      icon: <FaBullseye className="text-purple-600 text-lg" />,
      color: "bg-purple-50",
      path: "/goals",
    },
    {
      label: "Achievements",
      icon: <FaTrophy className="text-yellow-500 text-lg" />,
      color: "bg-yellow-50",
      path: "/achievements",
    },
    {
      label: "Leaderboard",
      icon: <FaListOl className="text-red-500 text-lg" />,
      color: "bg-red-50",
      path: "/leaderboard",
    },
    {
      label: "Profile",
      icon: <FaUser className="text-gray-600 text-lg" />,
      color: "bg-gray-50",
      path: "/profile",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row items-center justify-between mb-10">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            🌱 Track Your Carbon Footprint
          </h1>
          <p className="text-gray-700 text-lg mb-4">
            Join millions in fighting climate change. Monitor, reduce, and
            offset your carbon emissions with our powerful tracker.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Start Tracking
            </button>
           <button onClick={() => navigate("/learn-more")}  className="border border-green-600 text-green-600 px-6 py-2 rounded hover:bg-green-100 transition">Learn More</button>

            
          </div>
        </div>

        <img
          src="https://www.shutterstock.com/image-vector/concept-reduce-co2-emission-using-600nw-2270559509.jpg"
          alt="Environment Illustration"
          className="md:w-[300px] w-full rounded shadow-md"
        />
      </div>

      {/* Featured Articles */}
      <div className="bg-green-50 p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-green-700">
          📰 Featured Articles
        </h2>
        <ul className="space-y-2 list-disc pl-6 text-gray-800 text-sm">
          <li>💨 5 Easy Ways to Reduce Your Daily CO₂ Emissions</li>
          <li>🚴 Why Cycling is More Than Just Exercise</li>
          <li>⚡ Saving Energy at Home: Smart Devices & Habits</li>
        </ul>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {quickActions.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer ${item.color} p-4 rounded-lg flex flex-col items-center justify-center shadow hover:scale-105 transition-transform`}
            >
              <div>{item.icon}</div>
              <p className="text-xs font-semibold mt-2 text-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
