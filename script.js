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
  let city = document.querySelector("#city-name")
  city.innerHTML = `${input.value}`
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
  console.log(response)
  let temp = document.querySelector("#current-temp")
  temp.innerHTML = (`${Math.round(response.data.main.temp)}°F`)
  let city = document.querySelector("#city-name")
  city.innerHTML = `${response.data.name}`

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
