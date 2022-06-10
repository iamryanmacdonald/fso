import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  const [showWeather, setShowWeather] = useState(false);

  const [lat, lon] = country.capitalInfo.latlng;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
        setShowWeather(true);
      });
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      {showWeather && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <div>temperature {weather.main.temp - 273.15} Celsius</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  );
};

export default Country;
