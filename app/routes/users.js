import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    const users = this.get('store').findAll('user');
  },
});

// const users = this.get('store').findAll('user');
// const cards = this.get('store').findAll('card');
// return {users: users, cards: cards}
