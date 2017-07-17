import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    const games = this.get('store').findAll('game');
    const cards = this.get('store').findAll('card');
    return {games: games, cards: cards}
  },
});
