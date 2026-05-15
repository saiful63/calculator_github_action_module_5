import React, { useState } from 'react';
import './App.css';

// ─── Calculator functions ──────────────────────────────────────
// These are what the developer manually tested in the browser,
// then wrote automated tests for so GitHub Actions checks them
// on every future push.

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}

export function percentage(a, b) {
  // What is A% of B?
  return (a / 100) * b;
}

export function isValidNumber(value) {
  return value !== '' && !isNaN(parseFloat(value)) && isFinite(value);
}

// ─── React Component ──────────────────────────────────────────

function App() {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError]   = useState(null);

  const clearMessages = () => {
    setResult(null);
    setError(null);
  };

  const handleOperation = (operation) => {
    clearMessages();

    if (!isValidNumber(inputA) || !isValidNumber(inputB)) {
      setError('Please enter valid numbers in both fields');
      return;
    }

    const a = parseFloat(inputA);
    const b = parseFloat(inputB);

    try {
      let res;
      switch (operation) {
        case 'add':      res = `${a} + ${b} = ${add(a, b)}`; break;
        case 'subtract': res = `${a} - ${b} = ${subtract(a, b)}`; break;
        case 'multiply': res = `${a} × ${b} = ${multiply(a, b)}`; break;
        case 'divide':   res = `${a} ÷ ${b} = ${divide(a, b)}`; break;
        case 'percent':  res = `${a}% of ${b} = ${percentage(a, b)}`; break;
        default: break;
      }
      setResult(res);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Calculator</h1>
        <p>Tested automatically by GitHub Actions on every push</p>
      </header>

      <main className="App-main">
        <section className="calculator" aria-label="calculator">
          <h2>Calculator</h2>

          <div className="inputs">
            <input
              type="number"
              placeholder="Number A"
              value={inputA}
              onChange={e => setInputA(e.target.value)}
              aria-label="Number A"
            />
            <input
              type="number"
              placeholder="Number B"
              value={inputB}
              onChange={e => setInputB(e.target.value)}
              aria-label="Number B"
            />
          </div>

          <div className="buttons">
            <button onClick={() => handleOperation('add')}>Add</button>
            <button onClick={() => handleOperation('subtract')}>Subtract</button>
            <button onClick={() => handleOperation('multiply')}>Multiply</button>
            <button onClick={() => handleOperation('divide')}>Divide</button>
            <button onClick={() => handleOperation('percent')}>% of</button>
          </div>

          {result && <p className="result" role="status">{result}</p>}
          {error   && <p className="error"  role="alert">{error}</p>}
        </section>
      </main>
    </div>
  );
}

export default App;