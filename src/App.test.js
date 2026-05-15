import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App, {
  add,
  multiply,
  isEven,
  reverseString,
  factorial,
  isPalindrome,
} from './App';

// ─────────────────────────────────────────────
// 1. UNIT TESTS – Pure utility functions
// ─────────────────────────────────────────────

describe('add()', () => {
  test('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds negative numbers', () => {
    expect(add(-4, -6)).toBe(-10);
  });

  test('adds a positive and a negative number', () => {
    expect(add(10, -3)).toBe(7);
  });

  test('adding zero returns the same number', () => {
    expect(add(5, 0)).toBe(5);
  });

  test('adds decimal numbers', () => {
    expect(add(1.5, 2.5)).toBeCloseTo(4);
  });
});

describe('multiply()', () => {
  test('multiplies two positive numbers', () => {
    expect(multiply(3, 4)).toBe(12);
  });

  test('multiplying by zero returns zero', () => {
    expect(multiply(99, 0)).toBe(0);
  });

  test('multiplying two negatives returns positive', () => {
    expect(multiply(-3, -3)).toBe(9);
  });

  test('multiplying a positive and a negative returns negative', () => {
    expect(multiply(5, -2)).toBe(-10);
  });

  test('multiplies decimals', () => {
    expect(multiply(2.5, 4)).toBeCloseTo(10);
  });
});

describe('isEven()', () => {
  test('returns true for even numbers', () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(0)).toBe(true);
    expect(isEven(100)).toBe(true);
  });

  test('returns false for odd numbers', () => {
    expect(isEven(3)).toBe(false);
    expect(isEven(7)).toBe(false);
    expect(isEven(1)).toBe(false);
  });
});

describe('reverseString()', () => {
  test('reverses a regular string', () => {
    expect(reverseString('hello')).toBe('olleh');
  });

  test('reverses a single character', () => {
    expect(reverseString('a')).toBe('a');
  });

  test('reverses an empty string', () => {
    expect(reverseString('')).toBe('');
  });

  test('reverses a string with spaces', () => {
    expect(reverseString('ab cd')).toBe('dc ba');
  });
});

describe('factorial()', () => {
  test('factorial of 0 is 1', () => {
    expect(factorial(0)).toBe(1);
  });

  test('factorial of 1 is 1', () => {
    expect(factorial(1)).toBe(1);
  });

  test('factorial of 5 is 120', () => {
    expect(factorial(5)).toBe(120);
  });

  test('factorial of 10 is 3628800', () => {
    expect(factorial(10)).toBe(3628800);
  });

  test('throws an error for negative numbers', () => {
    expect(() => factorial(-1)).toThrow(
      'Factorial of negative number is undefined'
    );
  });
});

describe('isPalindrome()', () => {
  test('returns true for "racecar"', () => {
    expect(isPalindrome('racecar')).toBe(true);
  });

  test('returns true for "A man a plan a canal Panama"', () => {
    expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
  });

  test('returns false for a non-palindrome', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  test('single character is always a palindrome', () => {
    expect(isPalindrome('x')).toBe(true);
  });

  test('empty string is a palindrome', () => {
    expect(isPalindrome('')).toBe(true);
  });
});

// ─────────────────────────────────────────────
// 2. COMPONENT / INTEGRATION TESTS
// ─────────────────────────────────────────────

describe('App component – rendering', () => {
  test('renders the app heading', () => {
    render(<App />);
    expect(screen.getByText('React CI Demo App')).toBeInTheDocument();
  });

  test('renders the sub-heading', () => {
    render(<App />);
    expect(
      screen.getByText('Built & tested automatically by GitHub Actions')
    ).toBeInTheDocument();
  });

  test('renders the Calculator section', () => {
    render(<App />);
    expect(screen.getByText('Calculator')).toBeInTheDocument();
  });

  test('renders both input fields', () => {
    render(<App />);
    expect(screen.getByLabelText('Number A')).toBeInTheDocument();
    expect(screen.getByLabelText('Number B')).toBeInTheDocument();
  });

  test('renders Add and Multiply buttons', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /multiply/i })
    ).toBeInTheDocument();
  });

  test('no result shown initially', () => {
    render(<App />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

describe('App component – Add interaction', () => {
  test('shows correct result when Add is clicked', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Number A'), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByLabelText('Number B'), {
      target: { value: '7' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByRole('status')).toHaveTextContent('3 + 7 = 10');
  });

  test('shows error message for invalid input on Add', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Number A'), {
      target: { value: 'abc' },
    });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByRole('status')).toHaveTextContent(
      'Please enter valid numbers'
    );
  });
});

