# Splice!

![Alt text](http://i.imgur.com/RGNEGof.png "Optional title")

Splice is a single-player pattern matching game, based on the popular card game Set&trade;. I built this full-stack application in 4 days using Ember.js and Ruby on Rails.

*How to play the game*
First, create an account and sign in, then click "Play Game".
Select sets of 3 cards from the gameboard.
Each card has 4 properties: color, shape, number, and shading.
Across the 3 cards you select, each of these properties must be either
all the same or all different.
For example, you could have:
  - Card 1: Green, Triangle, 1, Shaded
  - Card 2: Green, Block, 2, Shaded
  - Card 3: Green, Circle, 3, Shaded
In this set, color and shading are all the same, but shape and number are all different. Any of the properties could all be the same, or all different. Got it? For more info, see:
https://en.wikipedia.org/wiki/Set_(game)

*IMPORTANT LINKS*
Deployed Front-End App:
https://artpylon.github.io/splice_frontend/
Deployed API:
https://splice-api.herokuapp.com/
Front-End Repo:
https://github.com/artpylon/splice_frontend
Backend Repo:
https://github.com/artpylon/splice_backend
Wireframes:
https://drive.google.com/file/d/0BxtpRPyddhwRTGtzdFFuMHFUVzA/view?usp=sharing
ERD:
https://drive.google.com/file/d/0BxtpRPyddhwRdjVPSk4wSmt6M3M/view?usp=sharing
Trello (includes column for user stories--far left):
https://trello.com/b/vaCW3iqc/wdi-4-splice


## Technologies Used:
This app was built using the Ember.js frontend framework and Rails for the API. Other technologies used include:

Bootstrap, Handlebars, PostgresSql, HTML5/CSS3

# Approach/Process
I wanted to build this app because I love card games that involve interesting logic. I started the project by planning how I would represent each card and validate that that a valid set was selected. This was achieved by having each card be an object with the 4 properties of each card.

Then, I turned my attention to the Ember.js frontend frame work and mapped out how I would structure the app. I diagrammed routes and components and organized the properties and methods that each should hold. Next, I created an ERD and considered what data would be needed for the app and relationships between models. I also made simple wireframes to organize how I wanted to layout the UI.

I also created a set of detailed user stories for each of the major use cases to be covered in the app and prioritized these against my schedule for the project.

I used a kanban-style trello board to manage my work. This was incredibly helpful and kept me focused on each step. I also used the board to log bugs found and features I'd like to add later on.

## Major Hurdles
As this was my first time using a frontend framework like Ember.js, there was a significant learning curve for developing the front end client. In particular, understanding how to reference data in Ember objects and move actions and data between routes, components and templates.

## Future Iterations
In the next iteration, I'd like to add game and lifetime stats for the current user, improve the UX on mobile devices, and add the capability for a simultaneous multiplayer game.


## USER STORIES:

### Sign In
As a user, I would like to login, so that I can use the app.

### Sign Up
As a user, I would like to create an account so that I can login

### Sign Out
As a user, I would like to sign out so that other people can't edit files

### Change Password
As a user I would like to change my password in case it is compromised

### Play Game
As a logged in user, I would like to be able to start a new game and save a record of that game, so that I can play Splice.

### Find a Set
As a logged in user who has started a game, I would like to be able to find sets, so that I can finish the game.

### See Selected Cards
As a logged in user who has started a game and selected one or more cards, I would like to be able to see that cards I have selected, so that I may more easily decide what other cards on board might form a valid set.

### Restart game
As a logged in user who has started a game, I would like to be able to restart a game and remove that record from my game history, so that I can start a new game.

### Play again
As a logged in user who has finished a game, I would like to be able to start a new game, so that I can play again.
