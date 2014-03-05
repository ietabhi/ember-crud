# Ember CRUD

The Ember CRUD library includes base Routes and various mixins to help you implement CRUD (Create, Read, Update, Delete) functionality in your Ember app.

## Dependencies

* [bootbox](http://bootboxjs.com/)
* [noty](http://ned.im/noty/)

## What's Included

### Action Mixins

Actions you can include in your routes:

* [setup](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/setup.js)
* [create](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/create.js)
* [save](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/save.js)
* [copy](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/copy.js)
* [publish](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/publish.js)
* [unpublish](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/unpublish.js)
* [delete](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/delete.js)
* [cancel](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/cancel.js)
* [success](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/success.js)
* [error](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/mixins/error.js)

### Base Routes

Base routes you can extend from.

Handles retrieval of model and includes default actions listed below:

* [list](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/list.js)
    * setup
    * delete
    * success
    * error
* [tree](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/tree.js)
    * setup
    * delete
    * success
    * error
* [view](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/view.js)
    * setup
* [new](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/new.js)
    * setup
    * create
    * cancel
    * success
    * error
* [edit](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/edit.js)
    * setup
    * save
    * cancel
    * delete
    * success
    * error
* [related](https://github.com/ryandjurovich/ember-crud/blob/master/lib/routes/related.js)
    * setup
    * success
    * error

### Controller Mixins

Mixins for your controllers:

* [pagination](https://github.com/ryandjurovich/ember-crud/blob/master/lib/controllers/mixins/pagination.js)
* [form](https://github.com/ryandjurovich/ember-crud/blob/master/lib/controllers/mixins/form.js)
