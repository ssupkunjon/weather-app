import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { Apikey } from './components/APIKEY/Apikey';

function App() {
  const [location, setLocation] = useState('');
  const [weatherdata, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    if (!location) {
      setError('Please enter a location.');
      return; // Stop the function if location is empty
    }

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${Apikey}`)
      .then(response => {
        setWeatherData(response.data);
        console.log(response.data);
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleChange=(e)=>{
    setLocation(e.target.value);
  }

  const handleClick =(e)=>{
    e.preventDefault();
    fetchData();
    setLocation('')
  }

  return (
    <div className='home-bg'>
      <input className='search' type="text" placeholder='Enter Location' value={location} onChange={handleChange}/>
      <button className='search-btn' onClick={handleClick}>Search</button>


      <div className='container'>
        {weatherdata.name && (
          <div>
            <h2 className='location'>Weather in {weatherdata.name}</h2>
            <img className='icon' src={`http://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`}alt="" />
            <p className='temp'>Temperature : {(weatherdata.main.temp - 273.15).toFixed(2)}°C</p>
            <p className='feels'> Feels Like : {weatherdata.main.feels_like}</p>
            <p className='humidity'>Humidity : {weatherdata.main.humidity}</p>
            <p className='discrip'>Weather : {weatherdata.weather[0].description}</p>
            <p className='sea'>Sea Level  :{weatherdata.main.sea_level}</p>
            <p className='pressure'>Pressure : {weatherdata.main.pressure}</p>
 
          </div>
        )}
      </div>
    </div>
  );
}

export default App;