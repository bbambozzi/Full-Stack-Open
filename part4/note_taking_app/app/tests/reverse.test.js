const reverse = require('../utils/for_testing').reverse
const average = require('../utils/for_testing').average

test('reverse of a', () => {
  const result = reverse('a')
  expect(result).toBe('a')
})


test('reverse of react', () => {
  const result = reverse('react')
  expect(result).toBe('tcaer')
})

test('reverse of racecar', () => {
  const result = reverse('racecar')
  expect(result).toBe('racecar')
})


describe('average', () => {
  test('of one the value is one', () => {
    expect(average([1])).toBe(1)
  })
  test('of one to 6 (many elements)', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })
  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})
