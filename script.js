let apiKey='e573bc5f2edcf55605d7e7fcd2e01d03'
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=`
let altUrl = `https://api.openweathermap.org/data/2.5/weather?`
let units =  `&units=imperial`
let now = new Date();
let date = document.querySelector("#main-date")
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];
let input = document.querySelector("#search-bar")
let tempUnit= `°F`
let speedUnit = `mph`
date.innerHTML = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`

//set Default Location data
function getWeather(){
  axios.get(`${apiUrl}${input.value}${units}&appid=${apiKey}`).then(getDetails)
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${input.value}${units}&appid=${apiKey}`).then(displayForecast)
}

getWeather();

//Functions
function searchCity(event) {
  event.preventDefault();
  getWeather();
}

function formatHours(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  let amOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = (hours % 12) || 12;
  if (hours < 10){
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if(minutes < 10){
    minutes =  `0${minutes}`;
  }
  let month = date.getMonth()
  let today = date.getDate()
  return `${months[month]} ${today}, ${hours}:${minutes} ${amOrPm} `
}

function displayForecast(response){
  let futureForecast = document.querySelector("#future-forecast");
  futureForecast.innerHTML = null;

  for (let i = 0; i < 5; i ++){
    let forecast = response.data.list[i];
    futureForecast.innerHTML += `
    <div class="five-day">
      <div class="row small-forecast-box">
          <div class="little-forecast col-8">
              <span class="forecast-date">
                  ${formatHours(forecast.dt * 1000)} <br/>
              </span>
              <div class="forecast-temps">
                ${Math.round(forecast.main.temp)}${tempUnit}<br>
                <span class='forecast-desc'>${forecast.weather[0].description}</span>
              </div>
          </div>
          <div class="little-emoji col-4">
           ${displayForecastEmoji(forecast.weather[0].main, forecast.weather[0].description)}
          </div>
      </div>
    </div>`
  }
}

function showPosition(position){
  let longitude = position.coords.longitude
  let latitude = position.coords.latitude
  axios.get(`${altUrl}lat=${latitude}&lon=${longitude}${units}&appid=${apiKey}`).then(getDetails)
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}${units}&appid=${apiKey}`).then(displayForecast)
}

function currentLocation(){
  navigator.geolocation.getCurrentPosition(showPosition)
}

function getDetails(response){  
  let temp = document.querySelector("#current-temp")
  let city = document.querySelector("#city-name")
  let low = document.querySelector("#low")
  let high = document.querySelector("#high")
  let description = document.querySelector("#weather-description")
  let subdescription = document.querySelector("#precip-details")
  let wind = document.querySelector("#wind")
  let humidity = document.querySelector("#humidity")
  temp.innerHTML = (`${Math.round(response.data.main.temp)}${tempUnit}`)
  city.innerHTML = `${response.data.name}`
  low.innerHTML = (`${Math.round(response.data.main.temp_min)}${tempUnit}`)
  high.innerHTML = (`${Math.round(response.data.main.temp_max)}${tempUnit}`)
  description.innerHTML =  response.data.weather[0].main
  subdescription.innerHTML =  response.data.weather[0].description
  wind.innerHTML = `${response.data.wind.speed} ${speedUnit}`
  humidity.innerHTML = response.data.main.humidity
  displayEmoji(response.data.weather[0].main, response.data.weather[0].description)
  return input.value = response.data.name
}

function changeColors(color, text){
  //let button = document.querySelectorAll("button")
  //button.forEach(button => {
  //button.style.background = color;
  //button.style.border = `0px solid #4facfe`
 //})
  document.querySelector("#main").style.background = color;
  //h1: 
  //h3: 
  //current-temp: 
}

function displayForecastEmoji(main, description){
  switch(main){
    case "Clouds":
      switch(description){
        case 'few clouds':
            return '<span class="forcast-emoji">&#x1F324;</span>';
            break;
        case 'scattered clouds':
            return '<span class="forcast-emoji">&#x26C5;</span>';
            break;
        case 'broken clouds':
            return '<span class="forcast-emoji">&#x1F325;</span>';
            break;
        case 'overcast clouds':
            return'<span class="forcast-emoji">&#x2601;&#xFE0F;</span>';
            break;
      }
    break;
    case "Clear":
      return'<span class="forcast-emoji">&#9728;&#65039;</span>';
      break;
    case "Snow":
      return'<span class="forcast-emoji">&#x1F328;</span>';
      break;
    case "Rain":
      return'<span class="forcast-emoji">&#x1F327;</span>';
      break;
    case "Thunderstorm":
      return'<span class="forcast-emoji">⛈</span>';
      break;
    case "Drizzle":
      return'<span class="forcast-emoji">&#x1F326;</span>';
      break;
    case "Squall":
    case "Tornado": 
      return'<span class="forcast-emoji">&#x1F32A</span>';
      break;
    case 'Sand':
    default:
        return'<span class="forcast-emoji">&#x1F32B</span>';
      break;
  }
}

function displayEmoji(main, description){
  let emoji = document.querySelector('#main-emoji')
  switch(main){
    case "Clouds":
      switch(description){
        case 'few clouds':
            changeColors('linear-gradient(to top, #a7bdca 0%, #5493b2)')
            emoji.innerHTML = '	&#x1F324;';
            break;
        case 'scattered clouds':
            changeColors('linear-gradient(to top, #a7bdca 0%, #5493b2)')
            emoji.innerHTML = '&#x26C5;';
            break;
        case 'broken clouds':
            changeColors('linear-gradient(to top, #BDBBBE 0%, #727378 100%)');
            emoji.innerHTML = '&#x1F325;';
            break;
        case 'overcast clouds':
            changeColors('linear-gradient(to top, #BDBBBE 0%, #727378 100%)');
            emoji.innerHTML = '&#x2601;&#xFE0F;';
            break;
      }
    break;
    case "Clear":
      changeColors('linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)');
      emoji.innerHTML = '&#9728;&#65039;';
      break;
    case "Snow":
      changeColors('linear-gradient(to bottom, #546a91 0%, #bac8e0 100%)')
      emoji.innerHTML = '&#x1F328;';
      break;
    case "Rain":
      changeColors('linear-gradient(to bottom, #575c66 0%, #87b1d4 100%)')
      emoji.innerHTML = '&#x1F327;';
      break;
    case "Thunderstorm":
      changeColors('linear-gradient(to bottom, #575c66 0%, #87b1d4 100%)')
      emoji.innerHTML = '⛈';
      break;
    case "Drizzle":
        changeColors('linear-gradient(to top, #ccdceb 0%, #727378 100%)');
      emoji.innerHTML = '&#x1F326;';
      break;
    case "Squall":
    case "Tornado": 
      changeColors('linear-gradient(to bottom, #39373d 0%, #b09580 100%)');
      emoji.innerHTML = '&#x1F32A';
      break;
    case 'Sand':
      changeColors('linear-gradient(to bottom, #b3723a 0%, #d9a763 100%)');
    default:
      emoji.innerHTML = '&#x1F32B';
      changeColors('linear-gradient(to bottom, #bc8db9 0%, #5e5e90 100%)')
      break;
  }
}

function changeUnits(){
  if(this.value == 'celsius'){
    units = `&units=metric`
    tempUnit= `°C`
    speedUnit = `km/h`
  } else{
    units=`&units=imperial`
    tempUnit = `°F`
    speedUnit = `mph`
  }
  getWeather();
}


//Events
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let current = document.querySelector("#current-location")
current.addEventListener("click", currentLocation)

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", changeUnits); 

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", changeUnits); 
