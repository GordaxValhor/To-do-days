//hello!!

//api key for https://api.jsonstorage.net/ storage


let USER = {}; // user global objects holds users data


let data = [];

async function testGet() {
  console.log("aici");
  let response = await fetch(`${URL_STORAGE}${API_KEY}`);
  console.log('response raspuns', response)
  let result = await response.json();
  data = result;
  console.log("Result din fetch:", result);
}

async function getData() {
  console.log('user', USER)
  let response = await fetch(`${USER.url_storage}${USER.bucket}?apiKey=${USER.api_key}`);
  console.log('response raspuns', response)
  let result = await response.json();
  data = result;
  console.log("Result din fetch:", result);
  return result
}

async function update(data) {
  //   data.push();
  let toSend = [...data];
  console.log("to send", toSend);

  let response = await fetch(`${USER.url_storage}${USER.bucket}?apiKey=${USER.api_key}`, {
    method: "PUT",
    body: JSON.stringify(toSend),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let result = await response.json();

  console.log("Result din fetch put:", result);
}
// async function patch() {
//   //   data.push();
//   let toSend = { id: Date.now().toString(), name: "test din cod put!!" };
//   console.log("to send", toSend);

//   let response = await fetch(`${URL_STORAGE}?apiKey=${API_KEY}`, {
//     method: "PATCH",
//     body: JSON.stringify(toSend),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   let result = await response.json();

//   console.log("Result din fetch patch:", result);
// }

//testare log in prin api glitch

const URL_API_LOGIN = "https://gordax-api.glitch.me/login";

async function logIn(logInData) {
  console.log('login data', logInData);

  try {
    let result = await fetch(`${URL_API_LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(logInData)
    });

    console.log('results', result);

    if (result.ok) {
      alert("You are logged in");
      let response = await result.json();
      console.log("response", response);
      // create the session cookie
      const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `session_cookie=${response.session_token}; expires=${expirationDate}; path=/`;
      // save the user
      saveUser(response);
      //get user data from saved user data
      USER = JSON.parse(localStorage.getItem('USER'))
      // init to do logic
      init();
    } else {
      alert("Wrong password");
    }

    console.log('cookies:', document.cookie);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function initLogIn() {

  //show log in screen
  let logInScreen = document.querySelector("#log-in-screen");
  logInScreen.classList.remove('hide-shit')


  // get data from form
  let inputPwd = document.querySelector("#password");
  let inputUserName = document.querySelector("#username");
  let buttonLogIn = document.querySelector("#logInBtn");

  buttonLogIn.addEventListener("click", (e) => {
    e.preventDefault();
    logIn({ name: inputUserName.value, pass: inputPwd.value });
  });
}

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
  { id: 11, text: "task 1", checked: false, date: { day: 30, month: 3, year: 2023 } },
];

const original_days = [
  { name: "Luni", day: 0, tasks: [] },
  { name: "Marti", day: 1, tasks: [] },
  { name: "Miercuri", day: 2, tasks: [] },
  { name: "Joi", day: 3, tasks: [] },
  { name: "Vineri", day: 4, tasks: [] },
  { name: "Sambata", day: 5, tasks: [] },
  { name: "Duminica", day: 6, tasks: [] },
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

function getDayAsMondayFirst(data) {
  let nr_day = getDay(data)
  return nr_day == 0 ? 6 : nr_day - 1
}

function getWeekOfMonth(date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay() || 7; // Monday is 1, Sunday is 7
  const dayOfMonth = date.getDate();
  let weekNumber = Math.ceil((firstDayOfWeek + dayOfMonth - 1) / 7);
  return weekNumber;
}

function separeteByDays(task) {
  // console.log('days din separate', days)
  let day = getDay(task.date);
  days[day == 0 ? 6 : day - 1].tasks.push(task); // makes so that monday is the day with index 0
}

//add to days list the dates for each day based on current day date

function addDateToDaysList() {
  let current_date = getCurrentDate();

  let current_date_day_number = getDayAsMondayFirst(current_date)
  let current_date_day = current_date.day;

  //calculate day nr 0 date
  let current_monday_date = current_date_day - current_date_day_number;

  for (let i = 0; i < days.length; i++) {
    days[i].date = {
      day: current_monday_date + i,
      month: current_date.month,
      year: current_date.year,
    };
  }

}

function seperateTasksByDays(tasks) {
  console.log('aici')
  for (let task of tasks) {
    if (checkDate(task.date)) {
      separeteByDays(task);
    }
  }
}

//CRUD
const add = () => {
  mock_tasks.push({ date: new Date().toString() });
  console.log(mock_tasks);
};
//helpfull

function scrollToCurrentDay() {
  let currentDay = document.querySelector('.today')
  let rect = currentDay.getBoundingClientRect();
  console.log('rect:', rect)
  // document.scrollTo(rect.x, rect.y)
  var yOffset = window.innerHeight / 2 - currentDay.getBoundingClientRect().height / 2;

  console.log(yOffset)
  currentDay.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center', });
  window.scrollBy(0, rect.y + 50);
}

async function init() {
  //hide log in screen and show to do screen
  document.querySelector('#log-in-screen').classList.add('hide-shit')
  document.querySelector('#to-do-screen').classList.remove('hide-shit')

  //get current date data
  currentDate = getCurrentDate();

  let taskFromBackEnd = await getData(); //get tasks from back end

  //un pic de loader aici maybe

  let tasks = taskFromBackEnd != undefined ? taskFromBackEnd : mock_tasks;
  console.log('task-uri', tasks)

  if (tasks.length === 0) return;


  //separete tasks by days for current week
  for (let task of tasks) {
    if (checkDate(task.date)) {
      separeteByDays(task);
    }
  }
  console.log("days tasks", days);

  //add dates to days
  addDateToDaysList();

  let container = document.querySelector(".wrapper-days");

  //show results in ui

  updateUI()

  //update task checked

  function updateTaskIsChecked(id) {
    days.forEach(day => {
      let index = day.tasks.findIndex(task => task.id == id)
      if (index != -1) {
        day.tasks[index].checked = !day.tasks[index].checked
        updateUI();
      }
    })
    // update task checked value
    let index = tasks.findIndex(item => item.id == id)
    if (index != -1) {
      tasks[index].checked = tasks[index].checked
    }
    console.log('tasks dupa update checked value:', tasks)

  }

  // update task data
  function updateTaskData(id, newText) {
    days.forEach(day => {
      let index = day.tasks.findIndex(task => task.id == id)
      if (index != -1) {
        day.tasks[index].text = newText
        // updateUI();
      }
    })

    //update task data form tasks list
    let index = tasks.findIndex(item => item.id == id)
    if (index != -1) {
      tasks[index].text = newText
    }
    console.log('tasks dupa update text:', tasks)

  }

  //ADD new task
  function addNewTaskV2(taskDay) {
    //add task to 
    console.log(taskDay)
    let id = Date.now().toString()
    let newTask = {
      id: id,
      text: '',
      checked: false,
      date: {
        day: taskDay,
        month: currentDate.month,
        year: currentDate.year,
      }
    }
    for (let i = 0; i < days.length; i++) {
      console.log(days[i]);
      if (days[i].date.day == taskDay) {
        days[i].tasks.push(newTask)
        break
      }
    }
    updateUI();
    addFocusToElement(id);

    //ad tesk to tasks list
    tasks.push(newTask)
    console.log('tasks dupa add:', tasks)

  }

  function addFocusToElement(id) {
    let element = document.querySelector(`#text-${id}`)
    element.focus();
  }

  function deleteTask(id) {
    console.log('id:', id)
    //just remove task from day.tasks
    //update the ui
    days.forEach(day => {
      //test with new structured clone
      day.tasks = structuredClone([...day.tasks.filter(task => task.id != id)])
    })
    console.log(days)
    updateUI();

    //delete task from tasks list
    tasks = structuredClone([...tasks.filter(task => task.id != id)])
    console.log('tasks dupa update text:', tasks)
  }

  //save tasks to db

  function saveTasks() {
    update(tasks)
  }

  //events
  container.addEventListener('click', (e) => {

    //case for add task
    if (e.target.matches('img') && e.target.parentNode.classList.contains('add-task')) {
      console.log('event', e)
      console.log('e target', e.target)
      let taskDay = parseInt(e.target.parentNode.attributes['data-date-day'].value)
      // addNewTask(taskDay)
      addNewTaskV2(taskDay);
      return
    }
    //case for delete task
    if (e.target.matches('img') && e.target.parentNode.classList.contains('remove-task')) {
      let taskId = e.target.parentNode.parentNode.attributes['data-id-task'].value
      deleteTask(taskId)
      return
    }
    //case for status change
    if (e.target.matches('img')) {
      let taskId = e.target.parentNode.parentNode.attributes['data-id-task'].value
      console.log('id task', taskId)
      updateTaskIsChecked(taskId)
      return
    }

  })
  container.addEventListener('input', (e) => {

    let taskId = e.target.parentNode.attributes['data-id-task'].value


    updateTaskData(taskId, e.target.textContent)
  })

  container.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      //get needed data for adding a new item
      let taskDay = parseInt(e.target.parentNode.parentNode.parentNode.lastElementChild.firstElementChild.attributes['data-date-day'].value)
      addNewTaskV2(taskDay);
    }
  })

  //save events
  document.onvisibilitychange = () => {
    if (document.visibilityState === "hidden") {
      //save the data to back end
      saveTasks()
      console.log('ne pune sa salvam:', tasks)
    }
  };

  //update ui:

  function updateUI() {
    container.innerHTML = "";

    days.forEach((day, index) => {

      let isToday = getDayAsMondayFirst(currentDate) === index ? true : false;


      let markUpTasks = "";

      let markUpNewTask = `
        <div class="add-task-wrapper">
          <div class="add-task task-icon" data-date-day=${day.date?.day}><img src="./assets/icons/add_white.svg" /></div>
        </div>
        `

      day.tasks.forEach((task) => {

        let markUp =
          `<div class="task ${task.checked ? 'completed' : ''}" data-id-task='${task.id}'>
            <div class="task-icon">
              ${task.checked ? `<img src="./assets/icons/task_checked_white.svg" alt="Example SVG"/>` : `<img src="./assets/icons/task_unchecked_white.svg" alt="Example SVG" />`}
            </div>
            <div class="task-data" data="${task.checked}" contenteditable="${task.checked === false ? 'true' : 'false'}" id="text-${task.id}" spellcheck="false">${task.text}</div>
            ${task.checked ? "" :
            `<div class="remove-task task-icon">
              <img src="./assets/icons/remove_circle.svg" />
            </div>`}
          </div>`
        markUpTasks += markUp;
      });

      let markUpContainer =
        `<div class="card day ${isToday ? 'today' : ''}">
          <h2 class="card-header">${day.name} - ${day.date.day}/${day.date.month}</h2>
          <div class="task-wrapper">
              ${markUpTasks}
          </div>
          ${markUpNewTask}
        </div>`;

      container.innerHTML += markUpContainer;
    })
  }
}

// run the logic
//init();

function checkUser() {
  // check if we have an user in locale data and get its data
  if (checkSessionCookie()) {
    if (localStorage.getItem('USER')) {
      USER = JSON.parse(localStorage.getItem('USER'))
      return true
    }
    else {
      initLogIn();
      return false
    }
  }
  else {
    // user must log in again
    initLogIn();
    return false
  }
}

function saveUser(user) {
  // save user data in locale storage
  console.log('aici')
  localStorage.setItem('USER', JSON.stringify(user));
  //
}

function checkSessionCookie() {
  // check if session cookie exists if not user must log in again
  // if(document.cookie)
  const cookies = document.cookie.split(';');

  // Iterate through the cookies
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if the current cookie starts with the desired name
    if (cookie.startsWith('session_cookie' + '=')) {
      return true; // Cookie found
    }
  }

  return false; // Cookie not found
}

function startGame() {
  // check if we have a user

  if (checkUser()) {
    //init to do logic
    init();
  }
  // check if user is loged in


  //test if user is loged in
}

startGame()

