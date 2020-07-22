const form = document.querySelector(".js-greetingForm"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing"; // showing 클래스

function saveName(text) {
  //로컬스토리지에 저장
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  //최상위 태그에 이벤트 전파를 막기위함
  event.preventDefault();
  //input 텍스트 값
  const currentValue = input.value;
  //input 텍스트 값 paintName 함수로 전달
  paintName(currentValue);
  //input 텍스트 값 saveName 함수로 전달
  saveName(currentValue);
}

function askForName() {
  //showing 클래스 .js-greetingForm 에 추가
  form.classList.add(SHOWING_CN);
  //js-greetingForm에 이벤트 리스너 섭밋 추가 , submit 시 handleSubmit 함수 실행
  form.addEventListener("submit", handleSubmit);
}

function paintName(text) {
  //js-greetingForm에 showing 클래스 제거
  form.classList.remove(SHOWING_CN);
  //js-greetings에 showing 클래스 추가
  greeting.classList.add(SHOWING_CN);
  //js-greetings에 해당 텍스트 추가
  greeting.innerText = `${text}님 반갑습니다.`;
}

function loadName() {
  // 2
  //로컬 스토리지에서 해당 변수 가져와 초기화
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    //유저가없는경우 해당함수 실행
    askForName();
  } else {
    //유저가 있는경우 인수 currentUser로 해당 함수 실행
    paintName(currentUser);
  }
}

function init() {
  // 1

  loadName();
}

init();
