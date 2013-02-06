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

        expect(this.likes.add).to.have.been.calledOnce;
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

        expect(this.search).to.have.been.calledOnce;
        expect(this.results.block).to.have.been.calledOnce;
      });

      it('updates the results', function() {
        var ac = new ApplicationController();
        ac.registerResults( this.results );

        this.search.returns(['bar']);
        this.templates.returns('baz');

        $( document ).trigger( 'search', 'foo' );

        expect(this.results.update).to.have.been.calledOnce;
        expect(this.results.update).to.have.been.calledWithExactly(['bar'], 'baz', 'baz');
      });

      it('ignores intervening events', function() {
        var ac = new ApplicationController();
        ac.registerResults( this.results );

        // search once and hang
        this.search.returns(new $.Deferred());
        $( document ).trigger( 'search', 'foobar' );
        expect(this.search).to.have.been.calledOnce;
        expect(this.results.update).to.not.have.been.called;

        // reset spy
        this.search.reset();
        this.search.returns(['foobar']);

        $( document ).trigger( 'search', 'foobar' );

        expect(this.search).to.not.have.been.called;
        expect(this.results.update).to.not.have.been.called;
      });
    });
  });
});
