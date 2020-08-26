'use strict';

//TODO add background image to line 12 of the html file
// create text in html or in javascript that renders form to appear on quest parchement.
// create radio buttons in html or javascript that direct the player to the 4 location sites
// we might want to create pull over the function- from the one of the location.js files that checks for the inventory being full to change the senario to our finale. In which case we need to have rendered our form in javascript. 
// attach a listener to the submit button the does the window thing we did on the home page that assigns a target location depending on what area they want to visit
// maybe we want the parchment to say the players name and be more interactive... like "hello 'sara', you have found '2' items but you still have '2' to look for. Where would you like to visit next?" I think that would be cool!



// retrieves user info at newPlayer.key
newPlayer = JSON.parse(localStorage.getItem('userInfo'));
let lavatoryParent = document.getElementById('lavatory-form');
let itemWebbing = newPlayer.webbing;
let itemCandle = newPlayer.candle;
let itemButterbeer = newPlayer.butterbeer;
let itemFeather = newPlayer.pheonixFeather;
let locationArray = [['diagon-alley', 'Search Diagon Alley'], ['forbidden-forest', 'Explore the Forbidden Forest'], ['headmaster-office', 'Investigate the Headmaster\'s Office'], ['hogsmeade', 'Take a Trip to Hogsmeade']];

function newStoryArc() {
    let h2element = document.createElement('h2');
    h2element.textContent = `A Pig in Red Glasses!`;
    lavatoryParent.appendChild(h2element);
    let brElement = document.createElement('br');
    let pElement = document.createElement('p');
    pElement.textContent = `Upon arriving to the bathroom, you call out for Esmeralda and all you hear is scuttling and snorting. Upon investigating the noise, you open the bathroom stall door and see what appears to be a hideous pig wearing red glasses…that talks!!`
    lavatoryParent.appendChild(pElement);
    lavatoryParent.appendChild(brElement);
    let pElementTwo = document.createElement('p');
    pElementTwo.textContent = `It\’s your friend Esmeralda!! She scuttles right up to you and begs for help. She had attempted to place a beautification spell on herself which backfired and turned her into a pig. Knowing that your class finals are today, you need a solution and fast! If not, she will have to be absent and fail all of her exams and not get into 301!`
    lavatoryParent.appendChild(pElementTwo);
    lavatoryParent.appendChild(brElement);
    let pElementThree = document.createElement('p');
    pElementThree.textContent = `Being an amazingly gifted potion student, you know of a potion that could cure her horrible state. However, the ingredients will be rather difficult to collect; you will have to search the school and surrounding areas if you hope to gather them in time. Your potion will require 8 drops of wax from a poisonous candle, an ounce of butterbeer, exactly five inches of Acromantula webbing and a phoenix feather. You are Esmeralda\’s only hope of making it to her exams so she can graduate to 301 so you better get started.`
    lavatoryParent.appendChild(pElementThree);
}

function continueStoryNeedMore() {
    let itemCounter = 0;
    let totalItems = 4;

    if (itemWebbing === true) {
        itemCounter++;
    }
    if (itemCandle === true) {
        itemCounter++;
    }
    if (itemButterbeer === true) {
        itemCounter++;
    }
    if (itemFeather === true) {
        itemCounter++;
    }
    let totalItemsNeeded = (totalItems - itemCounter);

    let h2element = document.createElement('h2');
    h2element.textContent = `Welcome back ${name}!`;
    lavatoryParent.appendChild(h2element);
    let pElement = document.createElement('p');
    pElement.textContent = `It's time to continue the search!! You have ${itemCounter} items so far, with ${totalItemsNeeded} to go. Where would you like to search next?`
    lavatoryParent.appendChild(pElement);
}

function itemsComplete() {
    let h2element = document.createElement('h2');
    h2element.textContent = `You did it ${name}!`;
    lavatoryParent.appendChild(h2element);
    let pElement = document.createElement('p');
    pElement.textContent = `Fill at a later time...`
    lavatoryParent.appendChild(pElement);
}

function createRadioButtons(outerIndex) {
    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'radio');
    inputElement.setAttribute('name', 'locationButton');
    inputElement.setAttribute('value', locationArray[outerIndex][0]);
    inputElement.setAttribute('checked', 'true');
    inputElement.setAttribute('class', 'radioButton')
    lavatoryParent.appendChild(inputElement);
    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', locationArray[outerIndex][0]);
    labelElement.textContent = locationArray[outerIndex][1];
    lavatoryParent.appendChild(labelElement);
    let brElement = document.createElement('br');
    lavatoryParent.appendChild(brElement);
}

function evaluateForContent() {
//counter for items acquired
//if 0, call newStoryArc = all four buttons
//if 0> and >4, call continueStoryNeedMore = all four buttons
//if ===4, call itemsComplete
    let itemCounter = 0;
    let totalItems = 4;

    if (itemWebbing === true) {
        itemCounter++;
    }
    if (itemCandle === true) {
        itemCounter++;
    }
    if (itemButterbeer === true) {
        itemCounter++;
    }
    if (itemFeather === true) {
        itemCounter++;
    }

    if (itemCounter === 0) {
        newStoryArc();
        createRadioButtons(0);
        createRadioButtons(1);
        createRadioButtons(2);
        createRadioButtons(3);
    } else if (itemCounter > 0 && itemCounter < 4) {
        continueStoryNeedMore();
        createRadioButtons(0);
        createRadioButtons(1);
        createRadioButtons(2);
        createRadioButtons(3);
    } else if (itemCounter === 4) {
        itemsComplete();
    }
}

function storyTransition(event) {
    event.preventDefault();
    let radioButtonArray = document.getElementsByClassName('radioButton');

    for (let i = 0; i < radioButtonArray.length; i++) {
        if (radioButtonArray[i].checked) {
            window.location.replace(`../pages/${locationArray[i][0]}.html`);
        }
    }
}


checkLocalStorageToFillInventory();
evaluateForContent();


  
listener.addEventListener('submit', storyTransition);