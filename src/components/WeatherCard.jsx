import { motion } from "framer-motion";

const WeatherCard = ({ weather }) => {
  return (
    <motion.div
      className="text-white text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold">{weather.name}</h2>
      <p className="text-lg">{weather.weather[0].main}</p>

      {/* Temperature */}
      <h1 className="text-5xl font-extrabold my-2">{weather.main.temp.toFixed()}°C</h1>

      <div className="grid grid-cols-3 gap-6 text-lg mt-4">
        <div>
          <p className="font-bold">{weather.main.feels_like.toFixed()}°C</p>
          <p>Feels Like</p>
        </div>
        <div>
          <p className="font-bold">{weather.main.humidity}%</p>
          <p>Humidity</p>
        </div>
        <div>
          <p className="font-bold">{weather.wind.speed.toFixed()} m/s</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;