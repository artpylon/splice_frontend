import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createGame(){
      let self = this;
      let currentGame = this.get('store').createRecord('game', {
        over: false
      });
      currentGame.save()
        .then(function(savedGame){
          self.transitionTo('game', savedGame.get('id'))
        })
    }
  }
});
