'use strict';

var metrics = {};

function metric(name) {
  if (metrics[name])
    return metrics[name];

  metrics[name] = {
    add: function(timer) {
      this._count++;
      var diff = timer.diff();
      this._duration += diff;
      if (diff < this._min)
        this._min = diff;
      if (diff > this._max)
        this._max = diff;
    },
    clear: function() {
      this._count = 0;
      this._duration = 0;
      this._min = Infinity;
      this._max = -Infinity;
    },
    average: function() {
      return this._duration / this._count;
    },
    min: function() {
      return this._min;
    },
    max: function() {
      return this._max;
    },
    count: function() {
      return this._count;
    },
    duration: function() {
      return this._duration;
    }
  };

  metrics[name].clear();
  return metrics[name];
}

/**
 * Timer Constructor
 * @param {string} name
 */
function Timer(name) {
  this.name = name;
  this._start = undefined;
  this._end = undefined;
}

/**
 * Start the timer.
 */
Timer.prototype.start = function() {
  this._start = process.hrtime();
};

/**
 * End the timer.
 */
Timer.prototype.end = function() {
  this._end = process.hrtime(this._start);
  metric(this.name).add(this);
  return this.diff();
};

/**
 * Get the duration of the timer.
 * @return {number} milliseconds
 */
Timer.prototype.diff = function() {
  return this._end[0] * 1000 + ((this._end[1] / 1000000) | 0);
};

function timer(name) {
  var _timer = new Timer(name);
  _timer.start();
  return _timer;
}

module.exports = {
  metrics: metrics,
  Timer: Timer,
  timer: timer
};
