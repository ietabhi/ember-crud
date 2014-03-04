import Setup from "ember-crud/routes/mixins/setup";
import Success from "ember-crud/routes/mixins/success";
import Error from "ember-crud/routes/mixins/error";

export default Ember.Route.extend(
  Setup,
  Success,
  Error,
  {
    
  }
);
