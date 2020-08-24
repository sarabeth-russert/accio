'use strict';

let playerIntake = document.getElementById(''); //from initital intake form
let questionForm = document.getElementById(''); //id for the question form

// function to take in the results of the form asking the name and what house they are in

function Player(name, house) {
  this.name = name;
  this.house = house; // could assign a default house if the player doesn't know
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

function ObjectLocationFeature(id, title, dialogue, question, answer) {
  this.id = id;
  this.title = title;
  this.dialogue = dialogue;
  this.question = question;
  this.answer = answer;
}


// how a question form would run, parent function has a variable formLocationFeature
function renderQuestionOption(optionNumber) {
  let inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'radio');
  inputElement.setAttribute('value', formLocationFeatureVariable.optionNumber[1]);
  input.setAttribute('name', formLocationFeatureVariable.title);
  input.setAttribute('checked', 'checked');
  input.textContent = formLocationFeatureVariable.optionNumber[0];
  //parent.appendChild(input);
}


//renders the main form to the page takes in which location object the player is at.
function renderFormLocationFeature(locationFeatureObject){
  let formLocationFeatureVariable = locationFeatureObject;
  let titleElement = document.createElement('h2');
  titleElement.textContent = formLocationFeatureVariable.title;
  //append to parent if we like the element I am storing it in
  let dialogueBody = document.createElement('p');
  dialogueBody.textContent = formLocationFeatureVariable.dialogue;
  // append to parent if we like the element
  renderQuestionOption(option1);
  renderQuestionOption(option2);
  renderQuestionOption(option3);
  renderQuestionOption(option4);
}



// submit handler function: increments product clicks if the item was selected. Clears out the voting pane and adds three new images to be voted on. Once the voting session is complete clears out the voting pane and changes the greeter. Renders the data table and charts and turns off the event listener. Stores local data.

function handleSubmit(event) {
  event.preventDefault();
  let optionChoice = event.target.input.value; //should be the variable for the next location to visit
  //will have to figure out a solution for when they answer the final question like
  //if (optionChoice === 'spider') or something like that... not sure yet may have to handle the last event differently
  //clear out form
  //parentElement.innerHTML = '';
  renderFormLocationFeature(optionChoice);
}


//FORBIDDEN FOREST APP
//checks local storage for webbing, if webbing then tells player you have already searched the forbidden forest.
//if not webbing is found 
//renderFormLocationFeature(hagridsHut);
//objects for the forbidden forest page
let hagridsHut = new LocationFeature('hagridsHut', 'Hagrid\'s hut', 'Deciding that the Forbidden Forrest might be the best place to start you and Esmeralda carefully make your way down to the back of Hagrid\’s hut and peer into the dark forrest. It\’s off limits to students for a reason but you decide to take your chances. What\’s the worst that could happen? The path ahead of you forks into three directions rather quickly. Which way will you go?', ['You see some hoof prints off to the right. Should you follow them?', 'centaurFirenze'], ['Boldly forward is always a great way to start. Go straight ahead.', 'bowtruckleTree'], ['Esmeralda is sniffing off to the right… maybe she is just hunting for truffles though? Follow Esmeralda.', 'hippogryphFlight'], ['Return to the second floor girls lavatory', 'home']);

let centaurFirenze = new LocationFeature('centaurFirenze', 'The Stargazer', 'The forest is very dark so you have to look hard to see the hoof prints. Barely looking up you track them for what seems like 800 meters before bumping in to something very solid and not so gracefully falling on the ground. As you begin to look up you see hooves, then legs, then a torso and a face crowned by long white-blonde hair. You have heard there is only one Centaur on the grounds with such astonishingly blue eyes and know this must be Firenze! You tell him about Esmeralda and that you are on a quest for potion ingredients. He replies \“One might look to the stars. The Caelregio Araneus holds the key to what you seek.\” You\’ve heard Centaurs could be vague, but what in the world is he talking about?? \“uh thanks Firenze, I think\” you reply.', ['Go back the way you came and hang a left, maybe Esmeralda was on to something.', 'hippogryphFlight'], ['Head farther down the path, it looks like it gently curves to the left.', 'bowtruckleTree'], ['Return to Hagrid\'s Hut', 'hagridsHut'], ['Return to the second floor girls lavatory', 'home']);

