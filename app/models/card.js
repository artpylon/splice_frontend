import DS from 'ember-data';

export default DS.Model.extend({
  shape: DS.attr('string'),
  color: DS.attr('string'),
  number: DS.attr('number'),
  shading: DS.attr('string'),
  img: DS.attr('string')
});
