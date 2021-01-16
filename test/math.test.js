const {
  calculateTip,
  fahrenheitToCelsius,
  CelsiusToFahrenheit,
  asyncAdd,
} = require('../src/math');
test('Should Calculate tip', () => {
  const total = calculateTip(10, 0.3);

  expect(total).toBe(13);

  //   if (total !== 13) {
  //     throw new Error('Total should be equal to 13. Got ' + total);
  //   }
});

test('Should Calculate default tip', () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test('Should Convert 32 F to 0 C', () => {
  const temp = fahrenheitToCelsius(32);
  expect(temp).toBe(0);
});
test('Should Convert 32 F to 0 C', () => {
  const temp = CelsiusToFahrenheit(0);
  expect(temp).toBe(32);
});

// test('Add', (done) => {
//   asyncAdd(2, 3).then((sum) => {
//     expect(sum).toBe(5);
//     done();
//   });
// });
// test('Async func demo', async () => {
//   const sum = await asyncAdd(2, 3);
//   expect(sum).toBe(5);
// });
