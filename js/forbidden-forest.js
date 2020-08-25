'use strict';

//FORBIDDEN FOREST APP
//checks local storage for webbing, if webbing then tells player you have already searched the forbidden forest.
//if not webbing is found
//objects for the forbidden forest page
let locationFeatureArray = [hagridsHut, centaurFirenze, bowtruckleTree, hippogryphFlight, weasleyCar, acromantulaCave];

let finalFeature = locationFeatureArray[locationFeatureArray.length - 1];

function itemAlreadyAquiredMessage() {
  let storedPlayer = JSON.parse(localStorage.getItem('player'));
  if (storedPlayer.webbing === true) {
    listener.innerHTML = '';
    let titleElement = document.createElement('h2');
    titleElement.textContent = locationFeatureArray[0].title;
    listener.appendChild(titleElement);
    let dialogueBody = document.createElement('p');
    dialogueBody.textContent = 'You have already found all that the forest offers. Try searching in other areas for more items.';
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

