const Sum = require('./sum.js');

module.exports = function (req, res) {
  const sum = new Sum([1, 3, 5, 7]);
  const summed = sum.sum;
  res.json({ name: 'api response: ' + summed });
};

