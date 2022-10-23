// questions array
const questions = [
  { question: 'Enter Your First Name' },
  { question: 'Enter Your Last Name' },
  { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
  { question: 'Create a Password', type: 'password' }
];

// transition times
const shakeTime = 100;
const switchTime = 200;

// init pos at first question
let position = 0;

// init DOM elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');




const answers = [];
console.log(answers);

// EVENTS

//  get question on DOM load
document.addEventListener('DOMContentLoaded', getQuestion);

// next button click
nextBtn.addEventListener('click', validate);

// input field enter click
inputField.addEventListener('keyup', e => {
  // if we hit enter
  if (e.keyCode == 13) {
    validate();
  }
});

// FUNCTIONS

// get question from array and add to markup
function getQuestion() {
  // get current question
  inputLabel.innerHTML = questions[position].question;
  // get current type using OR
  inputField.type = questions[position].type || 'text';
  // get current answer using OR
  const answer = inputField.value = questions[position].answer || '';
  answers.push(answer);
  // focus on element using focus method
  inputField.focus();
  // set progress bar width - variable to the questions length
  progress.style.width = (position * 100) / questions.length + '%';
  // add user icon or back arrow depending on question
  // using ternary operator. if the position is not zero (its truthy), we want the arrow, else, we want the user icon
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

// display question to user
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

// hide question from user
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// validate field
function validate() {
  // make sure pattern matches if there is one
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// field input fail
function inputFail() {
  formBox.className = 'error';
  // repeat shake motion - set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

// field input pass
function inputPass() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);
  // store answer in array
  questions[position].answer = inputField.value;
  // increment position
  position++;
  // if new question, hide current and get next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // remove if no more questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';
    // form complete
    formComplete();
  }
}

// all fields complete - show h1 end
function formComplete() {
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer}. You are registered and will get an email shortly`));
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}




// // Leet code problem.

// const nums = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
//   22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
// ];
// const target = 20;


// function twoSum(nums, target) {
//   let vals = {}; 

//   for (let i = 0; i < nums.length; i++) { 
//     if (target - nums[i] in vals) {
//       return [vals[target-nums[i]], i];
//     } else {
//       vals[nums[i]] = i;
//     }
//   }
//   return [];
// };


// function furtherTwoSum(target, nums){
//    let vals = {};

//    for(let i = 0; i < nums.length; i++){
//      if(target - vals[i] in vals){
//       return [vals[target - nums[i]], i]
//      }
//      else{
//       vals[nums[i]] = i
//      }
//    }

//    return [];
// }

// console.log(furtherTwoSum(target, nums));



