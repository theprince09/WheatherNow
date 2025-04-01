import axios from "axios";

const API_KEY = "Your_API_Key"; 

export const fetchCityCoordinates = async (cityName) => {
  try {
    const geoResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    );

    if (geoResponse.data.length === 0) throw new Error("City not found");

    const { lat, lon } = geoResponse.data[0];
    return { lat, lon };
  } catch (err) {
    throw new Error("Failed to fetch city coordinates");
  }
};

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch weather data");
  }
};

export const fetchHourlyForecast = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${API_KEY}`
    );
    return response.data.hourly.slice(0, 5);
  } catch (err) {
    throw new Error("Failed to fetch hourly weather");
  }
};
