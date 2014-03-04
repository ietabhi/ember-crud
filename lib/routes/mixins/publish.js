export default Ember.Mixin.create(
  {
    actions: {
      publish: function(model) {
        if (!model) {
          model = this.get('controller.model');
        }
        model.set('publish', true);
        model.save().then(
          this.success.bind(this, 'publish'),
          this.error.bind(this, 'publish')
        );
      }
    }
  }
);
