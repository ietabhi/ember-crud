export default Ember.Mixin.create(
  {
    actions: {
      'delete': function(entity, name) {
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
