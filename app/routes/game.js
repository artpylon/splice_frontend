import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
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
