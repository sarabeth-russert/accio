'use strict';

// add a background to the html...
// add text to the html
// add a listener to the JS that redirects to the lavatory.html page when the player clicks it
// could also render the story in javascript so it takes in the players name to return 'Sara, you wake up in the Gryffindor dormatory to the sound of moaning myrtle...' or whatever.

// retrieves user info at newPlayer.key
newPlayer = JSON.parse(localStorage.getItem('userInfo'));
let narrativeForm = document.getElementById('narrative');
let name = newPlayer.userName;
let house = newPlayer.hogwartsHouse;

function renderStory() {
    let h2element = document.createElement('h2');
    h2element.textContent = `Good morning ${name}!`;
    narrativeForm.appendChild(h2element);
    let brElement = document.createElement('br');
    let pElement = document.createElement('p');
    pElement.textContent = `You are abruptly woken on the morning of your final exam in the ${house} dormitory by Moaning Myrtle. She obnoxiously informs you that you urgently needed to retrieve your friend Esmeralda from the second-floor girls\’ lavatory. As Myrtle floats away, you hear her mutter \“I want that swine out of my bathroom…\”.`
    narrativeForm.appendChild(pElement);
    narrativeForm.appendChild(brElement);
}

function continueStory(event) {
    event.preventDefault();
    window.location.replace("../pages/lavatory.html");
  }
  
  listener.addEventListener('submit', continueStory);

  renderStory();