import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['toggleCardHighlighted'],
  toggleCardHighlighted: false,
  actions: {
    toggleSelect () {
        return this.sendAction('toggleCardSelected', this.get('card'));
      },
    toggleHighlight () {
        return this.toggleProperty('toggleCardHighlighted');
      },
  },
});
