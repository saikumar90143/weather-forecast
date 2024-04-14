import { TiWeatherCloudy, TiWeatherDownpour, TiWeatherPartlySunny, TiWeatherSunny } from "react-icons/ti";
import { FaCloudSun } from "react-icons/fa6";
import { PiCloudSunFill } from "react-icons/pi";
import { BsCloudSlashFill, BsClouds } from "react-icons/bs";

export   const weatherIcons = {
    "few clouds": <TiWeatherCloudy className="" />,
    "light rain": <TiWeatherDownpour className="" />,
    "haze": <TiWeatherPartlySunny className="" />,
    "smoke": <BsCloudSlashFill className="" />,
    "clear sky": <TiWeatherSunny className=" text-orange-400/90" />,
    "overcast clouds": <BsClouds className=" " />,
    "scattered clouds": <FaCloudSun className=" " />,
    "broken clouds": <PiCloudSunFill className=" " />,
  };