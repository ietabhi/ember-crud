export default Ember.Mixin.create(
  {
    actions: {
      save: function() {
        this.get('controller.model').save().then(
          this.success.bind(this, 'save', this.successCallback),
          this.error.bind(this, 'save')
        );
      }
    }
  }
);
