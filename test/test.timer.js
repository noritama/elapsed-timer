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

describe('Metric', function() {

  function exec(name) {
    var timer = et.timer(name);
    setTimeout(function() {
      timer.end();
    }, 10);
  }

  it('should get metrics', function(done) {
    for (var i = 0; i < 100; i++) {
      exec('metricTest');
    }

    setTimeout(function() {
      var metric = et.metrics.metricTest;
      assert.ok(metric);
      assert(metric.count() === 100);
      assert.ok(metric.average());
      assert.ok(metric.min());
      assert.ok(metric.max());
      assert.ok(metric.duration());
      done();
    }, 20);
  });

  it('should clear metric', function(done) {
    for (var i = 0; i < 10; i++) {
      exec('clearTest');
    }

    setTimeout(function() {
      var metric = et.metrics.clearTest;
      assert.ok(metric);
      assert(metric.count() === 10);

      metric.clear();

      assert(metric.count() === 0);
      done();
    }, 20);
  });
});

