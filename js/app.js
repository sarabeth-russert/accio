'use strict';

//introduce global variables
var parentElement = document.getElementById('newUser');

const listener = document.getElementById('listener');
let questionForm = document.getElementById('inner-form');
const inventoryDiv = document.getElementById('userInventory');

function Player(userName, hogwartsHouse) {
  this.userName = userName;
  this.hogwartsHouse = hogwartsHouse;
  this.webbing = false;
  this.candle = false;
  this.pheonixFeather = false;
  this.butterbeer = false;
  // userArray.push(this);
}

//holds the current player
let newPlayer = JSON.parse(localStorage.getItem('userInfo'));

//function gets items from local storage and puts them in the populateInventory function
function checkLocalStorageToFillInventory() {
  let storedPlayer = newPlayer;
  populateInventory(storedPlayer);
  renderInventoryParchment(storedPlayer);
}

// stores all object data aquired
function storeLocalData() {
  let stringifyObject = JSON.stringify(newPlayer);
  localStorage.setItem('userInfo', stringifyObject);
}

function renderInventoryParchment(storedPlayer) {
  let parchmentParent = document.getElementById('userInventory');
  let inventoryParchmentID = document.getElementById('inventory-list');
  if (storedPlayer.hogwartsHouse === 'gryffindor') {
    inventoryParchmentID.setAttribute('src', '../img/inventorylistgryffindor.png');
  }
  if (storedPlayer.hogwartsHouse === 'hufflepuff') {
    inventoryParchmentID.setAttribute('src', '../img/inventorylisthufflepuff.png');
  }
  if (storedPlayer.hogwartsHouse === 'ravenclaw') {
    inventoryParchmentID.setAttribute('src', '../img/inventorylistravenclaw.png');
  }
  if (storedPlayer.hogwartsHouse === 'slytherin') {
    inventoryParchmentID.setAttribute('src', '../img/inventorylistslytherin.png');
  }
  parchmentParent.appendChild(inventoryParchmentID);

}

