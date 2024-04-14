"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import WeatherInfo from "./WeatherInfo";
import ForecastInfo from "./ForecastInfo";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [loaction,setLoaction]=useState('')
  const [loading,setLoading]=useState(false)
  const [weatherData, setWeatherData] = useState(null);
  console.log('weatherData: ', weatherData);
  const [forecastData, setForecastData] = useState([]);
  console.log("forecastData: ", forecastData);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          city ? city : "hyderabad"
        }&appid=d9aa6feb24bffc9b4ff92ad668726237&units=metric`
      );
      const currentWeather = {
        temp: weatherResponse.data.main.temp,
        description: weatherResponse.data.weather[0].description,
        humidity: weatherResponse.data.main.humidity,
        windSpeed: weatherResponse.data.wind.speed,
        pressure: weatherResponse.data.main.pressure,
      };
      setWeatherData(currentWeather);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city?city:'hyderabad'}&appid=d9aa6feb24bffc9b4ff92ad668726237&units=metric`
      );
      const forecastData = forecastResponse.data.list.map((item) => ({
        date: item.dt_txt,
        temp: item.main.temp,
        description: item.weather[0].description,
      }));
      setForecastData(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
    setLoaction(city)
    setCity("");
  };

  return (
<div className="container mx-auto flex flex-col justify-center items-center px-4">
      <h1 className="text-center font-bold text-xl md:text-3xl lg:text-4xl mt-8 mb-4">Weather Forecast App</h1>
      <form onSubmit={handleSubmit} className="text-center mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          autoComplete="off"
          placeholder="Enter city name"
          className="border border-blue-500 rounded-xl px-2 py-1 min-w-56 max-md:w-auto mb-2 me-2 md:mb-0 md:mr-2"
        />
        <button type="submit" className="bg-orange-400 px-4 py-1 rounded-xl md:rounded-sm">Search</button>
      </form>
      {loading ? <h2 className="text-center">Loading</h2> : (weatherData && <WeatherInfo weatherData={weatherData} city={loaction} />)}
      {forecastData.length > 0 && <ForecastInfo forecastData={forecastData} />}
    </div>

  );
};

export default WeatherApp;
