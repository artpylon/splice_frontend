import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game-board/selected-box', 'Integration | Component | game board/selected box', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{game-board/selected-box}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#game-board/selected-box}}
      template block text
    {{/game-board/selected-box}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
