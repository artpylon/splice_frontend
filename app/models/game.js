import DS from 'ember-data';

export default DS.Model.extend({
  games: DS.attr(),
  cards: DS.attr()
});
