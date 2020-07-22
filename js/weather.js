const weather = document.querySelector(".js-weather");
const weatherIcons = document.querySelector(".js-weatherIcon");

//weather api 키 https://home.openweathermap.org/api_keys
const API_KEY = "0594eed0d20e43b1cc14d8ddabc8fb5a";
const COORDS = "coords";

function weatherIcon(WI) {
  weatherIcons.style.backgroundImage = `url(http://openweathermap.org/img/wn/${WI}@2x.png)`;
}

function getWeather(lat, lon) {
  // 데이터 가져오는 함수
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      // 데이터를 가져온후 함수실행을 위해 then 함수 사용

      return response.json();
    })
    .then(function (json) {
      console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      const weatherName = json.weather[0].main;
      const icon = json.weather[0].icon;
      weather.innerText = `${weatherName} \n ${place} \n ${temperature}°C `;
      weatherIcon(icon);
    });
}

function saveCoords(coordsObj) {
  //json 문자열로 변형후 로컬스토리지 저장
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  //위도값
  const latitude = position.coords.latitude;
  //경도값
  const longitude = position.coords.longitude;
  //위도 경도 값 객체화
  const coordsObj = {
    latitude,
    longitude,
  };
  //해당함수로 값 보내기
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("지역을 불러오지 못했습니다.");
}

function askForCoords() {
  //navigator api 사용 지역 값 가져오기
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  //로컬스토리지에서 COORDS값 가져와 저장
  const loadedCords = localStorage.getItem(COORDS);
  // 값이 없다면 해당함수 호출
  if (loadedCords === null) {
    askForCoords();
  } else {
    //값이 있다면
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
