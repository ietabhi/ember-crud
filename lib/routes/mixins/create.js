export default Ember.Mixin.create(
  {
    actions: {
      create: function() {
        this.get('controller.model').save().then(
          this.success.bind(this, 'create', this.successCallback),
          this.error.bind(this, 'create')
        );
      }
    }
  }
);
