import { useState } from 'react'

import './App.css'

function App() {

  const [output, setOutput] = useState('0');
  const [input, setInput] = useState('0');
  const [prevValue, setPrevValue] = useState("");
  const [operator, setOperator] = useState("");

  const clear = () => {
    setOutput('0');
    setInput('0');
    setOperator("");
    setPrevValue("");
  };

  const handllOperation = (op) => {
    if(setPrevValue === ""){
      setPrevValue(input);
    }else{
      setPrevValue(prevValue  + operator  + input);  
    }

    setInput(op)
    setOperator(op)
    console.log(output)
  }

  const handleInput = (value) => {
    const newInput = input === "0" || ['+', '-', 'x', '/'].includes(input) ? value : input + value;
    setInput(newInput);
    if(value === "0.5"){
      setInput
    }
    setOutput((prevValue !== "" ? prevValue  + operator : "") + newInput);
  };

  const handleEqual = () => {
    const changeadd = output.replace(/x/g, '*');
    const result = eval(changeadd);
    setOutput(output+"="+result.toString());
    setInput(result.toString());
  };




  
  return (
      <div className='h-screen flex justify-center items-center'>
        <div className='h-[650px] w-[400px] bg-[#1c1c1c] rounded-md flex flex-col p-2'>
        <div id='display' className='flex flex-col text-end'>
            <div id='output' className='text-white text-5xl h-20'>{output}</div>
            <input type="text" className='bg-transparent h-20 text-white text-5xl text-end' id='input' value={input} onChange={(e) => setInput(e.target.value)}/>
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
                <button id='decimal' className='rounded-full bg-[#505050] w-20 h-20 text-white text-2xl font-sans'>.</button>
              </div>
            </div>
            <div className='flex flex-col-reverse gap-2'>
              <button id='equals' className='rounded-full bg-[#FF9500] w-20 h-20 text-white text-2xl font-sans' onClick={handleEqual} >=</button>
              <button id='add' className='rounded-full bg-[#FF9500] w-20 h-20 text-white text-2xl font-sans' onClick={ () => handllOperation("+")}>+</button>
              <button id='subtract' className='rounded-full bg-[#FF9500] w-20 h-20 text-white text-2xl font-sans' onClick={() => handllOperation("-")}>-</button>
              <button id='multiply' className='rounded-full bg-[#FF9500] w-20 h-20 text-white text-2xl font-sans' onClick={() => handllOperation("x")}>x</button>
              <button id='divide' className='rounded-full bg-[#FF9500] col-span-2 w-20 h-20 text-white text-2xl font-sans' onClick={() => handllOperation("/")}>/</button>
            </div>

            
            
          </div>
          
        </div>

      </div>
  )
}

export default App
