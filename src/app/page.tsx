"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { Player, Controls } from "@lottiefiles/react-lottie-player";

export default function Home() {
  const [locationInput, setLocationInput] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [time, setTime] = useState<any>(null);
  const [advHandleClick, setAdvHandleClick] = useState(true);
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const year = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let openWeatherApiKey = "18567484d2308f0f11d20970910838a3";
  async function fetchWeather(lat: any, lon: any) {
    console.log(lat, lon);
    if (lat === undefined && lon === undefined) {
      alert("Invalid Location");
      return null;
    }
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApiKey}`
    )
      .then((response) => {
        console.log(response.ok);
        if (!response.ok) {
          alert("No weather found.");
          // throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => displayWeather(data));
  }

  function displayWeather(data: any) {
    console.log("yaaaaaaaaaaaa");
    console.log(data);
    setWeatherData({
      icon: data.weather[0].icon,
      iconLink: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
      temp: data.main.temp.toPrecision(2),
      description:
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1),
      city: data.name,
      country: data.sys.country,
      feelsLike: data.main.feels_like.toPrecision(2),
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      tempMin: data.main.temp_min.toPrecision(2),
      tempMax: data.main.temp_max.toPrecision(2),
      visibility: data.visibility,
      windSpeed: data.wind.speed,
      bgQuery: data.weather[0].description.trim().replace(/ /g, "-"),
      // sunrise: {
      //   hour: new Date(data.sys.sunrise).getHours(),
      //   min: new Date(data.sys.sunrise).getMinutes(),
      // },
      // sunset: {
      //   hour: new Date(data.sys.sunset).getHours(),
      //   min: new Date(data.sys.sunset).getMinutes(),
      // },
    });
  }

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, console.error);
      console.log("geolocation aquired");
    } else {
      console.log("geolocation not available");
    }
    console.log("getloc");
  };
  const showPosition = (position: any) => {
    console.log("showloc");
    fetchWeather(position.coords.latitude, position.coords.longitude);
  };
  useEffect(() => {
    getLocation(); // setinterval for refreshing after 30min
    const createInterval = setInterval(() => {
      setTime({
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
        sec: new Date().getSeconds(),
        day: week[new Date().getDay()].substring(0, 3),
        date: new Date().getDate(),
        month: year[new Date().getMonth()].substring(0, 3),
        year: new Date().getFullYear(),
      });
    });

    return () => clearInterval(createInterval);
  }, []);
  let openCageApiKey = "718be3bac33143749a5114aaa1d675cb";
  async function getLatLng() {
    if (locationInput.trim() === "") {
      alert("Enter a location fisrt.");
      return null;
    }
    const data = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${locationInput}&key=${openCageApiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("Location not found");
          // throw new Error("Location not found.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        data.results[0]
          ? fetchWeather(
              data.results[0]?.geometry.lat,
              data.results[0]?.geometry.lng
            )
          : alert("Location not valid");
      });
    console.log(data);
  }

  return (
    <>
      <div
        className="currentWeather"
        style={
          weatherData && {
            backgroundImage: `url(https://source.unsplash.com/800x600?${weatherData.bgQuery})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }
        }
      >
        <div className="currentWeatherChild">
          {weatherData && (
            <>
              <div
                className="icon"
                style={
                  weatherData.icon === "50d" ||
                  weatherData.icon === "50n" ||
                  weatherData.icon === "13d" ||
                  weatherData.icon === "13n" ||
                  weatherData.icon === "01n"
                    ? { filter: "invert(1)" }
                    : { filter: "invert(0)" }
                }
              >
                {weatherData.icon && (
                  <Image
                    src={weatherData.iconLink}
                    alt="ico"
                    height={200}
                    width={200}
                    priority
                  />
                )}
              </div>
              {/* <div className="lottie">
                <Player
                  src={`/assets/${weatherData.icon}.json`}
                  style={{ height: 200 }}
                  autoplay
                  loop
                />
              </div> */}
              {/* <div>{weatherData.icon}</div> */}
              <div className="temp">
                {weatherData.temp}
                <span>°C</span>
              </div>
              <div className="location">
                {weatherData.city}, {weatherData.country}
              </div>
              <div className="feelsLike">
                Feels like {weatherData.feelsLike}°C
              </div>
              <div className="desc">
                {/* {"("} */}
                {weatherData.description}
                {/* {")"} */}
              </div>
              <button
                className="advBtn"
                onClick={() => setAdvHandleClick(!advHandleClick)}
                style={
                  advHandleClick
                    ? { flexDirection: "column" }
                    : { flexDirection: "column-reverse" }
                }
              >
                advanced
                <KeyboardArrowDownIcon
                  style={
                    advHandleClick ? { rotate: "0deg" } : { rotate: "180deg" }
                  }
                />
              </button>
              <div
                className="advanced"
                style={
                  advHandleClick ? { display: " none" } : { display: "flex" }
                }
              >
                <div className="adv tempMin">
                  <span>minimum</span>
                  <div>{weatherData.tempMin}°C</div>
                </div>
                <div className="adv tempMax">
                  <span>maximum</span>
                  <div>{weatherData.tempMax}°C</div>
                </div>
                <div className="adv pressure">
                  <span>pressure</span>
                  <div>{weatherData.pressure}mb</div>
                </div>
                <div className="adv humidity">
                  <span>humidity</span>
                  <div>{weatherData.humidity}%</div>
                </div>
                <div className="adv visibility">
                  <span>visibility</span>
                  <div>
                    {weatherData.visibility < 1000
                      ? weatherData.visibility + "m"
                      : weatherData.visibility / 1000 + "km"}
                  </div>
                </div>
                <div className="adv windSpeed">
                  <span>wind</span>
                  <div>{weatherData.windSpeed}m/s</div>
                </div>
                {/* <div className="sunrise">
                  {weatherData.sunrise.hour}:{weatherData.sunrise.min}
                </div>
                <div className="sunset">
                  {weatherData.sunset.hour}:{weatherData.sunset.min}
                </div> */}
                {/* <div>{weatherData.bgQuery}</div> */}
              </div>
            </>
          )}
          {time && (
            <div className="time">
              <div className="line1">
                {time.hour < 10 && 0}
                {time.hour}:{time.min < 10 && 0}
                {time.min}:{time.sec < 10 && 0}
                {time.sec}
              </div>
              <div className="line2">
                {time.day}, {time.month} {time.date}, {time.year}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="remoteWeather">
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && getLatLng();
            }}
          />
          <button onClick={() => getLatLng()}>
            <SearchIcon />
          </button>
        </div>
      </div>
    </>
  );
}
