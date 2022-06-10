import axios from "axios";
import { useEffect, useState } from "react";

const Countries = ({ countries, setCountries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.cca2}>
            {country.name.common}{" "}
            <button onClick={() => setCountries([country])}>show</button>
          </div>
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    const country = countries[0];

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
      </div>
    );
  }
};

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (filter.length > 0) {
      axios
        .get(`https://restcountries.com/v3.1/name/${filter}`)
        .then((response) => {
          setCountries(response.data);
        });
    }
  }, [filter]);

  return (
    <div>
      find countries <input onChange={(e) => setFilter(e.target.value)} />
      <Countries countries={countries} setCountries={setCountries} />
    </div>
  );
};

export default App;
