import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  model () {
    const users = this.get('store').findAll('user');
  },
});

// const users = this.get('store').findAll('user');
// const cards = this.get('store').findAll('card');
// return {users: users, cards: cards}
