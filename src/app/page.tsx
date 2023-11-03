"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [locationInput, setLocationInput] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [time, setTime] = useState<any>(null);
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
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApiKey}`
    )
      .then((response) => {
        console.log(response.ok);
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => displayWeather(data));
  }

  function displayWeather(data: any) {
    console.log("yaaaaaaaaaaaa");
    console.log(data);

    setWeatherData({
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      temp: data.main.temp.toPrecision(2),
      city: data.name,
      country: data.sys.country,
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
  }, []);

  useEffect(() => {
    const createInterval = setInterval(() => {
      setTime({
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
        sec: new Date().getSeconds(),
        day: week[new Date().getDay()],
        date: new Date().getDate(),
        month: year[new Date().getMonth()],
        year: new Date().getFullYear(),
      });
    });

    return () => clearInterval(createInterval);
  }, []);
  let openCageApiKey = "718be3bac33143749a5114aaa1d675cb";
  async function getLatLng() {
    const data = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${locationInput}&key=${openCageApiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("Location not found");
          throw new Error("Location not found.");
        }
        return response.json();
      })
      .then((data) =>
        fetchWeather(data.results[0].geometry.lat, data.results[0].geometry.lng)
      );
    console.log(data);
  }

  return (
    <>
      <div className="currentWeather">
        {weatherData && (
          <>
            <div className="icon">
              {weatherData.icon && (
                <Image
                  src={weatherData.icon}
                  alt="ico"
                  height={40}
                  width={40}
                  priority
                />
              )}
            </div>
            <div className="temp">{weatherData.temp} °C</div>
            <div className="location">
              {weatherData.city}, {weatherData.country}
            </div>
          </>
        )}
        {time && (
          <>
            <span>
              {time.hour < 10 && 0}
              {time.hour}:{time.min < 10 && 0}
              {time.min}:{time.sec < 10 && 0}
              {time.sec}
            </span>
            <span>
              {time.day}, {time.date} {time.month}, {time.year}
            </span>
          </>
        )}
      </div>
      <div className="remoteWeather">
        <div className="search">
          <input
            type="text"
            placeholder="search"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
          <button onClick={() => getLatLng()}>search</button>
        </div>
      </div>
    </>
  );
}
