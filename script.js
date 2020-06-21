let apiKey='e573bc5f2edcf55605d7e7fcd2e01d03'
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=`
let altUrl = `https://api.openweathermap.org/data/2.5/weather?`
let now = new Date();
let date = document.querySelector("#main-date")
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];

date.innerHTML = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`

//set Default Location data
axios.get(`${apiUrl}cupertino&units=imperial&appid=${apiKey}`).then(getDetails)

//Functions
function searchCity(event) {
  event.preventDefault()
  let input = document.querySelector("#search-bar")
  axios.get(`${apiUrl}${input.value}&units=imperial&appid=${apiKey}`).then(getDetails)
}

function showPosition(position){
  let longitude = position.coords.longitude
  let latitude = position.coords.latitude
  axios.get(`${altUrl}lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`).then(getDetails)
}

function currentLocation(){
  navigator.geolocation.getCurrentPosition(showPosition)
}

function getDetails(response){  
  console.log(response)
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

function changeColors(color, text){
  //let button = document.querySelectorAll("button")
  //button.forEach(button => {
   // button.style.background = color;
   // button.style.border = `1px solid #4facfe`
 // })

  document.querySelector("#main").style.background = color;
  //h1: 
  //h3: 
  //current-temp: 
  //main: 
  //fog: background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
  //clear: background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
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

//Events
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let current = document.querySelector("#current-location")
current.addEventListener("click", currentLocation)

//let celsiusButton = document.querySelector("#celsius");
//celsiusButton.addEventListener("click", changeTemp); 

//let fahrenheitButton = document.querySelector("#fahrenheit");
//fahrenheitButton.addEventListener("click", changeTemp); 
