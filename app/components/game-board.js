import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  over: false,

  // full deck of game cards, shuffled
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

      let sets = 0
      let self = this
      // check if this card has already been selected.
      if (card === this.get('selectedArray')[0] || card === this.get('selectedArray')[1]) {
        this.get('flashMessages').danger('Already selected!')
        return
      }

      // if less than 3 cards selected, push this card to selected array.
      if (this.get('selectedArray').length < 3) {
        this.get('selectedArray').pushObject(card)

        // if this card makes 3 selected, validate that set

        // if valid:
        if (this.get('selectedArray').length === 3 &&
          this.validate() === true) {

            // record that a set was found on this game
            sets++
            self.get('game').set('sets_found', sets)
            this.send('updateGame')

            // remove valid set from game array
            this.get('gameArray').removeObjects(this.get('selectedArray'))

            // check if the game is over
            if (this.get('deck').length === 0) {
              this.gameOver()

            } else {
            // add 3 new cards to the game away from the deck
            // clear the selected array
            // notify the user of valid set found
              this.send('addThree')
              this.clearArray(this.get('selectedArray'), 0, 3)
              this.get('flashMessages').success('Set found! Good work!')
            }

        // if set is invalid:
        } else if (this.get('selectedArray').length === 3 &&
          this.validate() === false) {

            this.clearArray(this.get('selectedArray'), 0, 3)
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
