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

























