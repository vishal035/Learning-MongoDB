const calculateTip = (total, tipPercent = 0.25) => total + total * tipPercent;

const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8;
const CelsiusToFahrenheit = (temp) => temp * 1.8 + 32;

const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject('Number Should be Positive');
      }
      resolve(a + b);
    }, 2000);
  });
};

module.exports = { calculateTip, fahrenheitToCelsius, CelsiusToFahrenheit , asyncAdd};
