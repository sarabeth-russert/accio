'use strict';

const listener = document.getElementById('listener');
let questionForm = document.getElementById('forbidden-forest');
const inventoryDiv = document.getElementById('userInventory');

//this will go on splash page
//let playerIntake = document.getElementById('');

//a holder for local storage until homepage is made
let newPlayer = new Player('Sara', 'Ravenclaw');
//newPlayer.webbing = true;
storeLocalData();

//function gets items from local storage and puts them in the populateInventory function
function checkLocalStorageToFillInventory() {
  let storedPlayer = JSON.parse(localStorage.getItem('player'));
  populateInventory(storedPlayer);
}

// stores all object data aquired
function storeLocalData() {
  let stringifyObject = JSON.stringify(newPlayer);
  localStorage.setItem('player', stringifyObject);
}

// function to fill the user inventory container with items collected
function populateInventory(storedPlayer) {
  if (storedPlayer.webbing === true) {
    let pElement = document.createElement('p');
    pElement.setAttribute('class', 'inventoryItem');
    pElement.textContent = 'five inches of Acromantula Webbing';
    inventoryDiv.appendChild(pElement);
  }
  if (storedPlayer.butterbeer === true) {
    let pElement = document.createElement('p');
    pElement.setAttribute('class', 'inventoryItem');
    pElement.textContent = 'one ounce of Butterbeer';
    inventoryDiv.appendChild(pElement);
  }
  if (storedPlayer.candleWax === true) {
    let pElement = document.createElement('p');
    pElement.setAttribute('class', 'inventoryItem');
    pElement.textContent = 'eight drops of wax from a Poisonous Candle';
    inventoryDiv.appendChild(pElement);
  }
  if (storedPlayer.pheonixFeather === true) {
    let pElement = document.createElement('p');
    pElement.setAttribute('class', 'inventoryItem');
    pElement.textContent = 'one Pheonix Feather';
    inventoryDiv.appendChild(pElement);
  }
}

// function to take in the results of the form asking the name and what house they are in

function Player(name, house) {
  this.name = name;
  this.house = house;
  // could assign a default house if the player doesn't know
  this.webbing = false;
  this.butterbeer = true;
  this.candleWax = true;
  this.pheonixFeather = false;
}

// constructor for locations features
function LocationFeature(id, title, dialogue, option1, option2, option3, option4) {
  this.id = id;
  this.title = title;
  this.dialogue = dialogue;
  this.option1 = option1;
  this.option2 = option2;
  this.option3 = option3;
  this.option4 = option4;
}

// constuctor for final location features where you get the object
function ObjectLocationFeature(id, title, dialogue, question, answer, objectRetrievalDialogue, objectID, objectImagePathway) {
  this.id = id;
  this.title = title;
  this.dialogue = dialogue;
  this.question = question;
  this.answer = answer;
  this.objectRetrievalDialogue = objectRetrievalDialogue;
  this.objectID = objectID;
  this.objectImagePathway = objectImagePathway;
}


// creates radio buttons linked to locationFeature options
function renderQuestionOption(object, optionNumber) {
  let inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'radio');
  inputElement.setAttribute('class', 'radioChoice');
  inputElement.setAttribute('value', optionNumber[1]);
  inputElement.setAttribute('name', object.title);
  inputElement.setAttribute('checked', 'checked');
  questionForm.appendChild(inputElement);
  let labelElement = document.createElement('label');
  labelElement.setAttribute('for', optionNumber);
  labelElement.textContent = optionNumber[0];
  questionForm.appendChild(labelElement);
}


//renders the main form to the page takes in which location object the player is at.
function renderFormLocationFeature(locationFeatureObject){
  let formLocationFeatureVariable = locationFeatureObject;
  let titleElement = document.createElement('h2');
  titleElement.textContent = formLocationFeatureVariable.title;
  questionForm.appendChild(titleElement);
  let dialogueBody = document.createElement('p');
  dialogueBody.textContent = formLocationFeatureVariable.dialogue;
  questionForm.appendChild(dialogueBody);
  renderQuestionOption(formLocationFeatureVariable ,formLocationFeatureVariable.option1);
  renderQuestionOption(formLocationFeatureVariable, formLocationFeatureVariable.option2);
  renderQuestionOption(formLocationFeatureVariable, formLocationFeatureVariable.option3);
  renderQuestionOption(formLocationFeatureVariable, formLocationFeatureVariable.option4);
}

