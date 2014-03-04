export default Ember.Mixin.create(
  {
    setupController: function(controller, model) {
      controller.set('model', model);
      controller.set('crud', this.get('crud'));
    }
  }
);
