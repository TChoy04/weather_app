let condition = document.getElementById("currentCondition");
let cityName = document.getElementById("cityName");
let temperature = document.getElementById("temperature");
let weatherImage = document.getElementById("weatherIcon");
let currentLocation = "New York";
let input = document.getElementsByTagName("input")[0];
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
const nthNumber = (number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
function updateClock() {
  let now = new Date(),
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  year = now.getFullYear();
  second = year % 10;
  year /= 10;
  first = year % 10;
  second = Math.floor(second);
  first = Math.floor(first);
  time = now.getHours() + ":";
  if (now.getMinutes() < 10) {
    time += 0;
  }
  time += now.getMinutes();
  time.concat(now.getMinutes());
  date = [
    days[now.getDay()] + ", ",
    months[now.getMonth()],
    now.getDate() + nthNumber(now.getDate()),
    `'${first}${second}`,
  ].join(" ");
  document.getElementById("date").innerText = [date];
  document.getElementById("time").innerText = [time];
  setTimeout(updateClock, 1000);
}

const getCurrentWeather = async () => {
  try {
    res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=5a7ea79ebf2d40c789290611232003&q=${currentLocation}&aqi=no`
    );
    res = await res.json();
    if (res.location.region != "")
      cityName.innerText = `${res.location.name}, ${res.location.region}`;
    else cityName.innerText = `${res.location.name}`;
    condition.innerText = res.current.condition.text;
    temperature.innerText = Math.round(res.current.feelslike_f) + " °F";
    weatherImage.setAttribute("src", res.current.condition.icon);
  } catch (error) {
    console.log(error);
  }
};
getCurrentWeather();
updateClock();
searchButton.addEventListener("click", async () => {
  console.log(input);
  currentLocation = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=5a7ea79ebf2d40c789290611232003&q=${input.value}&aqi=no`
  );
  try {
    currentLocation = await currentLocation.json();

    currentLocation = currentLocation[0].name;
    getCurrentWeather();
  } catch {
    searchInput.value = "";
    searchInput.placeholder = "City not found!";
  }
});

searchInput.addEventListener("keydown", async (e) => {
  console.log(e);
  if (e.key === "Enter") {
    currentLocation = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=5a7ea79ebf2d40c789290611232003&q=${input.value}&aqi=no`
    );
    try {
      currentLocation = await currentLocation.json();
      currentLocation = currentLocation[0].name;
      getCurrentWeather();
    } catch {
      searchInput.value = "";
      searchInput.placeholder = "City not found!";
    }
  }
});
