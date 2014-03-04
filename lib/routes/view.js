import Setup from "ember-crud/routes/mixins/setup";

export default Ember.Route.extend(
  Setup,
  {
    model: function(params) {
      return this.store.find(this.get('crud.model'), params.id);
    }
  }
);
