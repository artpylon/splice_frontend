import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return Ember.RSVP.hash({
      games: this.store.findAll('game'),
      cards: this.store.findAll('card')
    });
  },
  actions: {
    validSet () {
    },
    createGame (game) {
      let gameRecord = this.get('store').createRecord('game', game);
      gameRecord.save();
    }
  }
});
