export default Ember.Mixin.create(
  {
    error: function (action, callback, result) {
      noty({
        type: 'warning',
        text: Ember.I18n.t(
          'crud.' + action + '.error',
          { model: this.get('crud.name.singular') }
        )
      });
      if (callback && typeof(callback) === 'function') {
        callback.bind(this)(result);
      }
    }
  }
);
