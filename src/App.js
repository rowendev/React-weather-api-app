import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
  // state
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  // const ref = useRef(data.name);
  // console.log(ref.current);
  // weather API infos
  const key = "996cffa6a4517055392b4e7d42154b0f";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`;

  // search function
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      {data.name && (
        <div className={`container`} key={data.id}>
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                <p>體感</p>
                {data.main ? (
                  <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                ) : null}
              </div>
              <div className="humidity">
                <p>濕度</p>
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
              </div>
              <div className="wind">
                <p>風速</p>
                {data.wind ? (
                  <p className="bold">{data.wind.speed} MPH</p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
