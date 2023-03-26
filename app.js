//helo!!

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

//testare preluare task pe zile

let mock_tasks = [
  { id: 1, info: "fa curat", checked: true, date: { day: 25, month: 2, year: 2023 } },
  { id: 2, info: "sapala masina", checked: true, date: { day: 25, month: 2, year: 2023 } },
  { id: 3, info: "fa mancare", checked: true, date: { day: 22, month: 2, year: 2023 } },
  { id: 4, info: "fa dus", checked: true, date: { day: 23, month: 2, year: 2023 } },
  { id: 5, info: "spala rufe", checked: true, date: { day: 21, month: 2, year: 2023 } },
  { id: 6, info: "citi", checked: false, date: { day: 22, month: 2, year: 2023 } },
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
  if (tasks.length === 0) return;
  //separete tasks by days for current week
  for (task of tasks) {
    if (checkDate(task.date)) {
      separeteByDays(task);
    }
  }
  console.log("days tasks", days);
  //show results in ui

  let container = document.querySelector(".wrapper-days");

  days.forEach((day) => {
    let markUpTasks = "";

    day.tasks.forEach((task) => {
      let markUp = `<p>${task.info} ${task.checked ? "√" : "X"}</p>`;
      markUpTasks += markUp;
    });

    let markUpContainer = `<div>
      <h2>${day.name}</h2>
      <div>
          ${markUpTasks}
      </div>
    </div>`;

    container.innerHTML += markUpContainer;
  });
}

// run the logic
init();
