import Ember from 'ember';

export default Ember.Component.extend({
  deck: Ember.computed('model.cards.[]', function () {
    let array = this.get('model.cards.[]').toArray()
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }),
  gameArray: Ember.computed('this.deck', function () {
      return this.get('deck').slice(0, 15)
  }),
  selectedArray: [],
  validate: Ember.computed('this.selectedArray', function () {
      const shapes = this.get('selectedArray').toArray().map(function(a) {return a.shape;});
      const colors = this.get('selectedArray').toArray().map(function(a) {return a.color;});
      const numbers = this.get('selectedArray').toArray().map(function(a) {return a.numbers;});
      const shadings = this.get('selectedArray').toArray().map(function(a) {return a.shading;});
      const solution = []
      if (this.get('selectedArray').length === 3) {
        solution.push(true)
      } else solution.push(false)
      if (shapes.every( (val, i, arr) => val == arr[0]) ||
        shapes.every( (val, i, arr) => val !== arr[0])) {
        solution.push(true)

      } else solution.push(false)

      if (colors.every( (val, i, arr) => val == arr[0]) ||
        colors.every( (val, i, arr) => val !== arr[0])) {
        solution.push(true)

      } else solution.push(false)

      if (numbers.every( (val, i, arr) => val == arr[0]) ||
        numbers.every( (val, i, arr) => val !== arr[0])) {
        solution.push(true)

      } else solution.push(false)

      if (shadings.every( (val, i, arr) => val == arr[0]) ||
        shadings.every( (val, i, arr) => val !== arr[0])) {
        solution.push(true)

      } else solution.push(false)

      if (solution) {
        return true
      } else return false
  }),
  actions: {
    toggleCardSelected (card) {
      if (this.get('selectedArray').length < 3) {
        this.get('selectedArray').push(card)
      } else if (this.get('validate') === true) {
        return this.sendAction('validSet');
      } else return;
    },
  },
  // removeGameArray: Ember.computed('this.deck', function () {
  //     return this.get('deck').removeObjects(0, 15)
  // }),
});
