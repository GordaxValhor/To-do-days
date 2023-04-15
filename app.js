//hello!!

//api key for https://api.jsonstorage.net/ storage

let API_KEY = "db621cc1-afc9-4b43-b5f3-af6b76f8bdde";

let URL_STORAGE = "https://api.jsonstorage.net/v1/json/38559add-6b9a-4d4f-8c0b-14758de0a685/";

let bucket_1 = "b98e5cb2-fe16-4e5e-9ffa-9a0567e4fff2";
let bucket_2 = "9b2787c3-0818-45af-bd94-3e7f320c2e60";

let data = [];
async function testGet() {
  console.log("aici");
  let response = await fetch(`${URL_STORAGE}${bucket_2}`);
  let result = await response.json();
  data = result;
  console.log("Result din fetch:", result);
}
async function update() {
  //   data.push();
  let toSend = [...data, { id: Date.now().toString(), name: "test din cod!!" }];
  console.log("to send", toSend);

  let response = await fetch(`${URL_STORAGE}${bucket_2}?apiKey=${API_KEY}`, {
    method: "PUT",
    body: JSON.stringify(toSend),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let result = await response.json();

  console.log("Result din fetch put:", result);
}
async function patch() {
  //   data.push();
  let toSend = { id: Date.now().toString(), name: "test din cod put!!" };
  console.log("to send", toSend);

  let response = await fetch(`${URL_STORAGE}?apiKey=${API_KEY}`, {
    method: "PATCH",
    body: JSON.stringify(toSend),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let result = await response.json();

  console.log("Result din fetch patch:", result);
}
function testJsonStorage() {
  console.log("incepe testuls");
}

//getting html elements

let buttonTest = document.querySelector("#button");
let buttonTestPut = document.querySelector("#button2");
let buttonTestPatch = document.querySelector("#button3");

// buttonTest.addEventListener("click", (e) => {
//   console.log("se apasa test");
//   testGet();
// });
// buttonTestPut.addEventListener("click", (e) => {
//   console.log("se apasa test put");
//   update();
// });
// buttonTestPatch.addEventListener("click", (e) => {
//   console.log("se apasa test patch");
//   patch();
// });

testJsonStorage();
//testare log in prin api glitch

const URL_API_LOGIN = "https://gordax-test-api.glitch.me/login";

async function logIn(pwd) {
  let result = await fetch(`${URL_API_LOGIN}?pwd=${pwd}`);
  let response = await result.json();
  console.log("raspuns", response);
  if (response) {
    alert("esti logat");
  } else {
    alert("parola gresita");
  }
}

async function testLogIn() {
  let inputPwd = document.querySelector("#password");
  let buttonLogIn = document.querySelector("#logInBtn");

  buttonLogIn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("valoare pwd:", inputPwd.value);
    logIn(inputPwd.value);
  });
}
testLogIn();

//testare preluare task pe zile

let mock_tasks = [
  { id: 1, text: "fa curat si spala masina", checked: false, date: { day: 10, month: 3, year: 2023 } }, //ai grija ca lunile incep de la 0
  { id: 2, text: "mai lucra pe proiectul TDD", checked: false, date: { day: 10, month: 3, year: 2023 } },
  { id: 3, text: "fa mancare", checked: false, date: { day: 11, month: 3, year: 2023 } },
  { id: 4, text: "fa dus", checked: false, date: { day: 12, month: 3, year: 2023 } },
  { id: 5, text: "spala rufe", checked: false, date: { day: 12, month: 3, year: 2023 } },
  { id: 6, text: "citi", checked: false, date: { day: 16, month: 3, year: 2023 } },
  { id: 7, text: "citi", checked: false, date: { day: 16, month: 3, year: 2023 } },
  { id: 8, text: "citi", checked: false, date: { day: 16, month: 3, year: 2023 } },
  { id: 9, text: "citi", checked: false, date: { day: 16, month: 3, year: 2023 } },
  { id: 10, text: "citi", checked: false, date: { day: 16, month: 3, year: 2023 } },
  { id: 11, text: "citi stat", checked: false, date: { day: 16, month: 3, year: 2023 } },
];

let days = [
  { name: "Luni", day: 0, tasks: [] },
  { name: "Marti", day: 1, tasks: [] },
  { name: "Miercuri", day: 2, tasks: [] },
  { name: "Joi", day: 3, tasks: [] },
  { name: "Vineri", day: 4, tasks: [] },
  { name: "Sambata", day: 5, tasks: [] },
  { name: "Duminica", day: 6, tasks: [] },
];

let currentDate = {
  day: 26,
  month: 3,
  year: 23,
};

const getDayName = (index) => {
  const weekDays = ["Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"];
  return weekDays[index];
};

const getCurrentDate = () => {
  let date = new Date();
  console.log("c date:", date);
  let aux = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
  console.log("curent date:", aux);
  return aux;
};

function checkDate(date) {
  //check year
  if (date.year != currentDate.year) {
    return false;
  }
  //check month
  if (date.month != currentDate.month) {
    return false;
  }
  //check weeek
  if (getWeekOfMonth(new Date(date.year, date.month, date.day)) != getWeekOfMonth(new Date(currentDate.year, currentDate.month, currentDate.day))) {
    return false;
  }
  return true;
}

function getDay(data) {
  let date = new Date(data.year, data.month, data.day);
  return date.getDay();
}

function getWeekOfMonth(date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay() || 7; // Monday is 1, Sunday is 7
  const dayOfMonth = date.getDate();
  let weekNumber = Math.ceil((firstDayOfWeek + dayOfMonth - 1) / 7);
  return weekNumber;
}

function separeteByDays(task) {
  let day = getDay(task.date);
  days[day == 0 ? 6 : day - 1].tasks.push(task);
}

//CRUD
const add = () => {
  mock_tasks.push({ date: new Date().toString() });
  console.log(mock_tasks);
};

async function init() {
  //get current date data
  currentDate = getCurrentDate();

  //get tasks from back end

  let tasks = mock_tasks != undefined ? mock_tasks : [];
  console.log('task-uri', tasks)
  if (tasks.length === 0) return;
  //separete tasks by days for current week
  for (let task of tasks) {
    if (checkDate(task.date)) {
      separeteByDays(task);
    }
  }
  console.log("days tasks", days);
  let container = document.querySelector(".wrapper-days");

  //show results in ui

  updateUI()

  //update task checked

  function updateTaskIsChecked(id) {
    days.forEach(day => {
      let index = day.tasks.findIndex(task => task.id == id)
      if (index != -1) {
        console.log('task-ul de modificat', day.tasks[index])
        day.tasks[index].checked = !day.tasks[index].checked
        console.log('task-ul dupa modificare:', day.tasks[index])
        updateUI();
      }
    })
  }

  // update task data
  function updateTaskData(id, newText) {
    days.forEach(day => {
      let index = day.tasks.findIndex(task => task.id == id)
      if (index != -1) {
        console.log('task-ul de modificat', day.tasks[index])
        day.tasks[index].text = newText
        console.log('task-ul dupa modificare:', day.tasks[index])
        // updateUI();
      }
    })
  }

  function addNewTask() {
    // creat new empty task
    // show it in ui at the right place
    // update ui
  }

  function deleteTask(id) {
    console.log('id:', id)
    //just remove task from day.tasks
    //update the ui
    days.forEach(day => {
      let oldTasks = day.tasks
      day.tasks = oldTasks.filter(task => task.id != id)
    })
    updateUI();
  }

  //save tasks to db

  function saveTasks() {

  }

  //events
  container.addEventListener('click', (e) => {
    console.log('e target', e.target)
    console.log('event', e)
    //case for status change
    //case for delete task
    if (e.target.matches('img') && e.target.parentNode.classList.contains('remove-task')) {
      let taskId = e.target.parentNode.parentNode.attributes['data-id-task'].value
      deleteTask(taskId)
    }

    if (e.target.matches('img')) {
      let taskId = e.target.parentNode.parentNode.attributes['data-id-task'].value
      console.log('id task', taskId)
      updateTaskIsChecked(taskId)
    }

  })
  container.addEventListener('input', (e) => {
    console.log('event', e)
    console.log('e target', e.target)
    let taskId = e.target.parentNode.attributes['data-id-task'].value
    updateTaskData(taskId, e.target.textContent)
  })

  //update ui:

  function updateUI() {
    container.innerHTML = "";

    days.forEach((day) => {
      let markUpTasks = "";

      let markUpNewTask = `<div class="add-task task-icon"><img src="./assets/icons/add_white.svg" /></div>`

      day.tasks.forEach((task) => {
        let markUp =
          `<div class="task ${task.checked ? 'completed' : ''}" data-id-task='${task.id}'>
            <div class="task-icon">
              ${task.checked ? `<img src="./assets/icons/task_checked_white.svg" alt="Example SVG"/>` : `<img src="./assets/icons/task_unchecked_white.svg" alt="Example SVG" />`}
            </div>
            <div class="task-data" data="${task.checked}" contenteditable="${task.checked === false ? 'true' : 'false'}"  >${task.text}</div>
            ${task.checked ? "" :
            `<div class="remove-task task-icon">
              <img src="./assets/icons/remove_circle.svg" />
            </div>`}
          </div>`
        markUpTasks += markUp;
      });

      let markUpContainer =
        `<div class="card day">
          <h2 class="card-header">${day.name}</h2>
          <div class="task-wrapper">
              ${markUpTasks}
          </div>
        </div>`;

      container.innerHTML += markUpContainer;
    })
  }
}

// run the logic
init();
