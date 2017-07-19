import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['toggleBoardDisplay'],
  toggleBoardDisplay: true,
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
      let array = this.get('deck').slice(0, 15)
      this.get('deck').removeAt(0, 15)
      return array
  }),
  selectedArray: [],
  validate: Ember.computed('this.selectedArray', function () {
      return  true
      // const shapes = this.get('selectedArray').toArray().map(function(a) {return a.shape;});
      // const colors = this.get('selectedArray').toArray().map(function(a) {return a.color;});
      // const numbers = this.get('selectedArray').toArray().map(function(a) {return a.numbers;});
      // const shadings = this.get('selectedArray').toArray().map(function(a) {return a.shading;});
      // const solution = []
      // if (this.get('selectedArray').length === 3) {
      //   solution.push(true)
      // } else solution.push(false)
      // if (shapes.every( (val, i, arr) => val == arr[0]) ||
      //   shapes.every( (val, i, arr) => val !== arr[0])) {
      //   solution.push(true)
      //
      // } else solution.push(false)
      //
      // if (colors.every( (val, i, arr) => val == arr[0]) ||
      //   colors.every( (val, i, arr) => val !== arr[0])) {
      //   solution.push(true)
      //
      // } else solution.push(false)
      //
      // if (numbers.every( (val, i, arr) => val == arr[0]) ||
      //   numbers.every( (val, i, arr) => val !== arr[0])) {
      //   solution.push(true)
      //
      // } else solution.push(false)
      //
      // if (shadings.every( (val, i, arr) => val == arr[0]) ||
      //   shadings.every( (val, i, arr) => val !== arr[0])) {
      //   solution.push(true)
      //
      // } else solution.push(false)
      //
      // if (solution) {
      //   return true
      // } else return false
  }),

  actions: {
    toggleSelect (card) {
      let sets = 0
      let self = this
      if (this.get('selectedArray').length < 3) {
        this.get('selectedArray').push(card)

        if (this.get('selectedArray').length === 3 &&
          this.get('validate') === true) {
            // record that a set was found on this game
            sets++
            self.get('game').set('sets_found', sets)
            this.send('updateGame')
            // remove valid set from game array
            this.get('gameArray').removeObjects(this.get('selectedArray'))
            // add 3 new cards to the game away from the deck
            this.get('gameArray').addObject(this.get('deck').shiftObject())
            this.get('gameArray').addObject(this.get('deck').shiftObject())
            this.get('gameArray').addObject(this.get('deck').shiftObject())
            // clear the selected array
            this.get('selectedArray').removeAt(0, 3)

        } else return
        // display error message
      } else return
        // display error message
      // return this.sendAction('updateGame', self.get('game'));
    },
    deleteGame () {
      return this.sendAction('deleteGame', this.get('game'));
    },
    updateGame: function () {
      return this.sendAction('updateGame', this.get('game'))
    },
  },
  // removeGameArray: Ember.computed('this.deck', function () {
  //     return this.get('deck').removeObjects(0, 15)
  // }),
});
