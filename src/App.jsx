import { useState } from 'react';
import './App.css';

function App() {
  const [output, setOutput] = useState('0');
  const [input, setInput] = useState('0');
  const [prevValue, setPrevValue] = useState('');
  const [operator, setOperator] = useState('');
  const clear = () => {
    setOutput('0');
    setInput('0');
    setOperator('');
    setPrevValue('');
  };

  const handllOperation = (op) => {
    const lastChar = output.slice(-1);
    const secondLastChar = output.slice(-2, -1);

    if (op === '-' && ['+', '-', 'x', '/'].includes(lastChar)) {
      if (lastChar === '-' && ['x', '/'].includes(secondLastChar)) {
        return;
      }
      setInput(op);
      setOutput((prev) => prev + op);
      return;
    }
    if (['+', '-', 'x', '/'].includes(lastChar)) {
      if (['+', '-', 'x', '/'].includes(secondLastChar)) {
        setOutput((prev) => prev.slice(0, -2) + op);
      } else {
        setOutput((prev) => prev.slice(0, -1) + op); 
      }
      setOperator(op);
      return;
    }

    if (prevValue === '') {
      setPrevValue(input);
    } else if (input !== '-') {
      const result = calculate(prevValue + operator + input);
      setPrevValue(result.toString());
    }
  
    setOperator(op);
    setInput(op);
    setOutput((prev) => prev + op);
  };
  const handleInput = (value) => {
  const lastChar = output.slice(-1);

  if (['+', '-', 'x', '/'].includes(value)) {
    handllOperation(value);
  } else if (value === '-' && ['+', '-', 'x', '/'].includes(lastChar)) {
    setInput(value);
    setOutput((prev) => prev + value);
  } else {
    const newInput = input === "0" || ['+', 'x', '-', '/'].includes(input) ? value : input + value;
    setInput(newInput);
    setOutput((prev) => (prev === "0" ? value : prev + value));
  }
};

  const calculate = (expression) => {
    const operators = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      'x': (a, b) => a * b,
      '/': (a, b) => a / b,
    };

    const tokens = expression.match(/(?<!\d)-?\d+(\.\d+)?|[+x/-]/g); 
    if (!tokens) return 0;

    const nums = [];
    const ops = [];

    for (let token of tokens) {
      if (!isNaN(token)) {
        nums.push(parseFloat(token));
      } else if (token in operators) {
        while (ops.length && precedence(token, ops[ops.length - 1])) {
          process(nums, ops, operators); 
        }
        ops.push(token);
      }
    }

    while (ops.length) {
      process(nums, ops, operators);
    }

    return nums[0];
  };

  const precedence = (curr, prev) => {
    const precedenceOrder = { '+': 1, '-': 1, 'x': 2, '/': 2 };
    return precedenceOrder[prev] >= precedenceOrder[curr];
  };

  const process = (nums, ops, operators) => {
    const b = nums.pop();
    const a = nums.pop();
    const op = ops.pop();
    nums.push(operators[op](a, b));
  };

  const handleEqual = () => {
    if (operator && prevValue && input) {
      const result = calculate(output);  
      setOutput(result.toString());
      setInput(result.toString());
      setPrevValue('');
      setOperator('');
    }
  };

  const handleDecimal = () => {
    if (!input.includes(".")) {
      setInput((prev) => prev + ".");
      setOutput((prev) => prev + ".");
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='h-[650px] w-[400px] bg-[#1c1c1c] rounded-md flex flex-col p-2'>
        <div id='display' className='flex flex-col text-end'>
          <div id='output' className='text-white text-5xl h-20'>{output}</div>
          <input type="text" className='bg-transparent h-20 text-white text-5xl text-end' id='input' value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className='w-full grid grid-cols-5 content-start'>
          <div className='grid grid-rows-4 col-span-4 gap-2'>
            <div className='grid grid-cols-3 self-end flex-row w-full'>
              <button id='clear' onClick={clear} className='rounded-full bg-[#D4D4D2] w-[275px] h-20 text-white col-span-3 text-2xl font-sans'>AC</button>
            </div>
            <div className='grid grid-cols-3 row-span-3 gap-2'>
              <button id='seven' className='rounded-full bg-[#505050] w-20 h-20 text-white text-2xl font-sans' onClick={() => handleInput("7")}>7</button>
              <button id='eight' className='rounded-full bg-[#505050] w-20 h-20 text-white text-2xl font-sans' onClick={() => handleInput("8")}>8</button>
              <button id='nine' className='rounded-full bg-[#505050] w-20 h-20 text-white text-2xl font-sans' onClick={() => handleInput("9")}>9</button>
              <button id='four' className='rounded-full bg-[#505050] w-20 h-20 text-white text-2xl font-sans' onClick={() => handleInput("4")}>4</button>
              <button id='five' className='rounded-full bg-[#505050] w-20 h-20 text-white text-2xl font-sans' onClick={() => handleInput("5")}>5</button>
              <button id='six' className='rounded-full bg-[#505050] w-20 h-20 text-white text-2xl font-sans' onClick={() => handleInput("6")}>6</button>
              <button id='one' className='rounded-full bg-[#505050] w-20 h-20 text-white text-2xl font-sans' onClick={() => handleInput("1")}>1</button>
              <button id='two' className='rounded-full bg-[#505050] w-20 h-20 text-white text-2xl font-sans' onClick={() => handleInput("2")}>2</button>
              <button id='three' className='rounded-full bg-[#505050] w-20 h-20 text-white text-2xl font-sans' onClick={() => handleInput("3")}>3</button>
              <button id='zero' className='col-span-2 rounded-full bg-[#505050] w-[200px] h-20 text-white text-2xl font-sans' onClick={() => handleInput("0")}>0</button>
              <button id='decimal' className='rounded-full bg-[#505050] w-20 h-20 text-white text-2xl font-sans' onClick={handleDecimal}>.</button>
            </div>
          </div>
          <div className='flex flex-col-reverse gap-2'>
            <button id='equals' className='rounded-full bg-[#FF9500] w-20 h-20 text-white text-2xl font-sans' onClick={handleEqual}>=</button>
            <button id='add' className='rounded-full bg-[#FF9500] w-20 h-20 text-white text-2xl font-sans' onClick={() => handllOperation("+")}>+</button>
            <button id='subtract' className='rounded-full bg-[#FF9500] w-20 h-20 text-white text-2xl font-sans' onClick={() => handllOperation("-")}>-</button>
            <button id='multiply' className='rounded-full bg-[#FF9500] w-20 h-20 text-white text-2xl font-sans' onClick={() => handllOperation("x")}>x</button>
            <button id='divide' className='rounded-full bg-[#FF9500] col-span-2 w-20 h-20 text-white text-2xl font-sans' onClick={() => handllOperation("/")}>/</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;