import Ember from 'ember';

export default Ember.Component.extend({
  // classNameBindings: ['highlight'],
  // highlight: false,
  actions: {
    toggleSelect () {
        // this.toggleProperty('highlight')
        return this.sendAction('toggleSelect', this.get('card'), this);
      },

  },
});
