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
  // removeGameArray: Ember.computed('this.deck', function () {
  //     return this.get('deck').removeObjects(0, 15)
  // }),
});
