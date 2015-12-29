'use strict';

class Sum {
  constructor(numbers) {
    this.numbers = numbers;
  }

 /**
  * Get sum
  */
  get sum() {
    let sum = 0;
    this.numbers.map((num) => {
      sum += num;
    });
    return sum;
  }
}

module.exports = Sum;
