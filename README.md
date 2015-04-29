elapsed-timer
===============

## Description

A node.js module to calculate block execution time.

## Install

```
npm install elapsed-timer
```

## Usage

### Timer

```
var et = require('elapsed-timer');

var myTimer = new et.Timer('myTimer');
```

#### Timer.prototype.start()

Start this timer.

#### Timer.prototype.end()

Stop this timer;

#### Timer.prototype.diff()

Return duration milliseconds.

### Metrics

```
var et = require('elapsed-timer');

var myMetric = et.metrics.myMetric;
```

#### metric.average()

Get the average time.

#### metric.min()

Get the minimum time.

#### metric.max()

Get the maximum time.

#### metric.count()

Get the number of timers.

#### metric.duration()

Get the total duration of timers.

#### metric.clear()

Clear value of this metric.

