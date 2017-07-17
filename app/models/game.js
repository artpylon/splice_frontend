import DS from 'ember-data';

export default DS.Model.extend({
  sets_found: DS.attr('number'),
  over: DS.attr('boolean')
});
