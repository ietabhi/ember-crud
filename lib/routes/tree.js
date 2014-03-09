import Setup from "ember-crud/routes/mixins/setup";
import Success from "ember-crud/routes/mixins/success";
import Error from "ember-crud/routes/mixins/error";
import Delete from "ember-crud/routes/mixins/delete";

export default Ember.Route.extend(
  Setup,
  Success,
  Error,
  Delete,
  {
    model: function() {
      if (this.get('crud.model')) {
        return this.store.find(this.get('crud.model'));
      } else {
        return this._super();   
      }
    }
  }
);
