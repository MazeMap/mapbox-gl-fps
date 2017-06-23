/* global describe, it, before */

import chai from 'chai';
import { FPSMeasurer } from '../lib/MapboxFPS.js';

chai.expect();

const expect = chai.expect;


describe('Given an instance of my FPSMeasurer', () => {

  let measurer = new FPSMeasurer();

  describe('when I render a frame each 100 ms for 1.2s', function() {

      this.timeout(2600);

      before(function(){
        measurer.startMeasuring();

        setTimeout(function(){ measurer.registerRenderFrame(); }, 110);
        setTimeout(function(){ measurer.registerRenderFrame(); }, 210);
        setTimeout(function(){ measurer.registerRenderFrame(); }, 310);
        setTimeout(function(){ measurer.registerRenderFrame(); }, 410);
        setTimeout(function(){ measurer.registerRenderFrame(); }, 510);
        setTimeout(function(){ measurer.registerRenderFrame(); }, 610);
        setTimeout(function(){ measurer.registerRenderFrame(); }, 710);
        setTimeout(function(){ measurer.registerRenderFrame(); }, 810);
        setTimeout(function(){ measurer.registerRenderFrame(); }, 910);
        setTimeout(function(){ measurer.registerRenderFrame(); }, 1010);
        setTimeout(function(){ measurer.registerRenderFrame(); }, 1110);
        setTimeout(function(){ measurer.registerRenderFrame(); }, 1210);

        setTimeout(function(){ measurer.stopMeasuring() }, 2010);
      });

      it('should registered 2 measurements rounded to 10 fps each', (done) => {
        setTimeout(function(){
          var measurements = measurer.getMeasurements();
          expect( measurements.length ).to.be.equal(2);
          expect( Math.round(measurements[0]) ).to.be.equal(10);
          expect( Math.round(measurements[1]) ).to.be.equal(10);
          done();
        }, 2020);
      });


      it('should be able to get the last measurement done', () => {
        var last = measurer.getLastMeasurement();
        expect( Math.round(last) ).to.be.equal( 10 );
      });

  });

  describe('when I get a report', () => {
      let report;
      before(() => {
        report = measurer.getMeasurementsReport();
      })

      it('should have a measurements array', () => {
        expect( report.measurements ).to.be.a('array');
        expect( report.measurements.length ).to.be.equal(2);
      });

      it('should have an average', () => {
        expect( Math.round(report.average) ).to.be.equal(10);
      });

      it('should have a median', () => {
        expect( Math.round(report.median) ).to.be.equal(10);
      });

      it('should have a variance', () => {
        expect( Math.round(report.variance) ).to.be.equal(0);
      });

      it('should have a stdDev', () => {
        expect( Math.round(report.stdDev) ).to.be.equal(0);
      });

  });
});



describe('Given an instance of my FPSMeasurer', () => {

  let measurer = new FPSMeasurer();

  describe('when I tell it to measure for only 1.4 seconds', function() {

      this.timeout(2500);

      before(function(){
        measurer.startMeasuring(1400);
        var interval = setInterval( () => { measurer.registerRenderFrame() }, 20);
        setTimeout( () => { clearInterval(interval); }, 2000);
      });

      it('should stop have stopped itself', (done) => {
        setTimeout(function(){
          expect( measurer.started ).to.be.equal(false);
          done();
        }, 2100)
      });

      it('should have done 2 measurements', () => {
          var report = measurer.getMeasurementsReport();
          expect( report.measurements.length ).to.be.equal(2);
      });

      it('should have an average between 40-50 fps', () => {
          var report = measurer.getMeasurementsReport();
          var avgBetween = ( report.average  > 40 ) && ( report.average < 50 );
          expect( avgBetween ).to.be.equal(true);
      });

  });
});
