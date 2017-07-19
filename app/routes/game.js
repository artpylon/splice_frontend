import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return Ember.RSVP.hash({
      games: this.store.findAll('game'),
      cards: this.store.findAll('card'),
      currentGame: this.get('store').peekRecord('game', params.game_id)
    });
  },
  currentGame: {sets_found:0, over:false},
  actions: {
    updateGame (game) {
      game.save()
    },
    deleteGame (game) {
      game.destroyRecord()
        .then(this.transitionTo('games'))
    },
  }
});