describe('App component – Multiply interaction', () => {
  test('shows correct result when Multiply is clicked', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Number A'), {
      target: { value: '6' },
    });
    fireEvent.change(screen.getByLabelText('Number B'), {
      target: { value: '7' },
    });
    fireEvent.click(screen.getByRole('button', { name: /multiply/i }));
    expect(screen.getByRole('status')).toHaveTextContent('6 × 7 = 42');
  });

  test('shows error message for invalid input on Multiply', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Number B'), {
      target: { value: 'xyz' },
    });
    fireEvent.click(screen.getByRole('button', { name: /multiply/i }));
    expect(screen.getByRole('status')).toHaveTextContent(
      'Please enter valid numbers'
    );
  });
});
























// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import App, { add, subtract, multiply, divide, percentage, isValidNumber } from './App';

// // ═══════════════════════════════════════════════════════════════
// //
// //  WHAT A DEVELOPER CHECKS MANUALLY → WHAT THE TEST AUTOMATES
// //
// //  Developer opens browser and types numbers, clicks buttons,
// //  and checks the result with their eyes. These tests do the
// //  exact same thing automatically on every git push.
// //
// // ═══════════════════════════════════════════════════════════════


// // ─────────────────────────────────────────────────────────────
// // 1. add()
// //    Manual check: type 10 and 5, click Add → see "10 + 5 = 15"
// // ─────────────────────────────────────────────────────────────
// describe('add()', () => {
//   test('10 + 5 = 15  (basic positive numbers)', () => {
//     expect(add(10, 5)).toBe(15);
//   });
//   test('0 + 0 = 0  (both zeros)', () => {
//     expect(add(0, 0)).toBe(0);
//   });
//   test('-3 + -7 = -10  (both negative)', () => {
//     expect(add(-3, -7)).toBe(-10);
//   });
//   test('1.5 + 2.5 = 4  (decimals)', () => {
//     expect(add(1.5, 2.5)).toBeCloseTo(4);
//   });
//   test('100 + 0 = 100  (adding zero changes nothing)', () => {
//     expect(add(100, 0)).toBe(100);
//   });
// });


// // ─────────────────────────────────────────────────────────────
// // 2. subtract()
// //    Manual check: type 10 and 3, click Subtract → see "10 - 3 = 7"
// // ─────────────────────────────────────────────────────────────
// describe('subtract()', () => {
//   test('10 - 3 = 7  (basic subtraction)', () => {
//     expect(subtract(10, 3)).toBe(7);
//   });
//   test('5 - 10 = -5  (result goes negative)', () => {
//     expect(subtract(5, 10)).toBe(-5);
//   });
//   test('0 - 0 = 0  (both zeros)', () => {
//     expect(subtract(0, 0)).toBe(0);
//   });
//   test('7 - 0 = 7  (subtracting zero changes nothing)', () => {
//     expect(subtract(7, 0)).toBe(7);
//   });
//   test('-5 - -3 = -2  (negative minus negative)', () => {
//     expect(subtract(-5, -3)).toBe(-2);
//   });
// });


// // ─────────────────────────────────────────────────────────────
// // 3. multiply()
// //    Manual check: type 6 and 7, click Multiply → see "6 × 7 = 42"
// // ─────────────────────────────────────────────────────────────
// describe('multiply()', () => {
//   test('6 × 7 = 42  (basic multiplication)', () => {
//     expect(multiply(6, 7)).toBe(42);
//   });
//   test('any number × 0 = 0  (multiply by zero)', () => {
//     expect(multiply(999, 0)).toBe(0);
//   });
//   test('any number × 1 = same number  (multiply by one)', () => {
//     expect(multiply(55, 1)).toBe(55);
//   });
//   test('-4 × -4 = 16  (negative × negative = positive)', () => {
//     expect(multiply(-4, -4)).toBe(16);
//   });
//   test('5 × -3 = -15  (positive × negative = negative)', () => {
//     expect(multiply(5, -3)).toBe(-15);
//   });
//   test('2.5 × 4 = 10  (decimal multiplication)', () => {
//     expect(multiply(2.5, 4)).toBeCloseTo(10);
//   });
// });


