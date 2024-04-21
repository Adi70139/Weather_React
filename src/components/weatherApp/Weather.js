import "./Weather.css";
import React,{useState}from "react";
import search from "../Assests/search.png"
import cloud from "../Assests/cloud.png"
import clear from "../Assests/clear.png"
import drizzle from "../Assests/drizzle.png"
import rain from "../Assests/rain.png"
import snow from "../Assests/snow.png"
import humidity_icon from "../Assests/humidity.png"
import windspeed_icon from "../Assests/wind.png"
function Weather(){

   let api="e96011c1a6d1ce25eebf87eca623d516";
   
   const [city,setCity]=useState("");
   const [location,setLocation]=useState("-------")
   const [temperature,setTemperature]=useState("------")
   const [humidity,setHumidity]=useState("-------")
   const [windspeed,setWindSpeed]=useState("-------")
   const [icon,setIcon]=useState(cloud);

   function handleChange(e){
       setCity(e.target.value);
   }

   async function handleClick(){

      if(city.length===0){
         return 0;
      }
       let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api}`;
       let res=await fetch(url)
       let data= await res.json()

       setHumidity(data.main.humidity);
       setWindSpeed(data.wind.speed);
       setTemperature(data.main.temp);
       setLocation(city)
       if(data.weather[0].icon=== "01d" || data.weather[0].icon=== "01n"){
           setIcon(clear)
       }else if(data.weather[0].icon=== "02d" || data.weather[0].icon=== "02n"){
           setIcon(cloud)
       }else if(data.weather[0].icon=== "03d" || data.weather[0].icon=== "03n"){
         setIcon(drizzle)
     }else if(data.weather[0].icon=== "09d" || data.weather[0].icon=== "09n"){
         setIcon(rain)
    }else if(data.weather[0].icon=== "10d" || data.weather[0].icon=== "10n"){
          setIcon(rain)
     }else if(data.weather[0].icon=== "13d" || data.weather[0].icon=== "13n"){
      setIcon(snow)
     }else{
        setIcon(clear)
     }
       setCity("");
   }

    return(
        <>
           <div className="container">
              <div className="top-bar">
                 <input type="text" value={city} onChange={handleChange}  className="city" placeholder="Enter any city"/>
                 <img src={search} alt="search-icon" className="search" onClick={handleClick}/>
              </div>
              
              <div className="weather-img">
                <img src={icon} alt="Cloud"/>
              </div>

              <div className="temp">
                 {temperature} °C
              </div>
              <div className="location">{location}</div>
              <div className="data-container">
               <div className="element">
                  <img src={humidity_icon} alt=""/>
                  <div className="data">
                     <div className="humidity">{humidity} %</div>
                  </div>
               </div>

               <div className="element1">
                  <img src={windspeed_icon} alt=""/>
                  <div className="data">
                     <div className="humidity">{windspeed} Kmph</div>
                  </div>
               </div>

              </div>
           </div>
        </>
    )  
}


export default Weather