export default Ember.Mixin.create(
  {
    actions: {
      unpublish: function(model) {
        if (!model) {
          model = this.get('controller.model');
        }
        model.set('publish', false);
        model.save().then(
          this.success.bind(this, 'unpublish'),
          this.error.bind(this, 'unpublish')
        );
      }
    }
  }
);
