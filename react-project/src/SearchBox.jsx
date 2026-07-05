import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css'
import { useState } from 'react';

export default function SearchBox({ updateInfo}) {
    let [city, setCity] = useState('');
     let [error, setError] = useState(false);
   
    const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
    const API_KEY = 'f71b1b99411263b03af2d324ce6cd1e8';

    let getWeatherInfo = async () => {
        try {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
       let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description
       }
       return result;
    } catch(err){
        setError(true);
    }
        
    };

   

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    let handleSubmit = async(e) => {
        try{
       e.preventDefault();
        setCity('');
      let info = await getWeatherInfo();
      updateInfo(info);
        }
      catch(err){
        setError("No such place in our API");
      }
    };

    return (
        <div className="SearchBox">
            <h3>Search for the Weather</h3>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined"  required 
                value= {city} onChange={handleChange}/>
                 <br>
                 </br><br></br>
                 <Button variant="contained" type="submit">Search</Button>
                {/* {error && <p style={{color: 'red'}}>"No such place in our API"</p>} */}
            </form>
        </div>
    );
}