// // ─────────────────────────────────────────────────────────────
// // 4. divide()
// //    Manual check: type 20 and 4, click Divide → see "20 ÷ 4 = 5"
// //    Edge case: type 10 and 0 → must show error, not crash the app
// // ─────────────────────────────────────────────────────────────
// describe('divide()', () => {
//   test('20 ÷ 4 = 5  (basic division)', () => {
//     expect(divide(20, 4)).toBe(5);
//   });
//   test('10 ÷ 3 ≈ 3.33  (result is a decimal)', () => {
//     expect(divide(10, 3)).toBeCloseTo(3.33);
//   });
//   test('0 ÷ 5 = 0  (zero divided by anything = 0)', () => {
//     expect(divide(0, 5)).toBe(0);
//   });
//   test('any number ÷ 1 = same number', () => {
//     expect(divide(77, 1)).toBe(77);
//   });
//   test('divide by zero throws error  (most important edge case)', () => {
//     expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
//   });
//   test('-15 ÷ 3 = -5  (negative divided by positive)', () => {
//     expect(divide(-15, 3)).toBe(-5);
//   });
// });


// // ─────────────────────────────────────────────────────────────
// // 5. percentage()
// //    Manual check: type 20 and 200, click % of → see "20% of 200 = 40"
// // ─────────────────────────────────────────────────────────────
// describe('percentage()', () => {
//   test('20% of 200 = 40  (basic percentage)', () => {
//     expect(percentage(20, 200)).toBe(40);
//   });
//   test('50% of 80 = 40  (half)', () => {
//     expect(percentage(50, 80)).toBe(40);
//   });
//   test('100% of 150 = 150  (full amount)', () => {
//     expect(percentage(100, 150)).toBe(150);
//   });
//   test('0% of anything = 0', () => {
//     expect(percentage(0, 999)).toBe(0);
//   });
//   test('10% of 0 = 0', () => {
//     expect(percentage(10, 0)).toBe(0);
//   });
// });


// // ─────────────────────────────────────────────────────────────
// // 6. isValidNumber()
// //    Manual check: type letters → should show error not crash
// // ─────────────────────────────────────────────────────────────
// describe('isValidNumber()', () => {
//   test('"42" is valid', () => {
//     expect(isValidNumber('42')).toBe(true);
//   });
//   test('"3.14" is valid (decimal)', () => {
//     expect(isValidNumber('3.14')).toBe(true);
//   });
//   test('"-5" is valid (negative)', () => {
//     expect(isValidNumber('-5')).toBe(true);
//   });
//   test('"" is NOT valid  (empty field — developer leaves input blank)', () => {
//     expect(isValidNumber('')).toBe(false);
//   });
//   test('"abc" is NOT valid  (developer types letters by mistake)', () => {
//     expect(isValidNumber('abc')).toBe(false);
//   });
//   test('"12abc" is NOT valid  (mixed text and numbers)', () => {
//     expect(isValidNumber('12abc')).toBe(false);
//   });
// });


// // ═══════════════════════════════════════════════════════════════
// //  UI TESTS — simulates developer clicking buttons in browser
// // ═══════════════════════════════════════════════════════════════

// describe('UI — Add button', () => {
//   test('type 10 and 5, click Add → shows 10 + 5 = 15', () => {
//     render(<App />);
//     fireEvent.change(screen.getByLabelText('Number A'), { target: { value: '10' } });
//     fireEvent.change(screen.getByLabelText('Number B'), { target: { value: '5'  } });
//     fireEvent.click(screen.getByRole('button', { name: /add/i }));
//     expect(screen.getByRole('status')).toHaveTextContent('10 + 5 = 15');
//   });

