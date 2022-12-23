import { useEffect, useState } from 'react'
import axios from 'axios'
import 'boxicons'
import './App.css'

function App() {

  const [isCentigrade,setIsCentigrade] = useState(true)
  const [weather,setWeather] = useState({})

  useEffect(()=>{
    
    function success(pos) {
      const crd = pos.coords;

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=4b80326eacd529e69281be0112f8f7a3`)
      .then(res=>setWeather(res.data))

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`); 
    }

    navigator.geolocation.getCurrentPosition(success, error,);
    
  },[])
  
  console.log(weather)

  const centigrade = Math.round((weather.main?.temp - 273.15)*100)/100
  const farenheit = Math.round(((weather.main?.temp - 273.15)*(9/5)+32)*100)/100
  const windSpeed = Math.round(weather.wind?.speed *100 * 10)/100
  const pressure = weather.main?.pressure * 0.1

  const changeTemp = () =>{
    setIsCentigrade(!isCentigrade)
  }

  return (
    <div>
      <div className='weather-card'>
        <h1>Weather App</h1>
        <h2>{weather.name}{","}{weather.sys?.country}</h2>
        <div className='info-container'>
          <div className='box-icon'>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <span>{isCentigrade ? centigrade : farenheit} {isCentigrade ? "°C" : "°F"}</span>
          </div>
          <div className='weather-items'>
            <div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATlJREFUSEvtlO0xBEEURc9GgAyIABGQATIgAkSADIgAESACZCADZEAE1FmvVe9Uf0xR82/7z87WvLnnvdu3e8bEazaxPktA1+ExFq0Cx8AusAX4/wW4B66AjxalB1DwMURLOoofBazIaQHs+C7En4FL4Ck69t05sBOqQm5KhBZAGzaBW+CwYoOQs4BulOwqAezOj/x9B9Y7O+lUTnIRUy2UDwF2ep1VVEfPamzEfXLi7WEzOSAVWnManjYTkol9xbP7YLKEzVcOMHZ7tVE7NiWAZTZ1EIFYAPhiBVjrZbsCc6+cwP14APaHE6Qu/gpQT8hr7k5uUTMN3TvhpyABftOXAxzJg+Uy3+b/baRwEjeBhqVoURL2DPxnfcadNW+udtDya2AsTFuM50k+ee+yGyterVsCuhZObtE3R7A8GYJJQCwAAAAASUVORK5CYII="/>{weather.weather?.[0].description}</div>
            <div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAKJJREFUSEvt1U0VAiEUBeBvGhjBBhpFE2gETaIRnAQaRRsYwQZ6mMNi5KjAYlzBCrjvB+59DzoTj27i+FqCLMNjip44YY9H9JzhgG1c1+JvGoQEYVyxjvMzlskxS/F78BvfYI4LFknAG1ZxrwYfYqdVFCg5YhMD9tgllJXiHxNkRas1aCIHxr4VQRN5qKdcp7dO9qvT/9/Jta9AkX37MrM0vQBsglQZFfkJlAAAAABJRU5ErkJggg=="/> Humidity: <span>{weather.main?.humidity}%</span></div>
            <div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWRJREFUSEvtlNExREEQRc9GQAhEgAjIABEgAkSADIgAESACRIAIEAEioM5Wt5qdmvdmf/Zv52f3zfT0vX379kxY8JosOD9LgK7C80i0ChwDO8Am4PcrcA9cAd9jKD0AEz5G0lYekx8FWBNnDEDGd5H8GbgEnoKxZyfAbmQV5KaFMAagDBvALXA4IMM5cBagW8BHHdcCkJ2X/P0E1jqdtKpt4AIQcGbVADK9LiLq0n/jrLwnEftkxVYxCJCBBpyGprVDWgDG577OshLBpqtk4qFNa5Ya8T0AwyS1H4aYAfBgBVhvNasD4LG90kn24wHYqytIdjWAlw4GGl07zCH8KtUpJRpzQ1q2xHmLyS73rOK9dF/LDV7QbrJLX8vM/0ro+glJShOYXAdqlqZEmdgZKFeS8Nl4iQPtmE5JafOO4MZOyQ0NmhXYrDomJ7p8FhLAoRTUJ+R/onuP3UBv599eAnS1WrhEf+PVTBn9oLf0AAAAAElFTkSuQmCC"/>Pressure: <span>{pressure} kPa</span></div>
            <div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAS9JREFUSEu1lY1RwkAUhD8qwBKgArQCsQKhA0uQCsAKlAqwBKkAqAA7UDuQCmDWec85bkjuciSZyUz+7u3bfXubHh0fvY7rkwKYAHPgFtgCS+CjSVN1AGNgc6HYtAlIHYA6fQRegIWdYrMDBJ51pCSKixztga8bAK8moV59AjPg2xc2ARCLkIGK74GbqItf4M5BQgDvLkX9wQbuEkqyJ1v0DtwDa0AGOXNRCkCF3oIBq9M+MAwkEasvu9fzpE1TbOL3DvAD6LpVABVcmcOKJMplczBX/TmpZMhVQJJFNn0utWkug7PvmuyDqwFimzp4yr61IVg3g1wAZ3YxBNuQKI6QTmYQh+A/SAkDzyB17lFeGeMlAFU/Ig/BViRSUorByH5AYQi2ApC9J0okyi6uD0+KcD0Zf6k0xwAAAABJRU5ErkJggg=="/>Wind Speed: <span>{windSpeed} m/s</span></div>
          </div>
        </div>
        <button onClick={changeTemp}>Degrees °F/°C</button>
      </div>
      
    </div>
  )
}

export default App
