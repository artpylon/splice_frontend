import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  sets_found: DS.attr('number'),
  over: DS.attr('boolean'),
  editable: DS.attr('boolean')
});
