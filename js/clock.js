const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector(".clockH1"),
  clockDate = clockContainer.querySelector(".dateH1");

function getTime() {
  //데이트 함수
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  // 10 보다 작을시(true) 0을 붙여서 출력 : 아닐시(false) 그냥 출력
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  } : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function getDate() {
  //데이트 날짜
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  clockDate.innerText = `${year}년 ${month}월 ${day}일`;
}

function init() {
  getTime();
  //해당 함수 1초에 한번씩
  setInterval(getTime, 1000);
  getDate();
  setInterval(getDate, 100000);
}

init();
