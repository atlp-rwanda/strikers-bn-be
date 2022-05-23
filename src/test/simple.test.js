import chai from 'chai';
import {
  add, substract, multiply, divide
} from '../utils/calculator';

const { expect } = chai;
describe('Calculator', () => {
  describe('Addition', () => {
    it('shoult sum numbers', () => {
      expect(add(1, 2)).to.equal(3);
      expect(add(50, 39)).to.equal(89);
    });
  });
  describe('Subtraction', () => {
    it('should subtract two numbers', () => {
      expect(substract(6, 2)).to.equal(4);
      expect(substract(50, 39)).to.equal(11);
    });
  });
  describe('Multiplication', () => {
    it('should multiply two numbers', () => {
      expect(multiply(3, 2)).to.equal(6);
      expect(multiply(-31, 32)).to.equal(-992);
      expect(multiply(-5, -2)).to.equal(10);
    });
  });
  describe('Division', () => {
    it('should divide two numbers', () => {
      expect(divide(4, 2)).to.equal(2);
      expect(divide(50, 5)).to.equal(10);
    });
    it('should return NaN if the denominator is zero', () => {
      expect(divide(4, 0)).to.equal(undefined);
      expect(divide(-15, 0)).to.equal(undefined);
    });
  });
});
