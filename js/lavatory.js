'use strict';

//TODO add background image to line 12 of the html file
// create text in html or in javascript that renders form to appear on quest parchement.
// create radio buttons in html or javascript that direct the player to the 4 location sites
// we might want to create pull over the function- from the one of the location.js files that checks for the inventory being full to change the senario to our finale. In which case we need to have rendered our form in javascript. 
// attach a listener to the submit button the does the window thing we did on the home page that assigns a target location depending on what area they want to visit
// maybe we want the parchment to say the players name and be more interactive... like "hello 'sara', you have found '2' items but you still have '2' to look for. Where would you like to visit next?" I think that would be cool!



// retrieves user info at newPlayer.key
let newPlayer = JSON.parse(localStorage.getItem('userInfo'));


//renders the inventory list to the page
checkLocalStorageToFillInventory();