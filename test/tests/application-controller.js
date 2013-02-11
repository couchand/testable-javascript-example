define([
  'template-store',
  'application-controller',
  'people',
  'jquery'
], function( TemplateStore, ApplicationController, People, $ ) {

  suite('ApplicationController', function() {

    suite('onLike', function() {
      setup(function() {
        this.likes = {
          add: new sinon.spy()
        };
      });
      teardown(function() {
        $( document ).off('like search');
      });

      test('calls likes.add with the person', function() {
        var ac = new ApplicationController();
        ac.registerLikes( this.likes );

        $( document ).trigger( 'like', 'foobar' );

        assert.ok(this.likes.add.calledOnce);
      });
    });

    suite('onSearch', function() {
     setup(function() {
        this.search = sinon.stub( People, 'findByName' );
        this.templates = sinon.stub( TemplateStore.prototype, 'fetch' );
        this.results = {
          block: new sinon.spy(),
          update: new sinon.spy()
        };
      });
      teardown(function() {
        $( document ).off('like search');
        this.search.restore();
        this.templates.restore();
      });

      test('searches for people', function() {
        var ac = new ApplicationController();
        ac.registerResults( this.results );

        // search once and hang
        this.search.returns(new $.Deferred());

        $( document ).trigger( 'search', 'foobar' );

        assert.ok(this.search.calledOnce);
        assert.ok(this.results.block.calledOnce);
      });

      test('updates the results', function() {
        var ac = new ApplicationController();
        ac.registerResults( this.results );

        this.search.returns(['bar']);
        this.templates.returns('baz');

        $( document ).trigger( 'search', 'foo' );

        assert.ok(this.results.update.calledOnce);
        assert.ok(this.results.update.calledWithExactly(['bar'], 'baz', 'baz'));
      });

      test('ignores intervening events', function() {
        var ac = new ApplicationController();
        ac.registerResults( this.results );

        // search once and hang
        this.search.returns(new $.Deferred());
        $( document ).trigger( 'search', 'foobar' );
        assert.ok(this.search.calledOnce);
        assert.ok(this.results.update.notCalled);

        // reset spy
        this.search.reset();
        this.search.returns(['foobar']);

        $( document ).trigger( 'search', 'foobar' );

        assert.ok(this.search.notCalled);
        assert.ok(this.results.update.notCalled);
      });
    });
  });
});
