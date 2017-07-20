import Ember from 'ember';

export default Ember.Component.extend({
  over: false,
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
  gameArray: Ember.computed('this.deck', function () {
      // let array = this.get('deck').slice(0, 15)
      let array = this.get('deck')
      // this.get('deck').removeAt(0, 15)
      return array
  }),
  selectedArray: [],
  selectedCards: Ember.computed('selectedArray', function () {
    return this.get('selectedArray')
  }),

  validate: function () {

      const shapes = this.get('selectedArray').map(function(card) {return card.get('shape');});
      const colors = this.get('selectedArray').map(function(card) {return card.get('color');});
      const numbers = this.get('selectedArray').map(function(card) {return card.get('number');});
      const shadings = this.get('selectedArray').map(function(card) {return card.get('shading');});

      if (this.get('selectedArray').length < 3) {
        return false
      }

      if (shapes.every( (val, i, arr) => val == arr[0]) === true ||
        shapes.every( (val, i, arr) => i === 0 || val !== arr[i - 1]) === true) {

      } else {
        return false
      }

      if (colors.every( (val, i, arr) => val == arr[0]) === true ||
        colors.every( (val, i, arr) => i === 0 || val !== arr[i - 1]) === true) {

      } else {
        return false
      }

      if (numbers.every( (val, i, arr) => val == arr[0]) === true ||
        numbers.every( (val, i, arr) => i === 0 || val !== arr[i - 1]) === true) {

      } else {
        return false
      }

      if (shadings.every( (val, i, arr) => val == arr[0]) === true ||
        shadings.every( (val, i, arr) => i === 0 || val !== arr[i - 1]) === true) {

      } else {
        return false
      }


      return true
  },

  actions: {
    toggleSelect (card) {

      let sets = 0
      let self = this
      if (this.get('selectedArray').length < 3) {
        this.get('selectedArray').pushObject(card)
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
              this.over = true
              this.get('flashMessages').success('You WON!')
            } else {
            // add 3 new cards to the game away from the deck
              this.get('gameArray').addObject(this.get('deck').shiftObject())
              this.get('gameArray').addObject(this.get('deck').shiftObject())
              this.get('gameArray').addObject(this.get('deck').shiftObject())
            // clear the selected array
              this.get('selectedArray').removeAt(0, 3)
              this.get('flashMessages').success('Set found! Good work!')
            }
        // if set is invalid...
        } else if (this.get('selectedArray').length === 3 &&
          this.validate() === false) {

            this.get('selectedArray').removeAt(0, 3)
            this.get('flashMessages').danger('Invalid set! Keep looking!')


          } else return
        // display error message
      } else return
        // display error message

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
  },

});
