export default Ember.Mixin.create({
  actions: {
    cancel: function() {
      this.get('controller.model').rollback();
      if (this.cancelCallback && typeof(this.cancelCallback) === 'function') {
        this.cancelCallback();
      } else if (this.successCallback && typeof(this.successCallback) === 'function') {
        this.successCallback();
      }
    }
  }
});
