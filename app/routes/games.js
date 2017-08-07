import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  actions: {
    createGame(){
      let self = this;
      let currentGame = this.get('store').createRecord('game', {sets_found: 0,
        over: false
      });
      currentGame.save()
        .then(function(savedGame){
          self.transitionTo('game', savedGame.get('id'))
        })
    }
  }
});
