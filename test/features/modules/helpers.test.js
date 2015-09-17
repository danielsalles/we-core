var assert = require('assert');
var helpers = require('we-test-tools').helpers;


describe('coreHelpers', function () {
  var we;

  before(function (done) {
    we = helpers.getWe();
    done();
  });

  describe('canHelper', function () {
    var helper;

    before(function (done) {
      helper = require('../../../server/helpers/can.js')(we);
      done();
    });

    it('canHelper should should run fn if user has access to permission', function (done) {
      helper.bind({
        context: 'ctx'
      })({
        hash: {
          permission: 'find_user',
          roles: ['authenticated']
        },
        fn: function(ctx) {
          assert(ctx);
          assert.equal('ctx', ctx.context);
          done();
        }
      });
    });

    it('canHelper should run inverse if user done have access to permission', function (done) {
      we.config.acl.disabled = false;
      helper.bind({
        context: 'ctx'
      })({
        hash: {
          permission: 'find_user',
          roleNames: ['authenticated']
        },
        inverse: function(ctx) {
          assert(ctx);
          assert.equal('ctx', ctx.context);
          we.config.acl.disabled = true;
          done();
        }
      });
    });
  });

  describe('ifCondHelper', function () {
    var helper;

    before(function (done) {
      helper = require('../../../server/helpers/ifCond.js')(we);
      done();
    });

    it('ifCondHelper should should run fn if v1 === v2 ', function (done) {
      helper.bind({
        context: 'ctx'
      })(1, 1, {
        fn: function(ctx) {
          assert.equal('ctx', ctx.context);
          done();
        }
      });
    });

    it('ifCondHelper should run inverse v1 !== v2', function (done) {
      helper.bind({
        context: 'ctx'
      })(1, 2, {
        inverse: function(ctx) {
          assert.equal('ctx', ctx.context);
          done();
        }
      });
    });
  });
});