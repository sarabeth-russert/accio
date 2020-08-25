'use strict';

//introduce global variables
var parentElement = document.getElementById('newUser');
var userArray = []
var giveMeUserData = localStorage.getItem('userArray');
console.log('show me', giveMeUserData);
var parcedLocalStorage = [];

function Player(userName, hogwartsHouse) {
    this.userName = userName;
    this.hogwartsHouse = hogwartsHouse;
    userArray.push(this);
}

function newUserSubmit(event) {
    event.preventDefault();

var userName = event.target.userName.value;
var hogwartsHouse = event.target.hogwartsHouse.value;
console.log('user input', userName, hogwartsHouse);
var newUserInfo = new Player(userName, hogwartsHouse);
console.log('info received from form', newUserInfo);

}

parentElement.addEventListener('submit', newUserSubmit);

var jsonArray = JSON.stringify(userArray);
localStorage.setItem('userArray', jsonArray);


{/* <form id="newUser">
<fieldset>
    <label>Name
      <input name="userName" type="text" />
    </label>
    <label>Hogwarts House
      <select id="hogwartsHouse" name="What's your House?">
        <option value="gryffindor">Gryffindor</option>
        <option value="hufflepuff">Hufflepuff</option>
        <option value="ravenclaw">Ravenclaw</option>
        <option value="slytherin">Slytherin</option>
      </select>
    </label>
      <p>What character do you most identify with:</p>
        <input type="radio" id="wizard" name="character" value="wizard">
        <label for="wizard">Wizard</label><br>
        <input type="radio" id="witch" name="character" value="witch">
        <label for="witch">Witch</label><br>
        <input type="radio" id="nbSpellcaster" name="character" value="nbSpellcaster">
        <label for="nbSpellcaster">NB Spellcaster</label><br>
    <button type="submit">Submit</button>
</fieldset>
</form> */}