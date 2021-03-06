import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';
import {test, moduleForComponent} from 'ember-qunit';

moduleForComponent('fm-radio', {}, {
  needs: [
    'component:fm-radio-group',
    'template:components/ember-form-master-2000/fm-radio-group',
    'template:components/ember-form-master-2000/fm-radio'
  ],
  setup: function(container) {
    container.inject = container.injection;
    initialize(null, container);
  }
});

test('renders properly', function() {
  var radioGroup = new this.factory('component:fm-radio-group').create();
  var component = this.subject();
  component.set('parentView', radioGroup);
  this.$();
  equal(component.$('input').length, 1, 'fm-radio rendered properly');
});

test('it updates the parentView value on change', function() {
  var radioGroup = new this.factory('component:fm-radio-group').create();
  var component = this.subject();
  component.set('parentView', radioGroup);
  this.$();
  Ember.run(function() {
    component.set('value', 'test value');
    component.$().change();
    equal(radioGroup.get('value'), 'test value', 'fm-radio sets the parentView.value properly');
  });
});
