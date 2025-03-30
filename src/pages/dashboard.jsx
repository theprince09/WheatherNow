import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import WeatherCard from "../components/WeatherCard";
import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";
import { useWeather } from "../hooks/useWeather";
import { useAnimatedPlaceholder } from "../hooks/useAnimatedPlaceholder";
import { useSearchHistory } from "../hooks/useSearchHistory";

const Dashboard = () => {
  const { city, setCity, weather, dailyForecast, hourlyForecast, loading, error, fetchWeatherData } = useWeather();
  const { history, addToHistory } = useSearchHistory();
  const placeholder = useAnimatedPlaceholder();
  const [viewMode, setViewMode] = useState("daily");

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherData();
      addToHistory(city);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col w-screen"
      style={{
        backgroundImage: "url('/Images/bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <div className="flex justify-center items-center min-h-screen p-4 relative">
        <div className="flex flex-col items-center w-2/3">
          <motion.h1
            className="text-3xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Weather Dashboard
          </motion.h1>

          <div className="flex gap-2 mb-4 w-full max-w-md">
            <input
              type="text"
              placeholder={placeholder}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
            >
              Search
            </button>
            {weather && (
              <button
                onClick={fetchWeatherData}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
              >
                Refresh
              </button>
            )}
          </div>

          {loading && (
            <motion.div
              className="text-white text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >
              🔄 Fetching Weather...
            </motion.div>
          )}

          {error && <p className="text-red-500">{error}</p>}

          {weather && <WeatherCard weather={weather} />}

          {dailyForecast.length > 0 && hourlyForecast.length > 0 && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setViewMode("daily")}
                className={`px-4 py-2 rounded-md transition-all ${
                  viewMode === "daily" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                }`}
              >
                Next 5 Days
              </button>
              <button
                onClick={() => setViewMode("hourly")}
                className={`px-4 py-2 rounded-md transition-all ${
                  viewMode === "hourly" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                }`}
              >
                Hourly
              </button>
            </div>
          )}

          {viewMode === "hourly" && hourlyForecast.length > 0 && <HourlyForecast forecast={hourlyForecast.slice(0, 5)} />}
          {viewMode === "daily" && dailyForecast.length > 0 && <DailyForecast forecast={dailyForecast} />}
        </div>

        <motion.div
          className="absolute right-10 top-1/3 transform -translate-y-1/2 w-1/4 
          p-3 rounded-lg shadow-lg text-white 
          bg-transparent backdrop-blur-md border border-white/30"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-2 text-center">Recent Searches</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/40">
                <th className="p-1 text-left">City</th>
                <th className="p-1 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td className="p-1 text-gray-300 text-center" colSpan="2">
                    No recent searches
                  </td>
                </tr>
              ) : (
                history.map((entry, index) => (
                  <tr key={index} className="border-b border-white/30">
                    <td className="p-1">{entry.city}</td>
                    <td className="p-1">{entry.timestamp}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
