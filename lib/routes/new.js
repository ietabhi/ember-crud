import Setup from "ember-crud/routes/mixins/setup";
import Success from "ember-crud/routes/mixins/success";
import Error from "ember-crud/routes/mixins/error";
import Create from "ember-crud/routes/mixins/create";
import Cancel from "ember-crud/routes/mixins/cancel";

export default Ember.Route.extend(
  Setup,
  Success,
  Error,
  Create,
  Cancel,
  {
    model: function(params) {
      if (this.get('crud.model')) {
        return this.store.createRecord(this.get('crud.model'));
      } else {
        return this._super();   
      }
    },
    deactivate: function() {
      this.get('controller.model').rollback();
    }
  }
);