// verifies that the answer the player gives at the final location feature is true and if so puts the item in the local storage and returns them to the lavatory
function verifyAnswer(event) {
  if (finalFeature.answer === event.target.value.toLowerCase()) {
    newPlayer.webbing = true;
    storeLocalData();
    listener.innerHTML = '';
    let titleElement = document.createElement('h2');
    titleElement.textContent = finalFeature.title;
    listener.appendChild(titleElement);
    let dialogueBody = document.createElement('p');
    dialogueBody.textContent = finalFeature.objectRetrievalDialogue;
    listener.appendChild(dialogueBody);
    let aElement = document.createElement('a');
    aElement.setAttribute('href', 'lavatory.html');
    listener.appendChild(aElement);
    let objectImage = document.createElement('img');
    // change to finalFeature.objectImagePathway as src
    objectImage.setAttribute('src', 'https://cdn4.vectorstock.com/i/1000x1000/91/58/round-spider-web-cobweb-vector-24799158.jpg');
    aElement.appendChild(objectImage);


  }
}

// renders the final location feature to the page
function renderFormObjectLocationFeature(locationFeatureObject){
  let formLocationFeatureVariable = locationFeatureObject;
  let titleElement = document.createElement('h2');
  titleElement.textContent = formLocationFeatureVariable.title;
  listener.appendChild(titleElement);
  let dialogueBody = document.createElement('p');
  dialogueBody.textContent = formLocationFeatureVariable.dialogue;
  listener.appendChild(dialogueBody);
  let labelElement = document.createElement('label');
  labelElement.setAttribute('for', 'answer');
  labelElement.textContent = formLocationFeatureVariable.question;
  listener.appendChild(labelElement);
  let inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'text');
  inputElement.setAttribute('value', '');
  inputElement.setAttribute('name', 'answer');
  listener.appendChild(inputElement);
  inputElement.addEventListener('input', verifyAnswer);
}


// forbidden forrest location features
let hagridsHut = new LocationFeature('hagridsHut', 'Hagrid\'s hut', 'Deciding that the Forbidden Forrest might be the best place to start you and Esmeralda carefully make your way down to the back of Hagrid\’s hut and peer into the dark forrest. It\’s off limits to students for a reason but you decide to take your chances. What\’s the worst that could happen? The path ahead of you forks into three directions rather quickly. Which way will you go?', ['Esmeralda is sniffing off to the right… maybe she is just hunting for truffles though? Follow Esmeralda.', 'hippogryphFlight'], ['You see some hoof prints off to the right. Should you follow them?', 'centaurFirenze'], ['Boldly forward is always a great way to start. Go straight ahead.', 'bowtruckleTree'], ['Return to the second floor girls lavatory', 'home']);

let centaurFirenze = new LocationFeature('centaurFirenze', 'The Stargazer', 'The forest is very dark so you have to look hard to see the hoof prints. Barely looking up you track them for what seems like 800 meters before bumping in to something very solid and not so gracefully falling on the ground. As you begin to look up you see hooves, then legs, then a torso and a face crowned by long white-blonde hair. You have heard there is only one Centaur on the grounds with such astonishingly blue eyes and know this must be Firenze! You tell him about Esmeralda and that you are on a quest for potion ingredients. He replies \“One might look to the stars. The Caelregio Araneus holds the key to what you seek.\” You\’ve heard Centaurs could be vague, but what in the world is he talking about?? \“uh thanks Firenze, I think\” you reply.', ['Go back the way you came and hang a left, maybe Esmeralda was on to something.', 'hippogryphFlight'], ['Head farther down the path, it looks like it gently curves to the left.', 'bowtruckleTree'], ['Return to Hagrid\'s Hut', 'hagridsHut'], ['Return to the second floor girls lavatory', 'home']);

