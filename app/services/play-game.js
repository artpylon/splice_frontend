import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  credentials: storageFor('auth'),
  isAuthenticated: Ember.computed.bool('credentials.token'),

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
});
