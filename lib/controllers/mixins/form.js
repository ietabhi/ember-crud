export default Ember.Mixin.create(
  {
    submitEnabled: function() {
      if (typeof(this.get('isValid')) !== 'undefined') {
        return this.get('isValid');
      } else {
        return true;
      }
    }.property('isValid'),
    submitDisabled: function() {
      return !this.get('submitEnabled');
    }.property('submitEnabled')
  }
);
