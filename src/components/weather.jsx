import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'

const weather = () => {
    const [city, setCity] = useState("")
    const inputref = useRef()
    const handleChange =(e)=>{
        setCity(e.target.value)
    }
    const [data, setData] = useState(false)
    const all_icons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url)
            if(!response.ok){
                console.log(data.message)
                return
            }            
            const data = await response.json()
            console.log(data);
            const icon = all_icons[data.weather[0].icon] || clear_icon
            setData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        }
        catch (error) {
            setData(false)
            alert("City Not Found !!");
        }
    }

    // useEffect(() => {
    //     search("")
    // }, [])

    return (
        <div className='weather'>
            <div className="search_bar">
                <div>
                    <input ref={inputref} type="text" value={city} onChange={handleChange} placeholder='Search location' />
                    <button onClick={() => { search(inputref.current.value) 
                        setCity("")
                    }} className="search_btn">
                        <img src={search_icon} alt="" />
                    </button>
                </div>

            </div>
            {
                data ?
                    <>
                        <div className="weather_icon">
                            <img src={data.icon} alt="" />
                        </div>
                        <div className="weather_temp">
                            {data.temperature} ℃
                        </div>
                        <div className="weather_location">
                            {data.location}
                        </div>
                        <div className="humidity_windSpeed">
                            <div className="humidity">
                                <div className="humidity_data">
                                    <img src={humidity} alt="" />
                                    <p>{data.humidity} %</p>
                                </div>
                                <p>Humidity</p>
                            </div>
                            <div className="speed">
                                <div className="speed_data">
                                    <img src={wind} alt="" />
                                    <p>{data.windspeed} kmph</p>
                                </div>
                                <p>Speed</p>
                            </div>
                        </div>
                    </> : <> </>
            }
        </div>
    )
}

export default weather