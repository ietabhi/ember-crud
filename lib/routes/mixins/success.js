export default Ember.Mixin.create(
  {
    success: function (action, callback, result) {
      noty({
        type: 'success',
        text: Ember.I18n.t(
          'crud.' + action + '.success',
          { model: this.get('crud.name.singular') }
        )
      });
      if (callback && typeof(callback) === 'function') {
        callback.bind(this)(result);
      }
    },
    successCallback: function(result) {
      if (this.get('crud.routes.index')) {
        this.transitionTo(this.get('crud.routes.index'));
      }
    }
  }
);
