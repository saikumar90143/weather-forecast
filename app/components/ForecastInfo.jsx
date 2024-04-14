"use client";
import React, { useEffect, useMemo, useState } from "react";
import { weatherIcons } from "../utils/WeatherIcons";
import { getDayOfWeek } from "../utils/getDayofWeek";
const ForecastInfo = ({ forecastData }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [hourlyForecastDate, setHourlyForecastDate] = useState(
    forecastData[0]?.date?.split(" ")[0] || ""
  );
  const groupedDataArray = useMemo(() => {
    const groupedDataMap = new Map();

    forecastData.forEach((item) => {
      const date = item.date.split(" ")[0]; // Extracting the date part

      if (!groupedDataMap.has(date)) {
        groupedDataMap.set(date, []);
      }

      groupedDataMap.get(date).push(item);
    });

    return Array.from(groupedDataMap, ([date, events]) => ({
      date,
      events,
    }));
  }, [forecastData]);

  const handleItemClick = (index, day) => {
    setHourlyForecastDate(day.date);
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // format time
  const getTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
  };
  
 

  return (
    <div className="flex flex-col gap-2">
      <h2>5-Day Forecast</h2>
      <ul className="flex  flex-wrap gap-2 justify-evenly items-center  p-2 bg-blue-400 shadow-[0_0_2px_1px_gray]">
        {groupedDataArray.map((day, index) => (
          <li
            key={day.date}
            onClick={() => handleItemClick(index, day)}
            className={`${
              expandedIndex === index ? "w-[250px]" : "w-[100px]"
            } flex justify-between shadow-[0_0_2px_gray] bg-white/30 rounded-sm p-2`}
          >
            <div className="flex flex-col gap-2">
              <p className="font-bold text-md">
              {getDayOfWeek(day.date)},{day.date.split(" ")[0].slice(8, 10)}
              </p>
              <aside className="flex">
                <p className="text-3xl">
                  {" "}
                  {weatherIcons[day.events[0].description]}
                </p>
                <p>{Math.floor(day.events[0].temp)}°C</p>
              </aside>
            </div>
            {/* desc */}

            <div className="self-center">
              {expandedIndex === index && <p className="text-xs font-semibold">{day.events[0].description}</p>}
            </div>
          </li>
        ))}
      </ul>

      {/* hourly forecast */}
      <div className="flex flex-wrap gap-2 justify-evenly items-center h-fit  p-2 bg-blue-300">
        {forecastData
          .filter(
            (forecast) => forecast.date.split(" ")[0] === hourlyForecastDate
          )
          .map((forecast, i) => (
            <div key={i} className="flex w-[90px] h-[150px] flex-col justify-between shadow-[0_0_2px_gray] bg-white/30 rounded-sm p-2">
             
              <div className="flex justify-between flex-col gap-2 items-center">
                <aside>
                  <p className="text-2xl">
                    {" "}
                    {weatherIcons[forecast.description]}{" "}
                  </p>{" "}
                  <p>{Math.floor(forecast.temp)}°C</p>
                  <p className="text-xs font-semibold ">
                    {forecast.description}
                  </p>
                </aside>
                 <div className=" text-sm font-semibold">
                     {getTime(forecast.date)}
                  </div>
                
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ForecastInfo;
