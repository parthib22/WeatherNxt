"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState({
    icon: "",
    temp: "",
    city: "",
    country: "",
  });
  // const [lat, setLat] = useState<number>(22);
  // const [lon, setLon] = useState<number>(88);

  let apiKey = "18567484d2308f0f11d20970910838a3";
  // let data = {};
  async function fetchWeather(lat: any, lon: any) {
    console.log(lat, lon);
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
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
      temp: data.main.temp,
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
    // setLat(position.coords.latitude);
    // setLon(position.coords.longitude);
    // console.log(lat, lon);
    console.log("showloc");
    fetchWeather(position.coords.latitude, position.coords.longitude);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <div className="currentWeather">
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
        <div className="temp">{weatherData.temp}</div>
        <div className="city">{weatherData.city}</div>
        <div className="country">{weatherData.country}</div>
      </div>
      <div className="remoteWeather">
        <div className="search">
          <input type="text" placeholder="search" />
          <button onClick={() => fetchWeather(22, 88)}>search</button>
        </div>
      </div>
    </>
  );
}