let bowtruckleTree = new LocationFeature('bowtruckleTree', 'The Tallest Tree', 'Up ahead you see a huge tree with some low hanging branches. You decide if you climb the tree you might get a better look around. You start your ascent and are immediately attacked by at least 20 bowtruckles. Their sticklike limbs are scratching your arms and face and you don’t have any woodlice to appease them! Seems like this was a bad decision so you jump to the ground and shake them off. Esmeralda eats one and the rest climb back up the tree before she can catch them.', ['Head to the right, you need to get away from these bowtruckles fast!', 'centaurFirenze'], ['Esmarelda wanted to go left and at least right now you should trust her nose', 'hippogryphFlight'], ['Return to Hagrid\'s Hut', 'hagridsHut'], ['Return to the second floor girls lavatory', 'home']);

let hippogryphFlight = new LocationFeature('hippogryphFlight', 'Hooves and Claws', 'To the left you see a horse, only it\’s not a horse, it has the head, torso, and front legs of an eagle. It is a Hippogryph! You\’ve learned about Hippogryphs in your care of magical creatures class so you approach it and bow. You wait anxiously to see if he will accept your greeting, Esmeralda hides behind your legs… clearly she doesn\’t want to be the first one eaten if the Hippogryph takes umbrage with you. He bows back! Now you think you might be able to take a ride to look around. You climb on his back and wave at Esmeralda as you take off! The ride is exhilarating! You mostly see tree-tops but off to the north you see a car… This would go a lot faster with wheels! The Hippogryph comes back to the ground very close to where you took off and Esmeralda comes squealing up besides you, obviously jealous that she didn’t get to go. You know you want to find that car but now that you are on the ground it is hard to tell which way is north.', ['Go left… that might be north', 'weasleyCar'], ['Or was it right? ', 'bowtruckleTree'], ['Return to Hagrid\'s Hut', 'hagridsHut'], ['Return to the second floor girls lavatory', 'home']);

let weasleyCar = new LocationFeature('weasleyCar', 'A Flying Car?!', 'You take your best guess on which direction is north and start walking with Esmeralda trotting along side. Eventually you came to a clearing and see a giant pile of debris with a bumper… You start pulling branches away from the bumper and discover a light blue Ford Anglia! Finally you can make some headway! You get in the car and Esmeralda hops over you into the passenger seat. You pull out your wand and try a few spells to get the car to start but no luck… now what? You\’re feeling frustrated and need a minute to think so you lean back in your seat and stare at the ceiling. All of a sudden you notice the roof of the car is covered in a baby spiders! You and Esmeralda both squeal and go flying out of the broken car.', ['Eww, you hate spiders, go back the way you came', 'hippogryphFlight'], ['Follow the spiders', 'acromantulaCave'], ['Return to Hagrid\'s Hut', 'hagridsHut'], ['Return to the second floor girls lavatory', 'home']);

let acromantulaCave = new ObjectLocationFeature('acromantulaCave', 'The Acromantula Cave', ' Even though you and Esmeralda both fear spiders you know that if you have any hope of getting Acromantula webbing you are going to have to cozy up to some creepy crawlies. You follow the spiders until you see the dark mouth of a cave open up ahead. You don’t want to go in but you know you can\’t take 301 without your best friend… You go in the cave and all you see is hundreds of glittery lights, which as your sight is adjusting to the dark you realize must be the eyes of the biggest spider you have ever seen!! With a trembling voice you address the spider \“excuse me sir, or ma\’am, I really need your help. My friend has been turned into a pig” uh oh, maybe they eat pigs?! “anyway“ you rush on, “I really need some of your web for the potion I am making” The spider is silent for several moments… you start to wonder if he understands English, maybe you should have used gestures? Eventually he replies \“I will give you some of my web but you must answer this riddle.\"', 'First think of the person who lives in disguise, who deals in secrets and tells naught but lies. Next, tell me what\'s always the last thing to mend, the middle of middle and end of the end? And finally give me the sound often heard, during the search for a hard-to-find word. Now string them together and answer me this, which creature would you be unwilling to kiss?', 'spider', '\"You have solved my riddle, you may have my webbing. Do not come into my cave again.\" The spider says in a serious tone. You snatch up the webbing and you and Esmeralda head straight back to the castle.', 'webbing');

//diagon-alley location features

//headmasters office location features

//hogsmeade location features




