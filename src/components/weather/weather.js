import React, { useEffect, useRef, useState } from 'react';
import searchIcon from '../../assets/search-icon-anggara.svg';
import clearD from '../../assets/01d@2x.png';
import clearN from '../../assets/01n@2x.png';
import fCloudsD from '../../assets/02d@2x.png';
import fCloudsN from '../../assets/02n@2x.png';
import sClouds from '../../assets/03@2x.png';
import bClouds from '../../assets/04@2x.png';
import sRain from '../../assets/09@2x.png';
import rainD from '../../assets/10d@2x.png';
import rainN from '../../assets/10n@2x.png';
import storm from '../../assets/11@2x.png';
import snow from '../../assets/13@2x.png';
import mist from '../../assets/50@2x.png';

const Weather = ({ unit, switchUnit }) => {
    
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
        
    const allIcons = {
                '01d': clearD,
                '01n': clearN,
                '02d': fCloudsD,
                '02n': fCloudsN,
                '03d': sClouds,
                '03n': sClouds,
                '04d': bClouds,
                '04n': bClouds,
                '09d': sRain,
                '09n': sRain,
                '10d': rainD,
                '10n': rainN,
                '11d': storm,
                '11n': storm,
                '13d': snow,
                '13n': snow,
                '50d': mist,
                '50n': mist,
            };
        
    const search = async (city, unit) => {
        
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            const icon = allIcons[data.weather[0].icon] || clearD;
            const pressure = Math.floor(data.main.pressure/10);
     
            setWeatherData({
                location: data.name,
                icon: icon,
                temperature: data.main.temp,
                tempMax: data.main.temp_max,
                tempMin: data.main.temp_min,
                pressure: pressure,
                windSpeed: data.wind.speed
            });

        } catch (error) {
            setWeatherData(false);
            console.error('Error in fetching data.')
        }
    };

    useEffect(() => {
        search();
    });
    
    return (
        <div className='outer-cont'>
            {weatherData?
            <>
                <div className='search'>
                    <input type='text' className='textSearch' placeholder='Search' ref={inputRef} />
                    <input type='submit' className='iconSearch' value='' onClick={() => search(inputRef.current.value)}/>
                    <img src={searchIcon} className='searchPic' alt='search icon by Anggara from FreePik' onClick={() => search(inputRef.current.value)} />
                </div>
                <div className='weather'>
                    <h2>{unit === 'C' ?  Math.floor((weatherData.temperature - 273.15) * 1.8 + 32) : Math.floor(weatherData.temperature - 273.15)}<span className='unit'>{unit === 'C' ? '°F' : '°C'}</span></h2>
                    <img src={weatherData.icon} className='weatherIcon' alt='weather indicator' />
                    <h3>{weatherData.location}</h3>
                    <p className='temp'>{unit === 'C' ?  Math.floor((weatherData.tempMax - 273.15) * 1.8 + 32) : Math.floor(weatherData.tempMax - 273.15)}<span className='unit'>{unit === 'C' ? '°F' : '°C'}</span> / {unit === 'C' ?  Math.floor((weatherData.tempMin - 273.15) * 1.8 + 32) : Math.floor(weatherData.tempMin - 273.15)}<span class='unit'>{unit === 'C' ? '°F' : '°C'}</span></p>
                    <div className='moreWeather'>
                        <div className='pressure'>
                            <p className='moreValue'>Pressure</p>
                            <p>{weatherData.pressure}Pa</p>
                        </div>
                        <div className='wind'>
                            <p className='moreValue'>Wind</p>
                            <p>{unit === 'C' ? Math.floor(weatherData.windSpeed * 2.236936) : Math.floor(weatherData.windSpeed * 3.6)}{unit === 'C' ? 'mph' : 'kph'}</p>
                        </div>
                    </div>
                </div>
            </>
            :
            <>
                <div className='search'>
                    <input type='text' className='textSearch' placeholder='Search' ref={inputRef} />
                    <input type='submit' className='iconSearch' value='' onClick={() => search(inputRef.current.value)}/>
                    <img src={searchIcon} className='searchPic' alt='search icon by Anggara from FreePik' onClick={() =>  search(inputRef.current.value)} />
                </div>
            </>
            }
        </div>
    );
    
};

export default Weather;
