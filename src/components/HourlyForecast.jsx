import React from "react";

const ForecastCard = ({ forecast }) => {
  return (
    <div className="mt-4 p-4 bg-transparent backdrop-blur-md border border-white/30 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-2 text-center">Forecast</h2>
      <div className="grid grid-cols-5 gap-4 text-white text-center">
        {forecast.map((item, index) => (
          <div key={index} className="p-2 rounded-md bg-white/20">
            <p>{new Date(item.dt * 1000).toLocaleTimeString()}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="weather icon"
              className="mx-auto"
            />
            <p>🌡 {Math.round(item.main.temp)}°C</p>
            <p>💨 {item.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