let bowtruckleTree = new LocationFeature('bowtruckleTree', 'The Tallest Tree', 'Up ahead you see a huge tree with some low hanging branches. You decide if you climb the tree you might get a better look around. You start your ascent and are immediately attacked by at least 20 bowtruckles. Their sticklike limbs are scratching your arms and face and you don’t have any woodlice to appease them! Seems like this was a bad decision so you jump to the ground and shake them off. Esmeralda eats one and the rest climb back up the tree before she can catch them.', ['Head to the right, you need to get away from these bowtruckles fast!', 'centaurFirenze'], ['Esmarelda wanted to go left and at least right now you should trust her nose', 'hippogryphFlight'], ['Return to Hagrid\'s Hut', 'hagridsHut'], ['Return to the second floor girls lavatory', 'home']);

let hippogryphFlight = new LocationFeature('hippogryphFlight', 'Hooves and Claws', 'To the left you see a horse, only it\’s not a horse, it has the head, torso, and front legs of an eagle. It is a Hippogryph! You\’ve learned about Hippogryphs in your care of magical creatures class so you approach it and bow. You wait anxiously to see if he will accept your greeting, Esmeralda hides behind your legs… clearly she doesn\’t want to be the first one eaten if the Hippogryph takes umbrage with you. He bows back! Now you think you might be able to take a ride to look around. You climb on his back and wave at Esmeralda as you take off! The ride is exhilarating! You mostly see tree-tops but off to the north you see a car… This would go a lot faster with wheels! The Hippogryph comes back to the ground very close to where you took off and Esmeralda comes squealing up besides you, obviously jealous that she didn’t get to go. You know you want to find that car but now that you are on the ground it is hard to tell which way is north.', ['Go left… that might be north', 'weasleyCar'], ['Or was it right? ', 'bowtruckleTree'], ['Return to Hagrid\'s Hut', 'hagridsHut'], ['Return to the second floor girls lavatory', 'home']);

let weasleyCar = new LocationFeature('weasleyCar', 'A Flying Car?!', 'You take your best guess on which direction is north and start walking with Esmeralda trotting along side. Eventually you came to a clearing and see a giant pile of debris with a bumper… You start pulling branches away from the bumper and discover a light blue Ford Anglia! Finally you can make some headway! You get in the car and Esmeralda hops over you into the passenger seat. You pull out your wand and try a few spells to get the car to start but no luck… now what? You\’re feeling frustrated and need a minute to think so you lean back in your seat and stare at the ceiling. All of a sudden you notice the roof of the car is covered in a baby spiders! You and Esmeralda both squeal and go flying out of the broken car.', ['Follow the spiders', 'acromantulaCave'], ['Eww, you hate spiders, go back the way you came', 'hippogryphFlight'], ['Return to Hagrid\'s Hut', 'hagridsHut'], ['Return to the second floor girls lavatory', 'home']);

let acromantulaCave = new ObjectLocationFeature('acromantulaCave', 'The Acromantula Cave', ' Even though you and Esmeralda both fear spiders you know that if you have any hope of getting Acromantula webbing you are going to have to cozy up to some creepy crawlies. You follow the spiders until you see the dark mouth of a cave open up ahead. You don’t want to go in but you know you can\’t take 301 without your best friend… You go in the cave and all you see is hundreds of glittery lights, which as your sight is adjusting to the dark you realize must be the eyes of the biggest spider you have ever seen!! With a trembling voice you address the spider \“excuse me sir, or ma\’am, I really need your help. My friend has been turned into a pig” uh oh, maybe they eat pigs?! “anyway“ you rush on, “I really need some of your web for the potion I am making” The spider is silent for several moments… you start to wonder if he understands English, maybe you should have used gestures? Eventually he replies \“I will give you some of my web but you must answer this riddle.', 'First think of the person who lives in disguise, who deals in secrets and tells naught but lies. Next, tell me what\'s always the last thing to mend, the middle of middle and end of the end? And finally give me the sound often heard, during the search for a hard-to-find word. Now string them together and answer me this, which creature would you be unwilling to kiss?', 'spider');

// maybe dont need... let locationFeatureArray = [hagridsHut, centaurFirenze, bowtruckleTree, hippogryphFlight, weasleyCar, acromantulaCave];


//call when form is ready
//submission.addEventListener('submit', handleSubmit);

// will also need to store any items that are gathered and put them in a div that represents the inventory
