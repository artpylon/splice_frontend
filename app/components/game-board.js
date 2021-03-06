import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),
  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  over: false,
  sets: 0,

  // full deck of game cards, shuffled
  deck: Ember.computed('cards.[]', function () {
    let array = this.get('cards.[]').toArray()
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    return array
    // test deck: 1 valid set and 1 invalid set
    // const array1 = []
    // array1.pushObjects(array.slice(0, 3))
    // array1.pushObject(array[7])
    // array1.pushObject(array[41])
    // array1.pushObject(array[67])
    // return array1
  }),

  cardsRemaining: Ember.computed('game.sets_found', function () {
    let remaining = 81 - (this.get('game').get('sets_found') * 3)
    if (remaining < 0) {
      return 0
    } else {
      return remaining
    }
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

  findSetArray: [],
  findSetCards: Ember.computed('findSetArray', function () {
    return this.get('findSetArray')
  }),


  // helper function for validate, gets selected card properties
  propertyExtractor: function (array, property) {
    return array.map(function(card) {return card.get(property)});
  },

// Function to check if each card's property are all the same or all different
  propertyEvaluator: function (array) {
    const allDiff = function () {
      if (array[0] !== array[1] && array[0] !== array[2] && array[1] !== array[2]) {
        return true
      }
    }
    if (array.every( (val, i, array) => val === array[0]) === true ||
      allDiff() === true) {
      return true
    } else {
      return false
    }
  },

  validate: function (array) {
    const shapes = this.propertyExtractor(array, 'shape');
    const colors = this.propertyExtractor(array, 'color');
    const numbers = this.propertyExtractor(array, 'number');
    const shadings = this.propertyExtractor(array, 'shading');

    if (this.propertyEvaluator(shapes) && this.propertyEvaluator(colors)
      && this.propertyEvaluator(numbers) && this.propertyEvaluator(shadings)) {
        return true
    } else {
      return false
    }

  },
  checkSet: function() {
    let board = this.get('gameArray')
    let length = this.get('gameArray').length
    if (board.length < 3) {
      return false}
    var randoffs = Math.floor(Math.random() * length);
    for (var i = 0; i < length - 2; i++) {
      for (var j = i + 1; j < length - 1; j++) {
        for (var k = j + 1; k < length; k++) {
          let _i = board[(i + randoffs) % length]
          let _j = board[(j + randoffs) % length]
          let _k = board[(k + randoffs) % length]
          let array = [_i, _j, _k]
          if (_i === null || _j === null || _k === null) {
            return  false
          } else if (this.validate(array)) {
            return array
          }
        }
      }
    }
    return false;
  },

  setFound: function () {
    // add 3 new cards to the game away from the deck
    if (this.get('gameArray').length < 15) {
      this.send('addThree')
    }

    this.get('flashMessages').success('Set found! Good work!')
  },
  clearArray: function (array, start, end) {
    array.removeAt(start, end)
  },

  gameOver: function () {
    let selectedArray = this.get('selectedArray')
    let findSetArray = this.get('findSetArray')

    if (selectedArray.length > 0) {
      this.clearArray(selectedArray, 0, 3) }

    if (findSetArray.length > 0) {
      this.clearArray(findSetArray, 0, 3) }

    $('.play-again').toggle()
    $('.reset-game').toggle()
    this.get('flashMessages').success('You WON!')
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
          this.validate(this.get('selectedArray')) === true) {

            // record that a set was found on this game
            this.sets += 1
            self.get('game').set('sets_found', this.sets)
            this.send('updateGame')

            // remove valid set from game array
            this.get('gameArray').removeObjects(selectedArray)
            this.clearArray(this.get('selectedArray'), 0, 3)
            if (this.get('findSetCards').length > 0) {
              this.clearArray(this.get('findSetCards'), 0, 3)
            }

            // check if the game is over
            if (this.checkSet() === false && this.get('deck').length < 3) {
                this.gameOver()
            } else {
            // add 3 new cards to the game away from the deck
                this.setFound()
            }
              // this.send('addThree')
              // // clear the selected array
              // this.clearArray(selectedArray, 0, 3)
              // this.get('flashMessages').success('Set found! Good work!')

        // if set is invalid:
        } else if (selectedArray.length === 3 &&
          this.validate(selectedArray) === false) {

            this.clearArray(selectedArray, 0, 3)
            this.get('flashMessages').danger('Invalid set! Keep looking!')
          }
      }
    },

    deleteGame () {
      let selectedArray = this.get('selectedArray')
      let findSetArray = this.get('findSetArray')

      if (selectedArray.length >= 1) {
        this.clearArray(selectedArray, 0, 3) }

      if (findSetArray.length >= 1) {
        this.clearArray(findSetArray, 0, 3) }

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
      if (this.get('deck') === 0) {
        $('.add-three').toggle('display')
      }
    },
    findSet: function () {
      while (this.checkSet() === false && this.get('deck').length > 2) {
        this.send('addThree')
      }
      const cards = this.checkSet()
      if (this.findSetArray.length === 0) {
        this.findSetArray.pushObject(cards[0])
        this.findSetArray.pushObject(cards[1])
        this.findSetArray.pushObject(cards[2])
      }
    },
  },

});
