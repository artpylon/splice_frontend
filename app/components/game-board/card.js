import Ember from 'ember';

export default Ember.Component.extend({
  // classNameBindings: ['highlight'],
  // highlight: false,
  actions: {
    toggleSelect () {

      return this.sendAction('toggleSelect', this.get('card'))
      },

  },
});
