/** @type {HTMLSpanElement} */
const goalCount = document.getElementById('goal-count');

/** @type {HTMLButtonElement} */
const addGoalButton = document.getElementById('add-goal');

/** @type {HTMLFormElement} */
const inputGoalForm = document.getElementById('input-goal');

/** @type {HTMLDivElement} */
const goalsSection = document.getElementById('goals');

/**
 * @typedef {Object} Goal 
 * @property {String} title The title of the goal
 * @property {String[]} subGoals The sub goals of the goal
 */
/** @type {Goal[]} */
let goals = [];

const GOAL_STORAGE_KEY = "goals";

window.addEventListener('load', function(ev) {
  let dataFromLocalStorage = localStorage.getItem(GOAL_STORAGE_KEY);

  if (!dataFromLocalStorage) {
    dataFromLocalStorage = '[]';
  }

  goals = JSON.parse(dataFromLocalStorage);

  renderGoals();
});

addGoalButton.addEventListener('click', function (ev) {
  // hide the add new goal button, show the add form
  addGoalButton.classList.toggle('hide');
  inputGoalForm.classList.toggle('show');
  goalsSection.classList.toggle('show')

});

inputGoalForm.addEventListener('submit', function (ev) {
  ev.preventDefault(); // This is necessary because it can override defaul form's behavior (page refresh)

  let goalText = inputGoalForm['goal'].value.trim();

  // string is null or empty
  if (!goalText) {
    alert('Goal cannot be empty!');
    return;
  }

  let dataFromLocalStorage = localStorage.getItem(GOAL_STORAGE_KEY);

  if (!dataFromLocalStorage) {
    dataFromLocalStorage = '[]';
  }

  goals = JSON.parse(dataFromLocalStorage);

  let goal = goals.filter(item => item.title == goalText)[0];
  if (!goal) {
    goal = {
      title: goalText,
      subGoals: []
    };
  } else {
    alert("Goal already exist!");
    return;
  }

  goals.push(goal);
  goalCount.innerText = goals.length;
  localStorage.setItem(GOAL_STORAGE_KEY, JSON.stringify(goals));

  renderGoals();
  addGoalButton.classList.toggle('hide');
  inputGoalForm.classList.toggle('show');
});

inputGoalForm['cancel'].addEventListener('click', function (ev) {
  // hide the add form, show the add new goal button
  addGoalButton.classList.toggle('hide');
  inputGoalForm.classList.toggle('show');
});

/**
 * Clear all shown goals, and display them again from the array
 */
function renderGoals() {

  // clear all html in .goals div
  goalsSection.innerHTML = '';

  for (let i = 0; i < goals.length; i++) {
    goalsSection.innerHTML += `
    <div>
        <a class="goalslink" href="./goalscat.html?name=${goals[i].title}" >${goals[i].title}</a>
        <button class="delegoal" onclick="deleteGoal(${i})">X</button>
      </div>
    `;
  }
  goalCount.innerText = goals.length;
}

function deleteGoal(index) {
  goals.splice(index, 1);

  localStorage.setItem(GOAL_STORAGE_KEY, JSON.stringify(goals));
  
  renderGoals();
}
