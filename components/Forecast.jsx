import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import './Forecast.css'
import months from '../src/months'

const Forecast = ({ lon, lat, isCelsius }) => {

    const [forecast, setForecast] = useState()
    const [temperature, setTemperature] = useState()

    useEffect(() => {
        if (lon) {
            const ApiKey = '9eca67c68b792eff7b5f590fa7078584'
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}`)
                .then(res => {
                    const array = []
                    for (let i = 4; i < res.data.list.length; i += 8) {
                        array.push(res.data.list[i])
                    }
                    setForecast(array)
                    const temp = {
                        celsius: `${Math.round(res.data.list[0].main.temp - 273.15)} °C`,
                        farenheir: `${Math.round(res.data.list[0].main.temp - 273.15) * 9 / 5 + 32} °F`
                    }
                    setTemperature(temp)
                })
                .catch(err => console.log(err))

        }
    }, [lon, lat])

    console.log(months.M08)
    console.log(forecast)

    return (
        <article className='forecast-container'>
            {forecast?.map(info => {
                let day = ((info?.dt_txt).split(' ')[0]).split('-')[2]
                let month = 'M' + ((info?.dt_txt).split(' ')[0]).split('-')[1]
                return (
                    <div className="card-forecast">
                        <div className='for-card'>
                            <img src={`http://openweathermap.org/img/wn/${info.weather[0].icon}@4x.png`} alt="" />
                            <h3>{isCelsius ? temperature?.celsius : temperature?.farenheir}</h3>
                        </div>
                        <div className='for-card forecast-card-info'>
                            <h3>{months[month]} {day}</h3>
                            <p>&#34;{info?.weather[0].description}&#34;</p>
                            <ul>
                                <li><i className='bx bx-wind'></i> <span>Wind Speed </span>{info?.wind.speed} m/s</li>
                                <li><i className='bx bx-cloud'></i> <span>Clouds </span>{info?.clouds.all}%</li>
                                <li><i className='bx bxs-thermometer'></i> <span>Pressure </span>{info?.main.pressure} hPa</li>
                            </ul>
                        </div>
                    </div>
                )
            })}
        </article>

    )
}

export default Forecast