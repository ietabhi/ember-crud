import Setup from "ember-crud/routes/mixins/setup";
import Success from "ember-crud/routes/mixins/success";
import Error from "ember-crud/routes/mixins/error";
import Save from "ember-crud/routes/mixins/save";
import Cancel from "ember-crud/routes/mixins/cancel";
import Delete from "ember-crud/routes/mixins/delete";

export default Ember.Route.extend(
  Setup,
  Success,
  Error,
  Save,
  Cancel,
  Delete,
  {
    model: function(params) {
      if (this.get('crud.model')) {
        return this.store.find(this.get('crud.model'), params.id);
      } else {
        return this._super();   
      }
    }
  }
);
