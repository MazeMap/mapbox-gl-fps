(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MapboxFPS", [], factory);
	else if(typeof exports === 'object')
		exports["MapboxFPS"] = factory();
	else
		root["MapboxFPS"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var arr = {
    max: function max(array) {
        return Math.max.apply(null, array);
    },

    min: function min(array) {
        return Math.min.apply(null, array);
    },

    range: function range(array) {
        return arr.max(array) - arr.min(array);
    },

    midrange: function midrange(array) {
        return arr.range(array) / 2;
    },

    sum: function sum(array) {
        var num = 0;
        for (var i = 0, l = array.length; i < l; i++) {
            num += array[i];
        }return num;
    },

    mean: function mean(array) {
        return arr.sum(array) / array.length;
    },

    median: function median(array) {
        array.sort(function (a, b) {
            return a - b;
        });
        var mid = array.length / 2;
        return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
    },

    modes: function modes(array) {
        if (!array.length) return [];
        var modeMap = {},
            maxCount = 0,
            modes = [];

        array.forEach(function (val) {
            if (!modeMap[val]) modeMap[val] = 1;else modeMap[val]++;

            if (modeMap[val] > maxCount) {
                modes = [val];
                maxCount = modeMap[val];
            } else if (modeMap[val] === maxCount) {
                modes.push(val);
                maxCount = modeMap[val];
            }
        });
        return modes;
    },

    variance: function variance(array) {
        var mean = arr.mean(array);
        return arr.mean(array.map(function (num) {
            return Math.pow(num - mean, 2);
        }));
    },

    standardDeviation: function standardDeviation(array) {
        return Math.sqrt(arr.variance(array));
    },

    meanAbsoluteDeviation: function meanAbsoluteDeviation(array) {
        var mean = arr.mean(array);
        return arr.mean(array.map(function (num) {
            return Math.abs(num - mean);
        }));
    },

    zScores: function zScores(array) {
        var mean = arr.mean(array);
        var standardDeviation = arr.standardDeviation(array);
        return array.map(function (num) {
            return (num - mean) / standardDeviation;
        });
    }
};
arr.average = arr.mean;

exports.default = arr;
module.exports = exports["default"];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FPSControl = exports.FPSMeasurer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _arrStat = __webpack_require__(0);

var stat = _interopRequireWildcard(_arrStat);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    by Dag Jomar Mersland
    @dagjomar
*/

var INTERVAL = 500;

var now = function now() {
    if (window && window.performance) {
        return window.performance.now();
    }

    return Date.now();
};

var FPSMeasurer = exports.FPSMeasurer = function () {
    function FPSMeasurer() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, FPSMeasurer);

        this.options = opts;

        this.framesCounter = 0;
        this.lastFPSTimestamp = null;
        this.lastFPSMeasure = 0;

        this.measurements = [];
        this.lastMeasurementTimestamp = null;

        this.started = false;
    }

    _createClass(FPSMeasurer, [{
        key: 'startMeasuring',
        value: function startMeasuring(time) {
            this.started = true;
            this.updateFPS();

            if (time && !isNaN(time) && time > 0) {
                setTimeout(this.stopMeasuring.bind(this), time);
            }
        }
    }, {
        key: 'stopMeasuring',
        value: function stopMeasuring() {
            this.started = false;
        }
    }, {
        key: 'registerRenderFrame',
        value: function registerRenderFrame() {
            if (!this.started) {
                return;
            }

            this.framesCounter++;
            this.updateFPS();
        }
    }, {
        key: 'getLastMeasurement',
        value: function getLastMeasurement() {
            var last = this.measurements.length ? this.measurements[this.measurements.length - 1] : 0;
            return last;
        }
    }, {
        key: 'updateFPS',
        value: function updateFPS() {
            if (this.lastFPSTimestamp === null) {
                this.lastFPSTimestamp = now();
            }
            var timestamp = now(); //console.log('@@ updateFPS', timestamp, this);
            var delta = timestamp - this.lastFPSTimestamp;

            if (delta > INTERVAL) {
                var fps = Math.round(this.framesCounter / (delta / 1000) * 10) / 10; // Round to 1 decimal
                this.lastFPSTimestamp = timestamp;
                this.framesCounter = 0; // Reset the framesCounter

                this.recordMeasurement(fps, delta);
            }
        }
    }, {
        key: 'recordMeasurement',
        value: function recordMeasurement(fps, delta) {
            this.measurements.push(fps);
        }
    }, {
        key: 'getMeasurements',
        value: function getMeasurements() {
            var copy = this.measurements.slice();
            return copy;
            //return [1, 2, 3];
        }
    }, {
        key: 'getMeasurementsReport',
        value: function getMeasurementsReport() {
            var measurements = this.getMeasurements();
            var report = {
                measurements: measurements,
                median: Number(stat.median(measurements).toFixed(1)),
                average: Number(stat.average(measurements).toFixed(1)),
                variance: Number(stat.variance(measurements).toFixed(1)),
                stdDev: Number(stat.standardDeviation(measurements).toFixed(1))
            };

            return report;
        }
    }]);

    return FPSMeasurer;
}();

var FPSControl = exports.FPSControl = function () {
    function FPSControl() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { className: 'fps-control' };

        _classCallCheck(this, FPSControl);

        this.measurer = new FPSMeasurer();
        this.options = opts;

        this.countRenderBound = this.measurer.registerRenderFrame.bind(this.measurer);
        this.updateFPSCounterBound = this.updateFPSCounter.bind(this);

        this.lastFPSMeasure = null;
    }

    _createClass(FPSControl, [{
        key: 'updateFPSCounter',
        value: function updateFPSCounter() {
            var fps = this.measurer.getLastMeasurement();
            if (fps === this.lastFPSMeasure) {
                return;
            }
            this._container.innerHTML = fps.toFixed(1);
        }
    }, {
        key: 'onAdd',
        value: function onAdd(map) {
            this._map = map;
            this._container = document.createElement('div');
            this._container.className = this.options.className + ' mapboxgl-ctrl-group mapboxgl-ctrl';

            this.addEventListeners();
            this.measurer.startMeasuring();
            return this._container;
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.onRemove();
        }
    }, {
        key: 'onRemove',
        value: function onRemove() {
            this.removeEventListeners();
            this.measurer.stopMeasuring();
            this._container.remove();
        }
    }, {
        key: 'addEventListeners',
        value: function addEventListeners() {
            this._map.on('render', this.countRenderBound);
            this._map.on('render', this.updateFPSCounterBound);
            // this.updateInterval = setInterval( this.updateFPSCounter.bind(this), 1000);
        }
    }, {
        key: 'removeEventListeners',
        value: function removeEventListeners() {
            this._map.off('render', this.countRenderBound);
            this._map.off('render', this.updateFPSCounterBound);
        }
    }]);

    return FPSControl;
}();

/***/ })
/******/ ]);
});
//# sourceMappingURL=MapboxFPS.js.map