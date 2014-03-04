export default Ember.Mixin.create(
  {
    clone: function (oldObject) {
      var newObject = oldObject.toJSON();
      for (var key in newObject) {
        if (newObject[key] !== oldObject.get(key)) {
          newObject[key] = oldObject.get(key);
        }
      }
      newObject.id = null;
      return newObject;
    },
    actions: {
      copy: function(action, model) {
        var callback = this.copyCallback ? this.copyCallback : this.successCallback;
        action = action ? action : 'copy';
        this.store.createRecord(
          this.get('crud.model'),
          this.clone(model)
        ).save().then(
          this.success.bind(this, action, callback),
          this.error.bind(this, action)
        );
      }
    },
    copyCallback: function() {
    }
  }
);