// function to fill the user inventory container with items collected
function populateInventory(storedPlayer) {
  let divForAllPElements = document.createElement('div');
  divForAllPElements.setAttribute('id', 'inventory-list-box');
  inventoryDiv.appendChild(divForAllPElements);

  let pElementWebbing = document.createElement('p');
  pElementWebbing.setAttribute('class', 'inventoryItem');
  pElementWebbing.textContent = '5 inches of Acromantula Webbing';
  divForAllPElements.appendChild(pElementWebbing);
  if (storedPlayer.webbing === true) {
    pElementWebbing.setAttribute('class', 'cross-out');
    divForAllPElements.appendChild(pElementWebbing);
  }

  let pElementButterbeer = document.createElement('p');
  pElementButterbeer.setAttribute('class', 'inventoryItem');
  pElementButterbeer.textContent = '1 ounce of Butterbeer';
  divForAllPElements.appendChild(pElementButterbeer);
  if (storedPlayer.butterbeer === true) {
    pElementButterbeer.setAttribute('class', 'cross-out');
    divForAllPElements.appendChild(pElementButterbeer);
  }

  let pElementCandle = document.createElement('p');
  pElementCandle.setAttribute('class', 'inventoryItem');
  pElementCandle.textContent = '8 drops of wax from a Poisonous Candle';
  divForAllPElements.appendChild(pElementCandle);
  if (storedPlayer.candle === true) {
    pElementCandle.setAttribute('class', 'cross-out');
    divForAllPElements.appendChild(pElementCandle);
  }

  let pElementPheonixFeather = document.createElement('p');
  pElementPheonixFeather.setAttribute('class', 'inventoryItem');
  pElementPheonixFeather.textContent = '1 Pheonix Feather';
  divForAllPElements.appendChild(pElementPheonixFeather);
  if (storedPlayer.pheonixFeather === true) {
    pElementPheonixFeather.setAttribute('class', 'cross-out');
    divForAllPElements.appendChild(pElementPheonixFeather);
  }
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
  let breakElement = document.createElement('br');
  questionForm.appendChild(breakElement);
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
    let correctAnswer = finalFeature.answer;
    if (correctAnswer === 'spider') {
      newPlayer.webbing = true;
    } else if (correctAnswer === 'alohomora') {
      newPlayer.candle = true;
    } else if (correctAnswer === 'wand') {
      newPlayer.pheonixFeather = true;
    } else if (correctAnswer === 'dragon') {
      newPlayer.butterbeer = true;
    }
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
    objectImage.setAttribute('src', finalFeature.objectImagePathway);
    objectImage.setAttribute('id', 'object-image');
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
let hagridsHut = new LocationFeature('hagridsHut', 'Hagrid\'s hut', 'Deciding that the Forbidden Forrest might be the best place to start, you and Esmeralda carefully make your way down to the back of Hagrid\’s hut and peer into the dark forrest. It\’s off limits to students for a reason but you decide to take your chances. What\’s the worst that could happen? The path ahead of you forks into three directions rather quickly. Which way will you go?', ['Esmeralda is sniffing off to the right… maybe she is just hunting for truffles though? Follow Esmeralda.', 'hippogryphFlight'], ['You see some hoof prints off to the right. Should you follow them?', 'centaurFirenze'], ['Boldly forward is always a great way to start. Go straight ahead.', 'bowtruckleTree'], ['Return to the second floor girls lavatory', 'home']);

let centaurFirenze = new LocationFeature('centaurFirenze', 'The Stargazer', 'The forest is very dark so you have to look hard to see the hoof prints. Barely looking up you track them for what seems like 800 meters before bumping in to something very solid and not so gracefully falling on the ground. As you begin to look up you see hooves, then legs, then a torso and a face crowned by long white-blonde hair. You have heard there is only one Centaur on the grounds with such astonishingly blue eyes and know this must be Firenze! You tell him about Esmeralda and that you are on a quest for potion ingredients. He replies \“One might look to the stars. The Caelregio Araneus holds the key to what you seek.\” You\’ve heard Centaurs could be vague, but what in the world is he talking about?? \“uh thanks Firenze, I think\” you reply.', ['Go back the way you came and hang a left, maybe Esmeralda was on to something.', 'hippogryphFlight'], ['Head farther down the path, it looks like it gently curves to the left.', 'bowtruckleTree'], ['Return to Hagrid\'s Hut', 'hagridsHut'], ['Return to the second floor girls lavatory', 'home']);

let bowtruckleTree = new LocationFeature('bowtruckleTree', 'The Tallest Tree', 'Up ahead you see a huge tree with some low hanging branches. You decide if you climb the tree you might get a better look around. You start your ascent and are immediately attacked by at least 20 bowtruckles. Their sticklike limbs are scratching your arms and face and you don’t have any woodlice to appease them! Seems like this was a bad decision so you jump to the ground and shake them off. Esmeralda eats one and the rest climb back up the tree before she can catch them.', ['Head to the right, you need to get away from these bowtruckles fast!', 'centaurFirenze'], ['Esmarelda wanted to go left and at least right now you should trust her nose', 'hippogryphFlight'], ['Return to Hagrid\'s Hut', 'hagridsHut'], ['Return to the second floor girls lavatory', 'home']);

let hippogryphFlight = new LocationFeature('hippogryphFlight', 'Hooves and Claws', 'To the left you see a horse, only it\’s not a horse, it has the head, torso, and front legs of an eagle. It is a Hippogryph! You\’ve learned about Hippogryphs in your care of magical creatures class so you approach it and bow. You wait anxiously to see if he will accept your greeting, Esmeralda hides behind your legs… clearly she doesn\’t want to be the first one eaten if the Hippogryph takes umbrage with you. He bows back! Now you think you might be able to take a ride to look around. You climb on his back and wave at Esmeralda as you take off! The ride is exhilarating! You mostly see tree-tops but off to the north you see a car… This would go a lot faster with wheels! The Hippogryph comes back to the ground very close to where you took off and Esmeralda comes squealing up besides you, obviously jealous that she didn’t get to go. You know you want to find that car but now that you are on the ground it is hard to tell which way is north.', ['Go left… that might be north', 'weasleyCar'], ['Or was it right? ', 'bowtruckleTree'], ['Return to Hagrid\'s Hut', 'hagridsHut'], ['Return to the second floor girls lavatory', 'home']);

let weasleyCar = new LocationFeature('weasleyCar', 'A Flying Car?!', 'You take your best guess on which direction is north and start walking with Esmeralda trotting along side. Eventually you came to a clearing and see a giant pile of debris with a bumper… You start pulling branches away from the bumper and discover a light blue Ford Anglia! Finally you can make some headway! You get in the car and Esmeralda hops over you into the passenger seat. You pull out your wand and try a few spells to get the car to start but no luck… now what? You\’re feeling frustrated and need a minute to think so you lean back in your seat and stare at the ceiling. All of a sudden you notice the roof of the car is covered in a baby spiders! You and Esmeralda both squeal and go flying out of the broken car.', ['Eww, you hate spiders, go back the way you came', 'hippogryphFlight'], ['Follow the spiders', 'acromantulaCave'], ['Return to Hagrid\'s Hut', 'hagridsHut'], ['Return to the second floor girls lavatory', 'home']);

let acromantulaCave = new ObjectLocationFeature('acromantulaCave', 'The Acromantula Cave', ' Even though you and Esmeralda both fear spiders you know that if you have any hope of getting Acromantula webbing you are going to have to cozy up to some creepy crawlies. You follow the spiders until you see the dark mouth of a cave open up ahead. You don’t want to go in but you know you can\’t take 301 without your best friend… You go in the cave and all you see is hundreds of glittery lights, which as your sight is adjusting to the dark you realize must be the eyes of the biggest spider you have ever seen!! With a trembling voice you address the spider \“excuse me sir, or ma\’am, I really need your help. My friend has been turned into a pig” uh oh, maybe they eat pigs?! “anyway“ you rush on, “I really need some of your web for the potion I am making” The spider is silent for several moments… you start to wonder if he understands English, maybe you should have used gestures? Eventually he replies \“I will give you some of my web but you must answer this riddle.\"', 'First think of the person who lives in disguise, who deals in secrets and tells naught but lies. Next, tell me what\'s always the last thing to mend, the middle of middle and end of the end? And finally give me the sound often heard, during the search for a hard-to-find word. Now string them together and answer me this, which creature would you be unwilling to kiss?', 'spider', '\"You have solved my riddle, you may have my webbing. Do not come into my cave again.\" The spider says in a serious tone. You snatch up the webbing and you and Esmeralda head straight back to the castle.', 'webbing', '../img/spider-web.png');

//diagon-alley location features
let leakyCauldron = new LocationFeature('leakyCauldron', 'The Leaky Cauldron', 'There\’s only one place you can think of that would possibly have a poisonous candle, Diagon Alley. It\’s going to be risky but you\’ll have to sneak out and take your broom to London. Maybe if you stay above the clouds you can avoid being seen by muggles? You get Esmeralda to climb into your knapsack and grab your Firebolt. The next thing you know you are entering Diagon Alley through the wall behind the Leaky Cauldron. Where do you look first?', ['Flourish and Blots, someone may know where you can get a candle', 'flourishBlots'], ['Slug and Jiggers Apothecary, after-all they do sell potion supplies…', 'slugjig'], ['Florean Fortescue\’s Ice Cream. The ride over was really tiring and you could use a pick me up.', 'floreanFortescue'], ['Return to the 2nd floor girls lavatory', 'home']);

let flourishBlots = new LocationFeature('flourishBlots', 'Flourish and Blots', 'You pass through the door of Flourish and Blots and the bell on the door jingles behind you. You try to act casual, checking out books with your pig trailing behind you as you approach the counter. You ask the older witch at the counter if she knows where you might be able to purchase a poisonous candle for potions class. She gives you a cold stare and says \“No reputable shop would sell an underage student a poisonous candle without a parent present\”. You try to tell her your parents are outside but she isn\’t buying it. You leave the shop and look up the road for another option.', ['Slug and Jiggers Apothecary, after-all they do sell potion supplies…', 'slugJig'], ['Florean Fortescue\’s Ice Cream. The ride over was really tiring and you could use a pick me up.', 'floreanFortescue'], ['Go back to the Leaky Cauldron', 'leakyCauldron'], ['Return to the 2nd floor girls lavatory', 'home']);

let slugJig = new LocationFeature('slugJig', 'Slug and Jiggers Apothecary', 'Walking in to Slug and Jiggers Apothecary you smell the pungent odor of Bubotuber Pus. Scanning the heavily stocked shelves you feel hopefully that this might be the place to find your candle. A wrinkled old wizard in red robes asks \“What can I get for you today young potions master?\” You ask for a poisonous candle and the wizard gives you a concerned look and replies \“We don’t stock the types of supplies that are used in the darker arts in our store.\” You lift Esmeralda up to the counter, her red glasses askew, and try to explain about your pig friend. The wizard seems to soften a little and says \“We do not carry such supplies but you may find them in the paths less traveled by civilized witches and wizards\”. You’ll have to keep looking.', ['Go next door to Florean Fortescue\’s Ice Cream shoppe. The search for ingredients has you in need of a snack.', 'floreanFortescue'], ['Flourish and Blots. They sell books, maybe they also sell candles?', 'flourishBlots'], ['Go back to the Leaky Cauldron', 'leakyCauldron'], ['Return to the 2nd floor girls lavatory', 'home']);

let floreanFortescue = new LocationFeature('floreanFortescue', 'Florean Fortescue\’s Ice Cream', 'It has been such a long morning and Esmeralda is looking mournfully towards the Ice Cream shoppe. You decide you could both use a scoop. You purchase two cones of lemon drop sherbet and sit outside the shop at a table with a green striped umbrella. As you eat your ice cream, and hold Esmeralda\’s cone for her, you notice a disreputable looking wizard in wrinkled grey robes skulking in the shadows by Gringotts Wizarding Bank. You aren\’t sure you want to talk to him but he does look like he would know where to find the more controversial potion ingredients. You take one last bite of your ice cream and rush Esmeralda across the street towards the grey figure. Before you can get to him he ducks down an alley to the right of the bank. It looks really dark and scary but this is your first good lead so you follow him. Esmeralda\’s hooves are clicking loudly on the cobblestones of the deserted road. The wizard notices you following and turns around with his wand raised. You quickly duck into an opening on the left and begin to jog. The lane ends and spits you out in an even darker alley that stretches out into the shadows in both directions. The sign for the shop in front of you reads Shrunken Heads. You need to decide which way to go', ['Left', 'poisonousCandles'], ['Right', 'giantSpiders'], ['Go back to the Leaky Cauldron', 'leakyCauldron'], ['Return to the 2nd floor girls lavatory', 'home']);

let giantSpiders = new LocationFeature('giantSpiders', 'Giant Spiders', 'You decide to go right, despite Esmeralda\’s protestations, and look up at a shop that looks long abandoned with a sign reading Giant Spiders. Maybe this would have been a good place to get Acromantula Webbing if it hadn\’t gone out of business. Unfortunately the only webbing you see in the windows appears to belong to regular sized spiders so you are going to have to try your luck elsewhere.', ['Go back to the left', 'poisonousCandles'], ['Another ice cream is sounding really good right now', 'flourishBlots'], ['Go back to the Leaky Cauldron', 'leakyCauldron'], ['Return to the 2nd floor girls lavatory', 'home']);

let poisonousCandles = new ObjectLocationFeature('poisonousCandles', 'Poisonous Candles', 'Your heart starts beating rapidly when you read the name painted on the window of the shabby looking shop ahead. Poisonous Candles sounds like a place that might have just what you came for. As you approach the door you notice a handwritten note on the door that says \“Closed for lunch. Back in 30 minutes\”. You don’t want to hang out in this freaky alley waiting and it might not be a good idea to be seen buying goods from a place like this. You look down at your friend\'s desperate face and realize you have no other choice. You are going to have to break in, get the candle, and get back to Hogwarts. You\’ll have to be in and out before the alarm charm that is likely placed on the door alerts the shopkeeper and you get caught.', 'You try the only unlocking charm you know, ironically also known as the \“theif’s friend\”', 'alohomora', 'Amazingly the charm works and you stick your hand in the door, snatching the first candle you touch and leaving a gold coin in it\’s place. Hopefully one gold galleon is enough! You and Esmeralda dart into the shadows just as a young pox covered wizard apparates on the doorstep of the shop and runs inside to look for the intruder. You grab your pig and race for the Leaky Cauldron!', 'candle', '../img/candle.png');


//headmasters office location features
let hogwartsHalls = new LocationFeature('hogwartsHalls', 'The Halls of Hogwarts', 'You and Esmeralda expeditiously arrive back to Hogwarts and wander the halls desperately trying to figure out where to find a phoenix feather. You recall being told once that Professor Dumbledore\’s animal companion and defender is a phoenix named Fawkes! That\’s where we\’ll find the feather! However, the problem is you have never been to the Headmaster\’s office and have no idea where it could be. You could easily ask someone, but you don\’t want to draw any unwanted attention. What if we don\’t ask some-one, but some-thing!? You look to the left and see the ghost Sir Nicholas de Mimsy-Porpington more commonly known as Nearly Headless Nick, and up ahead is the painting of The Fat Lady. You\’re quite sure that one of them could point you in the direction of the Headmaster\’s office. Esmeralda seems a little hesitant about the idea and starts to pull you by the robe towards a moving staircase. What should you do?',['Talk to Nearly Headless Nick', 'nearlyHeadless'], ['Talk to the painting of The Fat Lady', 'fatLady'], ['Go down the moving staircase', 'movingStaircase'], ['Return to the 2nd floor girls lavatory', 'home']);

let encore = new LocationFeature('encore', 'The Fat Lady Sings… again', 'You sit through another one-of-a-kind performance by The Fat Lady. This time you watch her attempt to shatter a wine glass with her operatic talents that resemble the sound of nails on a chalkboard. Esmeralda begs you to never do this again!!', ['Talk to Nearly Headless Nick', 'nearlyHeadless'], ['Go down the moving staircase', 'movingStaircase'],['return to where you started in the hallway', 'hogwartsHalls'],['Return to the 2nd floor girls lavatory', 'home']);

let headlessStory = new LocationFeature('headlessStory', 'The Story of Nearly Headless Nick', 'You eagerly ask Sir Nicholas de Mimsy-Porpington why he\'s called Nearly Headless Nick and he recites a ballad for you and Esmeralda. Esmeralda quietly pouts while you both listen: It was a mistake any wizard could make, Who was tired and caught on the hop, One piffling error, and then, to my terror, I found myself facing the chop. Alas for the eve when I met Lady Grieve, A-strolling the park in the dusk! She was of the belief I could straighten her teeth, Next moment she\'d sprouted a tusk. I cried through the night that I\'d soon put her right, But the process of justice was lax; They\'d brought out the block, though they\'d mislaid the rock, Where they usually sharpened the axe. Next morning at dawn, with a face most forlorn, The priest said to try not to cry, \"You can come just like that, no, you won\'t need a hat,\” And I knew that my end must be nigh. The man in the mask who would have the sad task, Of cleaving my head from my neck, Said \"Nick, if you please, will you get to your knees,\” And I turned to a gibbering wreck. \"This may sting a bit\" said the cack-handed twit, As he swung the axe up in the air, But oh the blunt blade! No difference it made, My head was still definitely there. The axeman he hacked and he whacked and he thwacked, \"Won\'t be too long", he assured me, But quick it was not, and the bone-headed clot, Took forty-five goes \'til he floored me. And so I was dead, but my faithful old head, It never saw fit to desert me, It still lingers on, that\'s the end of my song, And now, please applaud, or you\'ll hurt me.', ['Talk to The Fat Lady', 'fatLady'], ['Go down the moving staircase', 'movingStaircase'], ['return to where you started in the hallway', 'hogwartsHalls'], ['Return to the 2nd floor girls lavatory', 'home']);

let nearlyHeadless = new LocationFeature('nearlyHeadless', 'Nearly Headless Nick', 'You approach Nearly Headless Nick with a giant smile on your face and wish him a good morning! He tips his plumed hat and wishes you the same as his head plops over and dangles, which makes you and Esmeralda shriek in fear. He looks a bit irritated by the screams but appears pleased by the stunned look on your faces. He asks, \“Would you like to know why I\’m called Nearly Headless Nick?\” As interesting as it may seem, you don\’t have the time. You decide to put on a brave face and ask him, \“Would you have any idea where I could find Professor Dumbledore\’s office?\” He replies and says, \“I do wish I could be of help, but I have never had the pleasure of receiving an invite to the Headmaster\’s office. I don’t know where the office may be, but I do know that the entrance is concealed by a gargoyle. The gargoyle will step aside with the correct password.\” You ask, \“What could the password be?\” \“I believe it\’s a tool made of two components,\” he replies. \“If you look ahead, there is a painting of The Fat Lady. I surmise that she would know more than I. Just be sure to open the conversation up with a compliment.\” You thank him for his time and ponder what to do next…', ['Talk to The Fat Lady', 'fatLady'], ['Ask Nearly Headless Nick why he\’s \“nearly headless\”', 'headlessStory'], ['Go down the moving staircase', 'movingStaircase'], ['Return to the 2nd floor girls lavatory', 'home']);

let fatLady = new LocationFeature('fatLady', 'The Fat Lady', 'As you approach the painting of The Fat Lady, she appears to be making a horrific noise that resembles nails on a chalkboard. Upon getting closer, you realize that she\’s singing! You and Esmeralda quickly wipe the look of shock off of your faces and give her a round of applause. She seems pleased by your reaction and asks if you’d like to hear her sing again. You anxiously respond, \“Your voice is unique and one-of-a-kind! We would love to hear you sing again but we are in dire need of finding the headmaster\’s office. Would you be able to help us?\” The Fat Lady seems disappointed at your answer but seems willing to help. She tells you and Esmeralda, \“The headmaster\’s office is reached by means of a circular, moving staircase which is guarded by a gargoyle. Tell it the correct password to enter.\” You ask, \“What could the password be?\” \“It\’s a tool that has a core,\” she replies. \“Now look over there, I believe it\’s Nearly Headless Nick, maybe he could point you in the right direction.\”', ['Talk to Nearly Headless Nick', 'nearlyHeadless'], ['Ask The Fat Lady to sing for us again. She may give us more clues if we butter her up', 'encore'], ['Go down the moving staircase', 'movingStaircase'], ['Return to the 2nd floor girls lavatory', 'home']);

let movingStaircase = new ObjectLocationFeature('movingStaircase', 'Down the Moving Staircase', 'You follow Esmeralda\’s lead and begin heading down the moving staircase, the staircase abruptly begins to shift towards the right, then swerves slightly back to the left and suddenly extends toward the second floor. You eagerly jump off the staircase before it begins to move again… You look around and find yourself in a long corridor. At the very end of this long corridor you see what appears to be a creature of some sort. You and Esmeralda slowly and quietly walk down the hallway and you are relieved to see that the creature is just a gargoyle statue… that just moved!! Esmeralda jumps and hides behind you. You\’re startled and confused… why is there a random gargoyle just standing here at the end of this corridor? You muster up the courage to ask the gargoyle why it’s here…', 'The gargoyle looks at Esmeralda and says, \“Channel magic it will, of just two materials this instrument made. The wizard it chooses, it\’s not always clear why. What am I?\"', 'wand', 'Since Esmeralda seems too afraid to talk you answer. The gargoyle slowly steps aside and reveals the entrance to a circular moving staircase. You both quietly ascend the staircase into a large beautiful circular room, full of funny little noises. The walls are covered with portraits of old headmasters and headmistresses, all of them snoozing in their frames. There is an enormous, claw-footed desk and to the side of it sitting on a perch is Fawkes, Dumbledore\’s phoenix! You make eye-contact with Fawkes, and as if he knows what you need, he rustles his feathers and a single feather slowly floats through the air and lands on Esmeralda\’s nose! You laugh in excitement while Esmeralda trotts excitedly in circles. You thank Fawkes and quietly make your way out of the headmaster/’s office. You got the phoenix feather!!', 'pheonixFeather', '../img/feather.png');

//hogsmeade location features
let hogsmeade = new LocationFeature('hogsmeade', 'The Village', 'You are excited to head to Hogsmeade! Butterbeer will be the easiest of the ingredients to find…or so you think. You and Esmeralda quickly head straight to The Three Broomsticks, that\’s where you\’ll find a bottle of butterbeer and be on your way to the next location. You\’re about ten feet from the door when you hear an explosion come from inside the pub. All you see is what appears to be a wizard on fire come hurling out of The Three Broomsticks to land flat on his back in the middle of the street. It\’s Seamus Finnigan, a fellow classmate known for his \“proclivity for pyrotechnics\”. The explosion frightens Esmeralda and she darts off in fear! During all the commotion, you are unsure of what direction she ran, and you feel compelled to find her. You are also overly concerned about your classmate that\’s on fire laying in the middle of the street! What course of action should you take?', ['Help Seamus Finnigan and extinguish his burning robe', 'burningRobe'], ['Search for Esmeralda', 'esmeralda'], ['Go inside The Three Broomsticks to buy butterbeer', 'threeBroomsticks' ], ['Return to the 2nd floor girls lavatory', 'home']);

let burningRobe = new LocationFeature('burningRobe', 'Flaming Seamus', 'You immediately pull out your wand, point it directly at Seamus and recite \“Aguamenti!\”. The charm conjures a jet of water from the tip of your wand and extinguishes the fire. You approach him to make sure that he is okay. He seems silent and all of a suddenly sits up straight as a board, looks you directly in the eyes and asks, \“Why am I all wet?\" You explain to him the series of events leading up to that point and he seems grateful. You tell him that you are in a hurry and need to go inside The Three Broomsticks to buy a bottle of butterbeer and look for your pet pig. He looks at you questioningly and says, \“I have to head back to the Gryffindor Common Room but let me at least buy you a butterbeer for helping me.\” You are very skeptical, he just caused an explosion in the pub, why would he go back inside? You consider his offer…', ['You accept his offer to buy you a butterbeer', 'acceptSeamus'], ['You tell him \“No, You need to head back and change out of that wet robe.\”', 'threeBroomsticks'], ['Search for Esmeralda, she can\'t drink the potion if she is missing', 'esmeralda'], ['Return to the 2nd floor girls lavatory', 'home']);

let threeBroomsticks = new LocationFeature('threeBroomstricks', 'The Three Broomsticks', 'You hurry inside The Three Broomsticks to get your hands on some butterbeer. As you enter, the pub appears smokey from the explosion, but you press forward to the bar. The bartender looks at you and you ask for a mug of butterbeer. \“That explosion wiped out all my inventory, your best bet would be The Hog\’s Head, two streets down,\” he says. \“Hate to admit it, but it’s probably much cleaner than it is in here.\” You are disappointed but totally understand, as you exit The Three Broomsticks the bartender yells \“If you’re headed to The Hog\’s Head, be careful and don\’t stay to long or you may end up with a an \“egg\” instead of a butterbeer.\” Well, that\’s a weird thing to say! You head back outside and decide to…', ['Search for Esmeralda', 'esmeralda'], ['Seamus still seems to be flaming, help him', 'burningRobe'], ['Head to the Hog\'s Head', 'hogsHead'], ['Return to the 2nd floor girls lavatory', 'home'])

let acceptSeamus = new LocationFeature('acceptSeamus', 'Butterbeer with Seamus', 'You hurry inside The Three Broomsticks with Seamus to get your hands on some butterbeer. As you enter, the pub appears smokey from the explosion, but Seamus progresses forward to the bar and says to the bartender, \“Can my friend and I have a couple butterbeers?\” The bartender looks at you and then at Seamus. The bartender appears to be shaking in anger, pulls out his wand and points it at Seamus! \“Unless you\’re both in here to help clean up the mess you made,\” he says angrily \“I\’ll make another explosion happen!\” You and Seamus hightail it out of the bar in a heartbeat. As you both catch your breath, he says \“Sorry about that, that wasn\’t very smart of me now was it? Looks like you\’re going to have to go The Hog\’s Head to get a butterbeer…it’s pretty sketchy in there. I hope you find your pet pig! You\’re lucky to have a pet, the only pet I could have would need to be skilled with fire like I am.\”', ['go back to the Three Broomsticks without Seamus, maybe the bartender will be more likely to help?', 'returnThreeBroomsticks'], ['Search for Esmeralda', 'esmeralda'], ['Head to the Hog\'s Head', 'hogsHead'], ['Return to the 2nd floor girls lavatory', 'home']);


let esmeralda = new LocationFeature('esmeralda', 'The Search for Esmeralda', 'You start your search on High Street and call out for Emeralda. \“Esmeralda!\” No answer. Where would she have run off too?! You stop to think and as you ponder where to look next, you start to crave chocolate… The smell of freshly made fudge and chocolate permeates the air. It\’s Honeydukes, the marvelous wizarding sweetshop! The sweet air tickles your nose and teases your tummy. You think to yourself, \“It wouldn\’t hurt to get some chocolate frogs, exploding bonbons, levitating sherbet balls and even some peppermint toads!\” You happily prance into Honeydukes and you\’re in heaven until you suddenly trip over Esmeralda! She let out a loud squeal that alarms the owners Ambrosius Flume and his wife. That immediately snaps you out of your sweet tooth fantasy! \“Is there something in particular that you and your adorable pig are looking for?\” asked Mrs. Flume. \“Butterbeer! My pet pig loves butterbeer!\” you exclaim. \“Pity, no butterbeer here and The Three Broomsticks had an unfortunate accident. There is The Hogs\’s Head, which I don\’t recommend. If you had a fire breathing creature to protect you instead of a pig, that would be a bit safer.\” You thank the owners and assure them that you and Esmeralda will avoid The Hog\’s Head. You walk back out to the street and…', ['Head to the Hog\'s Head', 'hogsHead'], ['Go back to the Three Broomsticks', 'threeBroomsticks'], ['Is that Seamus still on fire?', 'burningRobe'], ['Return to the 2nd floor girls lavatory', 'home']);

let returnThreeBroomsticks = new LocationFeature('returnThreeBroomsticks', 'Return to the Three Broomsticks', 'Your instincts tell you to avoid The Hog’s Head. You head back to The Three Broomsticks hoping that they may have had a delivery of butterbeer while searching for Esmeralda. You arrive and see a sign that says \“Closed due to fire.\" You really didn’t anticipate that finding butterbeer would be so difficult!', ['Seamus still seems to be flaming, help him', 'burningRobe'], ['Where did Esmeralda go now??', 'esmeralda'], ['Head to the Hog\'s Head', 'hogsHead'], ['Return to the 2nd floor girls lavatory', 'home']);

let hogsHead = new ObjectLocationFeature('hogsHead', 'The Hog\'s Head', 'The Hog\'s Head is disreputable pub in the all wizarding village of Hogsmeade. A worn-out wooden sign hangs over the door with a wild boar’s severed head leaking blood onto the white cloth around it. You arrive and look up at the sign. Esmeralda begins to whine in fear and you both start to back away slowly. You know that this is the only place left to find butterbeer in time! Esmeralda appears frightened but is determined to go inside with you. You take a deep breath and walk in. The bar is small and extraordinarily dirty and with windows you can barely see out of. The floor is barely visible under all the dirt. You bravely make your way forward and it appears to be Aberforth Dumbledore behind the counter. He looks at you, and then Esmeralda and asks, \“What\’ll it be?\” \“A butterbeer to go please,\” you say politely. He steps away and returns with a mug of butterbeer. As you reach for your wallet to pay, you realize that you don\’t have it! Did you bring it with you? Did you lose it? You apologize and tell Aberforth that you don\’t have your wallet. He grunts and begins to walk away with the mug of butterbeer. You don\’t know what to do! Suddenly a strange hooded man that you didn\’t see sitting at the bar says in a raspy voice, \“I\’ll pay for your butterbeer if you can answer this question…', '\“Ten there are, most dangerous the Horntail, largest the Ironbelly, smallest the Vipertooth. A Ridgeback and Fireball too. Short-Snout or Longhorn. If color is your fancy there\’s Opaleye, Black and Green. Fantastic creatures, what may they be?', 'dragon', 'The hooded man reaches out a gnarled wrinkled hand and deposits some coins on the counter. Aberforth hands you the hard to get Butterbeer and you head back to the castle', 'butterbeer', '../img/butterbeer.png');



