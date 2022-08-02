import { useState } from 'react'
import { useEffect } from 'react'
import CardWeather from '../components/CardWeather'

function App() {

  const [coords, setCoords] = useState()

  useEffect(() => {

    const success = pos => {
      const latlong = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlong)
    }
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  return (
    <div className="App">
      <CardWeather lon={coords?.lon} lat ={coords?.lat}/>
    </div>
  )
}

export default App
