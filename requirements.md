# Software Requirements

## Vision

Create an interactive choose your own adventure game where the player will have to collect items to complete the quest.

It is a great diversion and will entertain the user.

Our game will be very fun and will utilize all the skills we have learned in out 201 class.

## Scope (In/Out)

IN - Collet user data for local storage and create a logic pathway for the user to follow and explore their surroundings to find hidden objects needed to complete their quest.

Describe the individual features that your product will do:
- The app will take in and store a users name and hogwarts house.
- The web app will narrarate a story that the user can interact with.
- Users will be able to "collect items" that will be stored in local storage to persist across pages.
- Each area location will be styled to create an atmosphere representitive of the location

OUT - What will your product not do.
- Will not be animated with characters like a modern video game
- Will not save a players place within a location


Minimum Viable Product
- an interactive story line with several different locations that stores objects in local storage

What are your stretch goals?
- high score page with a timer
- more specific location css



Functional Requirements
A user can input their name/gender preference/house
A user can see all products in their inventory
A user can return to a central hub to visit new locations

Data Flow
A user will input their personal information and be moved into the story page where the narrative will start. From there they move to a central hub page with links to all other pages. Each location page will present information to the user via location objects based on what area they are in. The user will interact via form and navigate through the location objects until they reach the location object that can access the item they need to retrieve. That item will then be stored in the local storage attached to the user object.