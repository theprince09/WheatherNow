import { useState } from "react";
import axios from "axios";

const API_KEY = "8589b149bec274a281b0696000a0d40a"; 

export const useWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCityCoordinates = async (cityName) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );

      if (!data.length) throw new Error("City not found");
      return data[0];
    } catch {
      throw new Error("Unable to retrieve city coordinates.");
    }
  };

  const fetchWeatherData = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const { lat, lon } = await fetchCityCoordinates(city);

      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        ),
      ]);

      setWeather(weatherRes.data);
      setDailyForecast(forecastRes.data.list.filter((entry) => entry.dt_txt.includes("12:00:00")));
      setHourlyForecast(forecastRes.data.list.slice(0, 12));
    } catch (err) {
      setError(err.message || "Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return { city, setCity, weather, dailyForecast, hourlyForecast, loading, error, fetchWeatherData };
};
