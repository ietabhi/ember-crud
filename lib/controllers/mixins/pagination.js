export default Ember.Mixin.create(
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
