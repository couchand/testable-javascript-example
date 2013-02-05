require.config({
  deps: ['main'],
  paths: {
    jquery: '../lib/jquery/jquery',
    underscore: '../lib/underscore/underscore'
  },
  shim: {
    underscore: {
      exports: '_'
    }
  }
});
