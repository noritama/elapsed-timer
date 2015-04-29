/* global describe, it */
'use strict';

var assert = require('power-assert');
var et = require('../');

describe('Timer', function() {

  it('should return a timer instance', function() {
    var timer = new et.Timer('test');
    assert.ok(timer);
    assert(timer instanceof et.Timer);
  });

  describe('#start', function() {

    it('should start a timer', function() {
      var timer = new et.Timer('test');
      timer.start();
      assert.ok(timer._start);
    });

  });

  describe('#end', function() {

    it('should end a timer', function(done) {
      var timer = new et.Timer('test');
      timer.start();
      setTimeout(function() {
        timer.end();
        assert.ok(timer._end);
        done();
      }, 10);
    });

  });

  describe('#diff', function() {

    it('should get a duration of timer', function(done) {
      var timer = new et.Timer('test');
      timer.start();
      setTimeout(function() {
        timer.end();
        var result = timer.diff();
        assert.ok(result);
        assert(result >= 10);
        done();
      }, 10);
    });

  });
});
