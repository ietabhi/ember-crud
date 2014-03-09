import Setup from "ember-crud/routes/mixins/setup";

export default Ember.Route.extend(
  Setup,
  {
    model: function(params) {
      if (this.get('crud.model')) {
        return this.store.find(this.get('crud.model'), params.id);
      } else {
        return this._super(params);
      }
    }
  }
);
