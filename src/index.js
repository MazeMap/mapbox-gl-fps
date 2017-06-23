/*
    by Dag Jomar Mersland
    @dagjomar
*/

const INTERVAL = 500;

import * as stat from './arr-stat.js';

const now = function(){
    if( window && window.performance ){
        return window.performance.now();
    }

    return Date.now();
};

export class FPSMeasurer {
    constructor ( opts = {} ) {

        this.options = opts;

        this.framesCounter = 0;
        this.lastFPSTimestamp = null;
        this.lastFPSMeasure = 0;

        this.measurements = [];
        this.lastMeasurementTimestamp = null;

        this.started = false;
    }

    startMeasuring ( time ){
        this.started = true;
        this.updateFPS();

        if(time && !isNaN(time) && time > 0){
            setTimeout( this.stopMeasuring.bind(this), time);
        }
    }

    stopMeasuring (){
        this.started = false;
    }

    registerRenderFrame (){
        if(!this.started){ return; }

        this.framesCounter++;
        this.updateFPS();
    }

    getLastMeasurement (){
        var last = this.measurements.length ? this.measurements[ this.measurements.length - 1 ] : 0;
        return last;
    }

    updateFPS (){
        if(this.lastFPSTimestamp === null){
            this.lastFPSTimestamp = now();
        }
        var timestamp = now(); //console.log('@@ updateFPS', timestamp, this);
        var delta = timestamp - this.lastFPSTimestamp;

        if(delta > INTERVAL){
            var fps = Math.round( ( this.framesCounter / ( delta / 1000 ) ) * 10 ) / 10; // Round to 1 decimal
            this.lastFPSTimestamp = timestamp;
            this.framesCounter = 0; // Reset the framesCounter

            this.recordMeasurement( fps, delta );
        }
    }

    recordMeasurement (fps, delta){
        this.measurements.push(fps);
    }

    getMeasurements (){
        var copy = this.measurements.slice();
        return copy;
        //return [1, 2, 3];
    }

    getMeasurementsReport (){
        var measurements = this.getMeasurements();
        var report = {
            measurements: measurements,
            median: Number( stat.median(measurements).toFixed(1) ),
            average: Number( stat.average(measurements).toFixed(1) ),
            variance: Number( stat.variance(measurements).toFixed(1) ),
            stdDev: Number( stat.standardDeviation(measurements).toFixed(1) )
        };

        return report;
    }
}

export class FPSControl{
    constructor ( opts = { className: 'fps-control' } ) {
        this.measurer = new FPSMeasurer();
        this.options = opts;

        this.countRenderBound = this.measurer.registerRenderFrame.bind(this.measurer);
        this.updateFPSCounterBound = this.updateFPSCounter.bind(this);

        this.lastFPSMeasure = null;
    }

    updateFPSCounter (){
        var fps = this.measurer.getLastMeasurement();
        if(fps === this.lastFPSMeasure){
            return;
        }
        this._container.innerHTML = fps.toFixed(1);
    }

    onAdd ( map ){
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = this.options.className + ' mapboxgl-ctrl-group mapboxgl-ctrl';

        this.addEventListeners();
        this.measurer.startMeasuring();
        return this._container;
    }

    remove (){
        this.onRemove();
    }

    onRemove () {
        this.removeEventListeners();
        this.measurer.stopMeasuring();
        this._container.remove();
    }

    addEventListeners (){
        this._map.on('render', this.countRenderBound );
        this._map.on('render', this.updateFPSCounterBound );
        // this.updateInterval = setInterval( this.updateFPSCounter.bind(this), 1000);
    }

    removeEventListeners (){
        this._map.off('render', this.countRenderBound);
        this._map.off('render', this.updateFPSCounterBound);
    }
}
