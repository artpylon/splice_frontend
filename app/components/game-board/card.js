import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleSelect () {
      return this.sendAction('toggleSelect', this.get('card'))
      },

  },
});
