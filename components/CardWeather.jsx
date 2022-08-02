import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from './Loading'
import './CardWeather.css'

const CardWeather = ({ lat, lon }) => {

    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [isCelsius, setIsCelsius] = useState(true)

    const [image, setImage] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            if (lat) {
                const ApiKey = '9eca67c68b792eff7b5f590fa7078584'
                const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}`
    
                axios.get(URL)
                    .then(res => {
                        setWeather(res.data)
                        const temp = {
                            celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                            farenheir: `${Math.round(res.data.main.temp - 273.15) * 9 / 5 + 32} °F`
                        }
                        setTemperature(temp)
                        setLoading(false)
                    })
                    .catch(err => console.log(err))
            }
    }, [lat, lon])

    const handleClick = () => setIsCelsius(!isCelsius)

    return (
        <>
            {loading ? <Loading /> : <div className={`bgImg ${weather?.weather[0].main}`}><article className='card'>
                <h1>Weather App</h1>
                <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
                <div className='temp-info-container'>
                    <div className='tem-container img-info'>
                        <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
                        <h2>{isCelsius ? temperature?.celsius : temperature?.farenheir}</h2>

                    </div>
                    <div className='tem-container extra-info'>
                        <h3>&#34;{weather?.weather[0].description}&#34;</h3>
                        <ul>
                            <li><i className='bx bx-wind'></i> <span>Wind Speed </span>{weather?.wind.speed} m/s</li>
                            <li><i className='bx bx-cloud'></i> <span>Clouds </span>{weather?.clouds.all}%</li>
                            <li><i className='bx bxs-thermometer'></i> <span>Pressure </span>{weather?.main.pressure} hPa</li>
                        </ul>
                    </div>
                </div>
                <button className='btn' onClick={handleClick}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button>
            </article></div>}
        </>
    )
}

export default CardWeather