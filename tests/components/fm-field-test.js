import Ember from 'ember';
import {initialize} from 'ember-form-master-2000/initializers/fm-initialize';
import {test, moduleForComponent} from 'ember-qunit';

moduleForComponent('fm-field', {}, {
  needs: ['component:fm-select',
          'component:fm-input',
          'component:fm-textarea',
          'template:components/ember-form-master-2000/fm-field'],
  setup: function(container) {
    container.inject = container.injection;
    initialize(null, container);
  }
});

test('renders properly', function() {
  var component = this.subject();
  this.$();
  ok(component.$().hasClass('form-group'), 'Has a wrapper element with the form-group class');
  equal(component.$('input.form-control').length, 1, 'Has a wrapper element with the form-group class');
});

test('it uses allows classNames to be passed in', function() {
  var component = this.subject();
  // This emulates the user passing in a className {{#em-form classNames='form-vertical'}}
  component.set('classNames', ['ember-view', 'form-vertical']);
  this.$();
  ok(component.$().hasClass('form-vertical'), 'Has the form-vertical class');
  ok(!component.$().hasClass('form-horizontal'), 'Does not have the default form-horizontal class');
});

test('it renders a label if a label is passed in', function() {
  var component = this.subject();
  component.set('label', 'Form-Master-2000');
  this.$();
  equal(component.$('label').length, 1, 'Renders a label when passed in');
  equal(component.$('label').text(), 'Form-Master-2000', 'Renders correct label text when passed in');
});

test('it does not render a label unless it\'s passed in', function() {
  var component = this.subject();
  ok(!component.get('label'));
  this.$();
  equal(component.$('label').length, 0, 'Does not renders a label unless it\'s passed in');
});

test('isSelect returns true when the field has type="select"', function() {
  var component = this.subject();
  component.set('type', 'select');
  this.$();
  ok(component.get('isSelect'));
});

test('it has a default optionLabelPath and optionValuePath', function() {
  var component = this.subject();
  this.$();
  equal(component.get('optionValuePath'), 'content.value', 'The default value path is content.value');
  equal(component.get('optionLabelPath'), 'content.label', 'The default label path is content.label');
});

test('it passes select options correctly', function() {
  var component = this.subject();
  var mockOptions = [
    {randomValueAttribute: 1, randomLabelAttribute: 'one'},
    {randomValueAttribute: 2, randomLabelAttribute: 'two'},
    {randomValueAttribute: 3, randomLabelAttribute: 'three'}
  ];
  component.set('type', 'select');
  component.set('content', mockOptions);
  component.set('optionValuePath', 'content.randomValueAttribute');
  component.set('optionLabelPath', 'content.randomLabelAttribute');
  this.$();
  equal(component.$('option').length, 3, 'It rendered three options');
  equal($(component.$('option')[0]).val(), '1', 'The first value is correct');
  equal($(component.$('option')[1]).val(), '2', 'The second value is correct');
  equal($(component.$('option')[2]).val(), '3', 'The third value is correct');
  equal($(component.$('option')[0]).text(), 'one', 'The first label is correct');
  equal($(component.$('option')[1]).text(), 'two', 'The second label is correct');
  equal($(component.$('option')[2]).text(), 'three', 'The third label is correct');
});

test('it passes select prompt options', function() {
  var component = this.subject();
  var mockOptions = [{value: 1, label: 'one'}];
  component.set('type', 'select');
  component.set('content', mockOptions);
  component.set('prompt', 'Select something...');
  this.$();
  equal(component.$('option').length, 2, 'It rendered the prompt options');
  equal($(component.$('option')[0]).text(), 'Select something...', 'It rendered the correct prompt text');
});

test('it allows the user to manually select an option', function() {
  var component = this.subject();
  var mockOptions = [{value: 1, label: 'one'}];
  component.set('type', 'select');
  component.set('content', mockOptions);
  component.set('prompt', 'Select something...');
  this.$();
  equal(component.$('option:selected').text(), 'Select something...', 'The select option is set properly by default');
  Ember.run(function() {
    component.set('value', 1);
  });
  equal(component.$('option:selected').text(), 'one', 'Updating the value of model propigated the change to the select');
});

test('it renders a textarea', function() {
  var component = this.subject();
  component.set('type', 'textarea');
  this.$();
  equal(component.$('textarea').length, 1, 'fm-field renders a textarea');
});

test('allows data attributes to be attached to textinputs', function() {
  var component = this.subject();
  component.get('dataAttributes').push('data-test');
  component.set('data-test', 'master-2000');
  this.$();
  equal(component.$('input').data('test'), 'master-2000', 'The fm-field data attribute was not set properly on the textinput');
  Ember.run(function() {
    component.set('data-test', 'master-3000');
  });
  // TODO: Add dynamic observers so that data-attributes update correctly
  // equal(component.$('input').data('test'), 'master-3000', 'The fm-field data attribute was not updated properly');
});

test('allows data attributes to be attached to textfields', function() {
  var component = this.subject();
  component.set('type', 'textarea');
  component.get('dataAttributes').push('data-test');
  component.set('data-test', 'master-2000');
  this.$();
  equal(component.$('textarea').data('test'), 'master-2000', 'The fm-field data attribute was not set properly on the textfield');
});