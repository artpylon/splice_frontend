import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteGame () {
      return this.sendAction('deleteGame', this.get('game'));
    },
    updateGame: function () {
      return this.sendAction('updateGame', this.get('game'))
    },
    playAgain: function () {
      return this.sendAction('playAgain')
    },
    addThree: function () {
      return this.sendAction('addThree')
    },
    findSet () {
      return this.sendAction('findSet')
    },
  }
});