//   test('leave fields empty, click Add → shows error', () => {
//     render(<App />);
//     fireEvent.click(screen.getByRole('button', { name: /add/i }));
//     expect(screen.getByRole('alert')).toHaveTextContent('Please enter valid numbers in both fields');
//   });
// });

// describe('UI — Subtract button', () => {
//   test('type 20 and 8, click Subtract → shows 20 - 8 = 12', () => {
//     render(<App />);
//     fireEvent.change(screen.getByLabelText('Number A'), { target: { value: '20' } });
//     fireEvent.change(screen.getByLabelText('Number B'), { target: { value: '8'  } });
//     fireEvent.click(screen.getByRole('button', { name: /subtract/i }));
//     expect(screen.getByRole('status')).toHaveTextContent('20 - 8 = 12');
//   });

//   test('type 3 and 10, click Subtract → result is negative (-7)', () => {
//     render(<App />);
//     fireEvent.change(screen.getByLabelText('Number A'), { target: { value: '3'  } });
//     fireEvent.change(screen.getByLabelText('Number B'), { target: { value: '10' } });
//     fireEvent.click(screen.getByRole('button', { name: /subtract/i }));
//     expect(screen.getByRole('status')).toHaveTextContent('3 - 10 = -7');
//   });
// });

// describe('UI — Multiply button', () => {
//   test('type 6 and 7, click Multiply → shows 6 × 7 = 42', () => {
//     render(<App />);
//     fireEvent.change(screen.getByLabelText('Number A'), { target: { value: '6' } });
//     fireEvent.change(screen.getByLabelText('Number B'), { target: { value: '7' } });
//     fireEvent.click(screen.getByRole('button', { name: /multiply/i }));
//     expect(screen.getByRole('status')).toHaveTextContent('6 × 7 = 42');
//   });
// });

// describe('UI — Divide button', () => {
//   test('type 20 and 4, click Divide → shows 20 ÷ 4 = 5', () => {
//     render(<App />);
//     fireEvent.change(screen.getByLabelText('Number A'), { target: { value: '20' } });
//     fireEvent.change(screen.getByLabelText('Number B'), { target: { value: '4'  } });
//     fireEvent.click(screen.getByRole('button', { name: /divide/i }));
//     expect(screen.getByRole('status')).toHaveTextContent('20 ÷ 4 = 5');
//   });

//   test('type 10 and 0, click Divide → shows "Cannot divide by zero"', () => {
//     render(<App />);
//     fireEvent.change(screen.getByLabelText('Number A'), { target: { value: '10' } });
//     fireEvent.change(screen.getByLabelText('Number B'), { target: { value: '0'  } });
//     fireEvent.click(screen.getByRole('button', { name: /divide/i }));
//     expect(screen.getByRole('alert')).toHaveTextContent('Cannot divide by zero');
//   });
// });

// describe('UI — Percentage button', () => {
//   test('type 20 and 200, click % of → shows 20% of 200 = 40', () => {
//     render(<App />);
//     fireEvent.change(screen.getByLabelText('Number A'), { target: { value: '20'  } });
//     fireEvent.change(screen.getByLabelText('Number B'), { target: { value: '200' } });
//     fireEvent.click(screen.getByRole('button', { name: /% of/i }));
//     expect(screen.getByRole('status')).toHaveTextContent('20% of 200 = 40');
//   });
// });

// describe('UI — invalid input', () => {
//   test('type letters in Number A → shows error not crash', () => {
//     render(<App />);
//     fireEvent.change(screen.getByLabelText('Number A'), { target: { value: 'abc' } });
//     fireEvent.change(screen.getByLabelText('Number B'), { target: { value: '5'   } });
//     fireEvent.click(screen.getByRole('button', { name: /add/i }));
//     expect(screen.getByRole('alert')).toHaveTextContent('Please enter valid numbers in both fields');
//   });

//   test('no result shown when page first loads', () => {
//     render(<App />);
//     expect(screen.queryByRole('status')).not.toBeInTheDocument();
//     expect(screen.queryByRole('alert')).not.toBeInTheDocument();
//   });
// });
