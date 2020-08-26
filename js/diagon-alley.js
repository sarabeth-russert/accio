'use strict';

//DIAGON ALLEY APP

//TODO objects for the Diagon alley
let locationFeatureArray = [leakyCauldron, flourishBlots, slugJig, floreanFortescue, giantSpiders, poisonousCandles];

let finalFeature = locationFeatureArray[locationFeatureArray.length - 1];

function itemAlreadyAquiredMessage() {
  let storedPlayer = JSON.parse(localStorage.getItem('userInfo'));
  if (storedPlayer.candle === true) {
    listener.innerHTML = '';
    let titleElement = document.createElement('h2');
    titleElement.textContent = locationFeatureArray[0].title;
    listener.appendChild(titleElement);
    let dialogueBody = document.createElement('p');
    dialogueBody.textContent = 'You better get out of here before that shop keeper comes looking for you';
    listener.appendChild(dialogueBody);
    let aElement = document.createElement('a');
    aElement.setAttribute('href', 'lavatory.html');
    aElement.textContent = 'Return to the Lavatory';
    listener.appendChild(aElement);
  } else {
    renderFormLocationFeature(locationFeatureArray[0]);
    checkLocalStorageToFillInventory();
  }
}
itemAlreadyAquiredMessage();


listener.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let nextLocationName;
  let nextLocationObject;
  let optionChoices = document.getElementsByClassName('radioChoice');

  for (let i = 0; i < optionChoices.length; i++) {
    if (optionChoices[i].checked) {
      nextLocationName = optionChoices[i].value;
      if (nextLocationName === 'home') {
        window.location.replace("../pages/lavatory.html");
      }
    }
  }

  for (let i = 0; i < locationFeatureArray.length; i++) {
    if (nextLocationName === locationFeatureArray[i].id) {
      if (locationFeatureArray[i] === locationFeatureArray[locationFeatureArray.length - 1]) {
        nextLocationObject = locationFeatureArray[i];
        listener.removeEventListener('submit', handleSubmit);
        questionForm.innerHTML = '';
        listener.innerHTML = '';
        console.log(nextLocationObject);
        renderFormObjectLocationFeature(nextLocationObject);
      } else {
        nextLocationObject = locationFeatureArray[i];
        questionForm.innerHTML = '';
        renderFormLocationFeature(nextLocationObject);
      }
    }
  }
}