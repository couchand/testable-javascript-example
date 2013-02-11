define([
  'template-store',
  'application-controller',
  'people',
  'jquery'
], function( TemplateStore, ApplicationController, People, $ ) {

  describe('ApplicationController', function() {

    describe('onLike', function() {
      beforeEach(function() {
        this.likes = {
          add: new sinon.spy()
        };
      });
      afterEach(function() {
        $( document ).off('like search');
      });

      it('calls likes.add with the person', function() {
        var ac = new ApplicationController();
        ac.registerLikes( this.likes );

        $( document ).trigger( 'like', 'foobar' );

        assert.ok(this.likes.add.calledOnce);
      });
    });

    describe('onSearch', function() {
     beforeEach(function() {
        this.search = sinon.stub( People, 'findByName' );
        this.templates = sinon.stub( TemplateStore.prototype, 'fetch' );
        this.results = {
          block: new sinon.spy(),
          update: new sinon.spy()
        };
      });
      afterEach(function() {
        $( document ).off('like search');
        this.search.restore();
        this.templates.restore();
      });

      it('searches for people', function() {
        var ac = new ApplicationController();
        ac.registerResults( this.results );

        // search once and hang
        this.search.returns(new $.Deferred());

        $( document ).trigger( 'search', 'foobar' );

        assert.ok(this.search.calledOnce);
        assert.ok(this.results.block.calledOnce);
      });

      it('updates the results', function() {
        var ac = new ApplicationController();
        ac.registerResults( this.results );

        this.search.returns(['bar']);
        this.templates.returns('baz');

        $( document ).trigger( 'search', 'foo' );

        assert.ok(this.results.update.calledOnce);
        assert.ok(this.results.update.calledWithExactly(['bar'], 'baz', 'baz'));
      });

      it('ignores intervening events', function() {
        var ac = new ApplicationController();
        ac.registerResults( this.results );

        // search once and hang
        this.search.returns(new $.Deferred());
        $( document ).trigger( 'search', 'foobar' );
        assert.ok(this.search.calledOnce);
        assert.ok(this.results.update.not.called);

        // reset spy
        this.search.reset();
        this.search.returns(['foobar']);

        $( document ).trigger( 'search', 'foobar' );

        assert.ok(this.search.not.called);
        assert.ok(this.results.update.not.called);
      });
    });
  });
});
