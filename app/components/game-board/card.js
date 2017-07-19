import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['toggleCardHighlighted'],
  toggleCardHighlighted: false,
  actions: {
    toggleSelect () {
        this.toggleProperty('toggleCardHighlighted');
        return this.sendAction('toggleSelect', this.get('card'));
      },
    // toggleHighlight () {
    //     this.toggleProperty('toggleCardHighlighted');
    //   },
  },
});
