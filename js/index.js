'use strict';

//introduce global variables
var parentElement = document.getElementById('newUser');
// var userArray = []
var giveMeUserInfo = localStorage.getItem('userInfo');
// console.log('show me', giveMeUserData);
var parcedLocalStorage = [];

function Player(userName, hogwartsHouse) {
    this.userName = userName;
    this.hogwartsHouse = hogwartsHouse;
    // userArray.push(this);
}

function newUserSubmit(event) {
    event.preventDefault();

  var userName = event.target.userName.value;
  var hogwartsHouse = event.target.hogwartsHouse.value;
  console.log('user input', userName, hogwartsHouse);
  var newUserInfo = new Player(userName, hogwartsHouse);
  console.log('info received from form', newUserInfo);
  var userString = JSON.stringify(newUserInfo);
  localStorage.setItem('userInfo', userString);

  // Simulate an HTTP redirect:
  window.location.replace("../pages/narrative.html");
}

parentElement.addEventListener('submit', newUserSubmit);

var parcedUserInfo = JSON.parse(giveMeUserInfo);
console.log('parsed info', parcedUserInfo);
parcedLocalStorage.push(parcedUserInfo);
