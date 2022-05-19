const chai=require('chai');
const expect=chai.expect;
const calculator=require('../utils/calculator');
describe('Calculator',()=>{
    describe('Addition',()=>{
        it('shoult sum numbers',()=>{
            expect(calculator.add(1,2)).to.equal(3)
            expect(calculator.add(50,39)).to.equal(89)
        })
    })
    describe('Subtraction', () => {
        it('should subtract two numbers', () => {
            expect(calculator.substract(6, 2)).to.equal(4)
            expect(calculator.substract(50, 39)).to.equal(11)
            })
      })
     describe('Multiplication', () => {
        it('should multiply two numbers', () => {
            expect(calculator.multiply(3, 2)).to.equal(6)
            expect(calculator.multiply(-31, 32)).to.equal(-992)
            expect(calculator.multiply(-5, -2)).to.equal(10)
           })
      })
   
   describe('Division', () => {
      it('should divide two numbers', () => {
          expect(calculator.divide(4, 2)).to.equal(2)
          expect(calculator.divide(50, 5)).to.equal(10)
       })
      it('should return NaN if the denominator is zero', () => {
         expect(calculator.divide(4, 0)).to.equal(undefined)
         expect(calculator.divide(-15, 0)).to.equal(undefined)
         })
     })
})
