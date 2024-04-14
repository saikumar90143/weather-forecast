import React from "react";
import { TbLocationFilled } from "react-icons/tb";
import { weatherIcons } from "../utils/WeatherIcons";

const WeatherInfo = ({ weatherData,city }) => {
  var currentDate = new Date();

  var currentTime = currentDate.getTime(); // This will give you the time in milliseconds since January 1, 1970

  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();

  var formattedTime =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    (hours < 12 ? "AM" : "PM");
  return (
    <div className="bg-sky-400 sm:w-[300px] w-[100vw] rounded-md p-3 flex flex-col ">
      <div className="flex justify-evenly">
        <div>

        <h2>Current Weather</h2>
        <p>{formattedTime}</p>
        </div>
        <div>
          <h3>Loaction</h3>
          <p>{city?city:'hyderabad'}</p>
        </div>

      </div>
      <div className="flex items-center gap-2">
       <p className="text-6xl"> {weatherIcons[weatherData.description]}</p>
        <div>
          <p className="font-bold text-lg">{Math.floor(weatherData.temp)}°C</p>
          <p>{weatherData?.description}</p>
        </div>
      </div>
      <aside className="flex gap-4">
        <div className="flex flex-col">
          <p>Humidity </p>
          <p>{weatherData.humidity}%</p>
        </div>
        <div className="flex flex-col">
          <p>Wind Speed</p>
          <p className="flex"> {weatherData.windSpeed} <TbLocationFilled className="rotate-[135deg] text-white/95"/> </p>
        </div>
        <div>

      </div>
      <div className="flex flex-col">
          <p>Pressure</p>
          <p> {weatherData.pressure} hPa</p>
        </div>
      </aside>
    </div>
  );
};

export default WeatherInfo;
