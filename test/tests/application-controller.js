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
      it('calls like.add with the person', function() {
        var ac = new ApplicationController();
        ac.registerLikes( this.likes );

        $( document ).trigger( 'like', 'foobar' );

        this.likes.add.callCount.should.equal(1);
      });
    });

    describe('onSearch', function() {
     beforeEach(function() {
        this.search = sinon.stub( People, 'findByName' ).returns(['foobar']);
        this.templates = sinon.stub( TemplateStore.prototype, 'fetch' ).returns('baz');
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

        $( document ).trigger( 'search', 'foobar' );

        this.search.callCount.should.equal(1);
        this.results.block.callCount.should.equal(1);
      });
      it('updates the results', function() {
        var ac = new ApplicationController();
        ac.registerResults( this.results );

        $( document ).trigger( 'search', 'foobar' );

        this.results.update.callCount.should.equal(1);
        this.results.update.calledWith(['foobar'], 'baz').should.equal(true);
      });
      it('ignores intervening events', function() {
        var ac = new ApplicationController();
        ac.registerResults( this.results );

        // search once and hang
        this.search.returns(new $.Deferred());
        $( document ).trigger( 'search', 'foobar' );
        this.search.callCount.should.equal(1);
        this.results.update.callCount.should.equal(0);

        // reset spy
        this.search.reset();
        this.search.returns(['foobar']);

        $( document ).trigger( 'search', 'foobar' );

        this.search.callCount.should.equal(0);
        this.results.update.callCount.should.equal(0);
      });
    });

  });

});
