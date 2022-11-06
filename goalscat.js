const goalTitle = document.getElementById('goal-title');
const addsubGoalButton = document.getElementById('add-subgoal');
const inputsubGoalForm = document.getElementById('input-subgoal');
const subgoalsSection = document.getElementById('subgoals');

const GOAL_STORAGE_KEY = "goals";

/**
 * @typedef {Object} Goal 
 * @property {String} title The title of the goal
 * @property {String[]} subGoals The sub goals of the goal
 */
/** @type {Goal}*/
let currentGoal = {};

window.addEventListener('load', function (ev) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  let goal = params['name'];
  goalTitle.innerText = goal;

  let dataFromLocalStorage = localStorage.getItem(GOAL_STORAGE_KEY);
  if (!dataFromLocalStorage) {
    alert("No goal data!");
    location.href = './goals.html';
  }

  let allGoals = JSON.parse(dataFromLocalStorage);
  currentGoal = allGoals.filter(item => item.title == goal)[0];

  if (!currentGoal) {
    alert(`Goal ${goal} does not exist! Please create it first.`);
    location.href = './goals.html';
  }
  renderSubgoals(); 
});
//-----------------------------------------------

//#region Goal

//#endregion Goal


addsubGoalButton.addEventListener('click', function (ev) {
  // hide the add new goal button, show the add form
  addsubGoalButton.classList.toggle('hide');
  inputsubGoalForm.classList.toggle('show');
});

inputsubGoalForm.addEventListener('submit', function (ev) {
  ev.preventDefault(); 
  let subgoalText = inputsubGoalForm['goal'].value.trim();

  // string is null or empty
  if (!subgoalText) {
    alert('subgoal cannot be empty!');
    return;
  }

  let subGoal = currentGoal.subGoals.filter(item => item == subgoalText)[0];
  if (!subGoal) {
    currentGoal.subGoals.push(subgoalText);
  } else {
    alert("Subgoal already exist!");
    return;
  }

  let dataFromLocalStorage = localStorage.getItem(GOAL_STORAGE_KEY);
  let allGoals = JSON.parse(dataFromLocalStorage);
  allGoals.filter(item => item.title == currentGoal.title)[0].subGoals = currentGoal.subGoals;
  localStorage.setItem(GOAL_STORAGE_KEY, JSON.stringify(allGoals));

  renderSubgoals();
  addsubGoalButton.classList.toggle('hide');
  inputsubGoalForm.classList.toggle('show');

  
});

inputsubGoalForm['cancel'].addEventListener('click', function (ev) {
  // hide the add form, show the add new goal button
  addsubGoalButton.classList.toggle('hide');
  inputsubGoalForm.classList.toggle('show');
});

function renderSubgoals() {
  subgoalsSection.innerHTML = '';
  for (let i = 0; i < currentGoal.subGoals.length; i++) {
    subgoalsSection.innerHTML += `
    <div>
        <span>- ${currentGoal.subGoals[i]}</span>
        <button class="delegoal" onclick="deleteSubGoal(${i})">X</button>
      </div>
    `;
  }
}

function deleteSubGoal(index) {
  currentGoal.subGoals.splice(index, 1);

  let dataFromLocalStorage = localStorage.getItem(GOAL_STORAGE_KEY);
  let allGoals = JSON.parse(dataFromLocalStorage);
  allGoals.filter(item => item.title == currentGoal.title)[0].subGoals = currentGoal.subGoals;
  localStorage.setItem(GOAL_STORAGE_KEY, JSON.stringify(allGoals));

  renderSubgoals();
}
