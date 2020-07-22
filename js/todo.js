const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  //해당 버튼으로 부모요소를 찾은후 변수 저장
  const li = btn.parentNode;
  // li 삭제
  toDoList.removeChild(li);
  //toDo.id 와 li.id 같지않은 새로운 배열 생성 filter 함수로
  const cleanToDos = toDos.filter(function (toDo) {
    //li.id 가 문자열이라 정수형으로 변경
    return toDo.id !== parseInt(li.id);
  });
  //추출한 새로운 배열 다시 저장
  toDos = cleanToDos;
  // 스토리지 저장
  saveToDos();
}

function saveToDos() {
  //로컬스토리지에 해당 변수 저장 , todos 배열 JSON 문자열로 변환해 저장
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  //li 엘리먼트 추가 변수 저장
  const li = document.createElement("li");
  // span 태그 추가 변수 저장
  const span = document.createElement("span");
  // button 엘리먼트 추가 변수 저장
  const delBtn = document.createElement("button");
  // todos 배열 길이에 +1 을 하여 저장 ex) 0일시 1
  const newId = toDos.length + 1;
  //span 에 해당 인수 값 추가
  span.innerText = text;
  // delete 버튼에 text 값 추가
  delBtn.innerText = "✘";
  // delete 버튼 이벤트 클릭시 해당함수 호출
  delBtn.addEventListener("click", deleteToDo);
  //li을 부모로한 child 값으로 span 저장

  li.appendChild(span);
  //li을 부모로한 child 값으로 delBtn 저장
  li.appendChild(delBtn);

  li.id = newId;
  toDoList.appendChild(li);
  //객체 추가
  const todoObj = {
    text: text,
    id: newId,
  };

  // 해당 객체를 toDos 배열에 푸쉬
  toDos.push(todoObj);

  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  if (toDoInput.value !== "") {
    if (toDos.length > 7) {
      alert("더이상 추가할수 없습니다.");
      toDoInput.text.disabled;
    }
    const currentValue = toDoInput.value;
    paintToDo(currentValue);

    // 해당 이벤트 발생시 value 빈값으로 초기화
    toDoInput.value = "";
  }
}

function loadToDos() {
  const loadToDos = localStorage.getItem(TODOS_LS);

  if (loadToDos !== null) {
    // 로컬스토리지에 값이 없을시
    // JSON.parse => JSON.stringfy 의 반대 JSON 문자열을 자바스크립트 객체로 변환
    const parseToDos = JSON.parse(loadToDos);
    //text 형으로 값을 넘기기위해 forEach 함수 사용
    parseToDos.forEach(function (toDo) {
      //console.log(toDo.text);
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
