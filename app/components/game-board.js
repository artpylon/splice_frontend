import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  over: false,

  // full deck of game cards, shuffled
  sets: 0,
  deck: Ember.computed('cards.[]', function () {
    let array = this.get('cards.[]').toArray()
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }),

  cardsRemaining: Ember.computed('game.sets_found', function () {
    return 66 - (this.get('game').get('sets_found') * 3)
  }),

  // select 15 cards from the deck to start the game
  gameArray: Ember.computed('this.deck', function () {
      let array = this.get('deck').slice(0, 15)
      this.get('deck').removeAt(0, 15)

      // for testing, render the whole deck on gameboard:
      // let array = this.get('deck')
      return array
  }),

  // array to contain cards selected by the user
  selectedArray: [],

  // computed property that watches selectedArray and displays contents to user
  selectedCards: Ember.computed('selectedArray', function () {
    return this.get('selectedArray')
  }),

  // helper function for validate, gets selected card properties
  propertyExtractor: function (array, property) {
    return array.map(function(card) {return card.get(property);});
  },

// Function to check if each card's property are all the same or all different
  propertyEvaluator: function (array) {
    if (array.every( (val, i, arr) => val == arr[0]) === true ||
      array.every( (val, i, arr) => i === 0 || val !== arr[i - 1]) === true) {
      return true
    } else {
      return false
    }
  },

  validate: function () {
    const shapes = this.propertyExtractor(this.get('selectedArray'), 'shape');
    const colors = this.propertyExtractor(this.get('selectedArray'), 'color');
    const numbers = this.propertyExtractor(this.get('selectedArray'), 'number');
    const shadings = this.propertyExtractor(this.get('selectedArray'), 'shading');

    if (this.propertyEvaluator(shapes) && this.propertyEvaluator(colors)
      && this.propertyEvaluator(numbers) && this.propertyEvaluator(shadings)) {

    } else {
      return false
    }

    return true
  },

  setFound: function () {
    // add 3 new cards to the game away from the deck
    if (this.get('gameArray').length < 15) {
      this.send('addThree')
    }
    // clear the selected array
    this.clearArray(this.get('selectedArray'), 0, 3)
    this.get('flashMessages').success('Set found! Good work!')
  },
  clearArray: function (array, start, end) {
    array.removeAt(start, end)
  },

  gameOver: function () {
    this.clearArray(this.get('selectedArray'), 0, 3)
    this.get('flashMessages').success('You WON!')
    $('.play-again').toggle()
    $('.reset-game').toggle()
  },

  actions: {
    toggleSelect (card) {
      let self = this
      let selectedArray = this.get('selectedArray')
      // check if this card has already been selected.
      if (card === selectedArray[0] || card === selectedArray[1]) {
        this.get('flashMessages').danger('Already selected!')
        return
      }

      // if less than 3 cards selected, push this card to selected array.
      if (selectedArray.length < 3) {
        selectedArray.pushObject(card)

        // if this card makes 3 selected, validate that set

        // if valid:
        if (selectedArray.length === 3 &&
          this.validate() === true) {

            // record that a set was found on this game
            this.sets += 1
            self.get('game').set('sets_found', this.sets)
            this.send('updateGame')
            debugger

            // remove valid set from game array
            this.get('gameArray').removeObjects(selectedArray)

            // check if the game is over
            if (this.get('deck').length === 0) {
              this.gameOver()

            } else {
            // add 3 new cards to the game away from the deck
              this.setFound()
              // this.send('addThree')
              // // clear the selected array
              // this.clearArray(selectedArray, 0, 3)
              // this.get('flashMessages').success('Set found! Good work!')
            }

        // if set is invalid:
        } else if (selectedArray.length === 3 &&
          this.validate() === false) {

            this.clearArray(selectedArray, 0, 3)
            this.get('flashMessages').danger('Invalid set! Keep looking!')
          }
      }
    },

    deleteGame () {
      return this.sendAction('deleteGame', this.get('game'));
    },
    updateGame: function () {
      return this.sendAction('updateGame', this.get('game'))
    },
    playAgain: function () {
      this.transitionTo('games')
    },
    addThree: function () {
      this.get('gameArray').addObject(this.get('deck').shiftObject())
      this.get('gameArray').addObject(this.get('deck').shiftObject())
      this.get('gameArray').addObject(this.get('deck').shiftObject())
    }
  },

});
