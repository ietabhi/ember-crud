define("ember-crud/controllers/mixins/form", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create(
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
  });
define("ember-crud/controllers/mixins/pagination", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create(
      {
        sortProperties: ['id'],
        sortAscending:  true,
        page:           1,
        perPage:        20,
        paginatedContent: function() {
          var page, perPage, start, end;
          page    = this.get('page');
          perPage = this.get('perPage');
          start   = (page - 1 ) * perPage;
          end     = page * perPage;
          return this.get('arrangedContent').slice(start, end);
        }.property('arrangedContent.[]', 'page', 'perPage'),
        numPages: function() {
          var result;
          result = parseInt(this.get('content.length') / this.get('perPage'), 10);
          if (this.get('content.length') % this.get('perPage') > 0) {
            result++;
          }
          return result;
        }.property('content.[]', 'perPage'),
        actions: {
          prevPage: function() {
              if (this.get('page') > 1) {
                  this.decrementProperty('page');
              }
          },
          nextPage: function() {
              if (this.get('page') < this.get('numPages')) {
                  this.incrementProperty('page');
              }
          },
          loadPage: function(pageNumber) {
              if (pageNumber >= 1 && pageNumber <= this.get('numPages')) {
                  this.set('page', pageNumber);
              }
          }
        }
      }
    );
  });
define("ember-crud/routes/edit", 
  ["ember-crud/routes/mixins/setup","ember-crud/routes/mixins/success","ember-crud/routes/mixins/error","ember-crud/routes/mixins/save","ember-crud/routes/mixins/cancel","ember-crud/routes/mixins/delete","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __exports__) {
    "use strict";
    var Setup = __dependency1__["default"];
    var Success = __dependency2__["default"];
    var Error = __dependency3__["default"];
    var Save = __dependency4__["default"];
    var Cancel = __dependency5__["default"];
    var Delete = __dependency6__["default"];

    __exports__["default"] = Ember.Route.extend(
      Setup,
      Success,
      Error,
      Save,
      Cancel,
      Delete,
      {
        model: function(params) {
          return this.store.find(this.get('crud.model'), params.id);
        }
      }
    );
  });
define("ember-crud/routes/list", 
  ["ember-crud/routes/mixins/setup","ember-crud/routes/mixins/success","ember-crud/routes/mixins/error","ember-crud/routes/mixins/delete","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Setup = __dependency1__["default"];
    var Success = __dependency2__["default"];
    var Error = __dependency3__["default"];
    var Delete = __dependency4__["default"];

    __exports__["default"] = Ember.Route.extend(
      Setup,
      Success,
      Error,
      Delete,
      {
        model: function() {
          return this.store.find(this.get('crud.model'));
        }
      }
    );
  });
define("ember-crud/routes/mixins/cancel", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create({
      actions: {
        cancel: function() {
          this.get('controller.model').rollback();
          if (this.cancelCallback && typeof(this.cancelCallback) === 'function') {
            this.cancelCallback();
          } else if (this.successCallback && typeof(this.successCallback) === 'function') {
            this.successCallback();
          }
        }
      }
    });
  });
define("ember-crud/routes/mixins/copy", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create(
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
  });
define("ember-crud/routes/mixins/create", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create(
      {
        actions: {
          create: function() {
            this.get('controller.model').save().then(
              this.success.bind(this, 'create', this.successCallback),
              this.error.bind(this, 'create')
            );
          }
        }
      }
    );
  });
define("ember-crud/routes/mixins/delete", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create(
      {
        actions: {
          delete: function(entity, name) {
            bootbox.confirm(
              Ember.I18n.t(
                'crud.delete.confirm',
                {
                  model: this.get('crud.name.singular'),
                  record: name
                }
              ),
              function(entity, status) {
                if (status) {
                  this.send('destroy', entity);
                }
              }.bind(this, entity)
            );
          },
          destroy: function(entity) {
            if (entity) {
              entity.deleteRecord();
              entity.save().then(
                this.success.bind(this, 'delete', this.successCallback),
                this.error.bind(this, 'delete')
              );
            }
          }
        }
      }
    );
  });
define("ember-crud/routes/mixins/error", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create(
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
  });
define("ember-crud/routes/mixins/publish", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create(
      {
        actions: {
          publish: function(model) {
            if (!model) {
              model = this.get('controller.model');
            }
            model.set('publish', true);
            model.save().then(
              this.success.bind(this, 'publish'),
              this.error.bind(this, 'publish')
            );
          }
        }
      }
    );
  });
define("ember-crud/routes/mixins/save", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create(
      {
        actions: {
          save: function() {
            this.get('controller.model').save().then(
              this.success.bind(this, 'save', this.successCallback),
              this.error.bind(this, 'save')
            );
          }
        }
      }
    );
  });
define("ember-crud/routes/mixins/setup", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create(
      {
        setupController: function(controller, model) {
          controller.set('model', model);
          controller.set('crud', this.get('crud'));
        }
      }
    );
  });
define("ember-crud/routes/mixins/success", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create(
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
  });
define("ember-crud/routes/mixins/unpublish", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Mixin.create(
      {
        actions: {
          unpublish: function(model) {
            if (!model) {
              model = this.get('controller.model');
            }
            model.set('publish', false);
            model.save().then(
              this.success.bind(this, 'unpublish'),
              this.error.bind(this, 'unpublish')
            );
          }
        }
      }
    );
  });
define("ember-crud/routes/new", 
  ["ember-crud/routes/mixins/setup","ember-crud/routes/mixins/success","ember-crud/routes/mixins/error","ember-crud/routes/mixins/create","ember-crud/routes/mixins/cancel","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var Setup = __dependency1__["default"];
    var Success = __dependency2__["default"];
    var Error = __dependency3__["default"];
    var Create = __dependency4__["default"];
    var Cancel = __dependency5__["default"];

    __exports__["default"] = Ember.Route.extend(
      Setup,
      Success,
      Error,
      Create,
      Cancel,
      {
        model: function(params) {
          return this.store.createRecord(this.get('crud.model'));
        },
        deactivate: function() {
          this.get('controller.model').rollback();
        }
      }
    );
  });
define("ember-crud/routes/related", 
  ["ember-crud/routes/mixins/setup","ember-crud/routes/mixins/success","ember-crud/routes/mixins/error","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Setup = __dependency1__["default"];
    var Success = __dependency2__["default"];
    var Error = __dependency3__["default"];

    __exports__["default"] = Ember.Route.extend(
      Setup,
      Success,
      Error,
      {
        
      }
    );
  });
define("ember-crud/routes/tree", 
  ["ember-crud/routes/mixins/setup","ember-crud/routes/mixins/success","ember-crud/routes/mixins/error","ember-crud/routes/mixins/delete","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Setup = __dependency1__["default"];
    var Success = __dependency2__["default"];
    var Error = __dependency3__["default"];
    var Delete = __dependency4__["default"];

    __exports__["default"] = Ember.Route.extend(
      Setup,
      Success,
      Error,
      Delete,
      {
        model: function() {
          return this.store.find(this.get('crud.model'));
        }
      }
    );
  });
define("ember-crud/routes/view", 
  ["ember-crud/routes/mixins/setup","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Setup = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend(
      Setup,
      {
        model: function(params) {
          return this.store.find(this.get('crud.model'), params.id);
        }
      }
    );
  });