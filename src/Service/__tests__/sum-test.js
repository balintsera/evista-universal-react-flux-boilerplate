'use strict'

jest.dontMock('../sum');

describe('sum', function() {
  // Expectation
  it('sums arguments: 1 + 3 + 5 equal 9', function(){
    const Sum = require('../sum');
    const sum = new Sum([1, 3, 5]);
    const summed = sum.sum;
    expect(summed).toBe(9);
  });
});
