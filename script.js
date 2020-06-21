let apiKey='e573bc5f2edcf55605d7e7fcd2e01d03'
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=`
let altUrl = `https://api.openweathermap.org/data/2.5/weather?`
let now = new Date();
let date = document.querySelector("#main-date")
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];

date.innerHTML = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`

//set Default Location data
axios.get(`${apiUrl}cupertino&units=imperial&appid=${apiKey}`).then(getTemperature)

//Functions
function searchCity(event) {
  event.preventDefault()
  let input = document.querySelector("#search-bar")
  axios.get(`${apiUrl}${input.value}&units=imperial&appid=${apiKey}`).then(getTemperature)
}

function showPosition(position){
  let longitude = position.coords.longitude
  let latitude = position.coords.latitude
  axios.get(`${altUrl}lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`).then(getTemperature)
}

function currentLocation(){
  navigator.geolocation.getCurrentPosition(showPosition)
}

function getTemperature(response){  
  let temp = document.querySelector("#current-temp")
  let city = document.querySelector("#city-name")
  let low = document.querySelector("#low")
  let high = document.querySelector("#high")
  let description = document.querySelector("#weather-description")
  let subdescription = document.querySelector("#precip-details")
  let wind = document.querySelector("#wind")
  let humidity = document.querySelector("#humidity")
  temp.innerHTML = (`${Math.round(response.data.main.temp)}°F`)
  city.innerHTML = `${response.data.name}`
  low.innerHTML = (`${Math.round(response.data.main.temp_min)}°F`)
  high.innerHTML = (`${Math.round(response.data.main.temp_max)}°F`)
  description.innerHTML =  response.data.weather[0].main
  subdescription.innerHTML =  response.data.weather[0].description
  wind.innerHTML = `${response.data.wind.speed}mph`
  humidity.innerHTML = response.data.main.humidity
  displayEmoji(response.data.weather[0].main, response.data.weather[0].description)
}

function displayEmoji(main, description){
  let emoji = document.querySelector('#main-emoji')
  switch(main){
    case "Clouds":
      switch(description){
        case 'few clouds':
            emoji.innerHTML = '	&#x1F324;';
            break;
        case 'scattered clouds':
            emoji.innerHTML = '&#x26C5;';
            break;
        case 'broken clouds':
            emoji.innerHTML = '&#x1F325;';
            break;
        case 'overcast clouds':
            emoji.innerHTML = '&#9729';
            break;
      }
    break;
    case "Clear":
      emoji.innerHTML = '&#9728;&#65039;';
      break;
    case "Snow":
      emoji.innerHTML = '&#x1F328;';
      break;
    case "Rain":
      emoji.innerHTML = '&#x1F327;';
      break;
    case "Thunderstorm":
      emoji.innerHTML = '⛈';
      break;
    case "Drizzle":
      emoji.innerHTML = '&#x1F326;';
      break;
    case "Squall":
    case "Tornado": 
      emoji.innerHTML = '&#x1F32A';
      break;
    default:
      emoji.innerHTML = '&#x1F32B'
      break;
  }
}

//Events
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let current = document.querySelector("#current-location")
current.addEventListener("click", currentLocation)

//let celsiusButton = document.querySelector("#celsius");
//celsiusButton.addEventListener("click", changeTemp); 

//let fahrenheitButton = document.querySelector("#fahrenheit");
//fahrenheitButton.addEventListener("click", changeTemp); 
