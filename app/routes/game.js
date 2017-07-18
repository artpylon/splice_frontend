import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return Ember.RSVP.hash({
      games: this.store.findAll('game'),
      cards: this.store.findAll('card')
    });
  },
  currentGame: {sets_found:0, over:false},
  actions: {
    validSet () {
    },
    createGame () {
      let gameRecord = this.get('store').createRecord('game', this.get('currentGame'));
      let self = this
      gameRecord.save()
      .then(function(savedgame) {
        self.get('currentGame').id = savedgame.get('id')
      });
    },
    deleteGame () {
      this.get('store').findRecord('game', this.get('currentGame').id).then(function(game) {
        game.destroyRecord()
      });
      debugger
      // gameRecord.destroyRecord()

    },
    updateGame () {
    },
  }
});
