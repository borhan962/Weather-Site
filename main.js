let responseData
let serachInput = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn")
let  monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec'],
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  ;

  let nextDay = document.getElementsByClassName("nextDay")
  let nextDayIcon = document.getElementsByClassName("next-icon")
  let nextDegree = document.getElementsByClassName("next-degree")
  let nextDescription = document.getElementsByClassName("next-description")


searchBtn.addEventListener("click", function () {
    if (serachInput.value == "") {
      serachInput.setAttribute("required", true)
    }else{
      get(serachInput.value)
    }

});

function clear() {
  serachInput.value = ""
}

async function get(term){
  let responseApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=82147a7371d243bdb90103115231204&q=${term}&days=3`)
   responseData = await responseApi.json()
   if (!responseData.error) {
        displayToday()
        displayNext()
        clear()
   } 
    };
 get("alexandria")


 function displayToday() {
  document.getElementById("location").innerHTML = responseData.location.name
  let date = new Date()
  document.getElementById("today").innerHTML = days[date.getDay()]
  document.getElementById("today-date").innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`
  document.getElementById("today-degree").innerHTML = Math.round(responseData.current.temp_c)
  document.getElementById("today-icon").setAttribute("src", `${responseData.current.condition.icon}`) 
  document.getElementById("today-description").innerHTML = responseData.current.condition.text
  document.getElementById("humidty").innerHTML = responseData.current.humidity
  document.getElementById("wind").innerHTML = responseData.current.wind_kph
  document.getElementById("compass").innerHTML = responseData.current.wind_dir
 }

 function displayNext() {
  for (let i = 0; i < nextDay.length; i++) {
   nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()]
   nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i+1].date).getDay()]
   nextDayIcon[i].setAttribute("src", `${responseData.forecast.forecastday[i+1].day.condition.icon}`) 
   nextDegree[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.avgtemp_c)
   nextDescription[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text
  }
 }


 






