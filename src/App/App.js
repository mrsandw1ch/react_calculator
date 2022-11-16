import { useState } from 'react'
import './App.scss'

const MULTIPLICATION_SIGN = '\u00D7'

function App() {
  const [digits, setDigits] = useState('0')
  const [operation, setOperation] = useState('')
  const [formula, setFormula] = useState([])
  const [result, setResult] = useState('')

  function digitCLickHandle(d) {
    if (result) {
      setResult('')
      setFormula([])
    }
    if (operation) {
      setFormula(formula.concat(operation))
      setOperation('')
    }

    if (d === '.' && digits.indexOf('.') === -1 && digits.length < 16) {
      if (digits) {
        setDigits(digits + '.')
      } else {
        setDigits('0.')
      }
    }
    if (d !== '.' && digits.length < 17) {
      if (digits === '0') {
        setDigits(d)
      } else {
        setDigits(digits + d)
      }
    }
  }


  function operationClickHandle(op) {
    if (result) {
      setFormula([String(result)])
      setResult('')
    }
    if (digits) {
      setFormula(formula.concat(digits === '0.' ? '0' : digits))
      setDigits('')
    }
    setOperation(op)
  }

  
  function equalsClickHandle() {
    if (digits) {
      setFormula(formula.concat(digits === '0.' ? '0' : digits))
      setResult(calculate(formula.concat(digits)))
      setDigits('')
    } else {
      setResult(calculate(formula))
    }
    setOperation('')
  }


  function clearClickHandle() {
    if (formula.length === 0 || digits === '0' || result !== '') {
      setResult('')
      setFormula([])
      setOperation('')
    }

    if (operation) {
      setFormula(formula.concat(operation))
      setOperation('')
    }
    setDigits('0')
  }
  
  
  function calculate(formula) {

    let i
    let op, a, b, result

    while(formula.length > 1) {

      i = formula.findIndex(item => item === MULTIPLICATION_SIGN || item === '/')

      if (i < 0) {
        i = formula.findIndex(item => item === '+' || item === '-')
      }
      
      op = formula[i]
      a = Number(formula[i-1])
      b = Number(formula[i+1])

      switch (op) {
        case MULTIPLICATION_SIGN:
          result = a * b;
          break;
        case '/':
          result = a / b;
          break;
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        default:
          return undefined;
      }

      formula.splice(i-1, 3, result)
    }

    return formula;
  }


  return (
    <div className="App">
      <div id='calculator'>
        <div id='display'>
          <p id='calculation'>
            {formula.map(item => isNaN(Number(item)) ? item : String(Math.round(Number(item) * 1000000) / 1000000))}
            {operation}
            {(digits === '0' && formula.length === 0) ? '' : digits}
            {result ? '=' + String(Math.round(result * 1000000) / 1000000) : ''}
          </p>
          <p id='input-output'>
            {digits || operation || String(Math.round(result * 1000000) / 1000000)}
          </p>
        </div>

        <div id='keyboard'>
          <button
            className='keyboard-btn'
            id='clear'
            onClick={() => {clearClickHandle()}}>
            {(formula.length === 0 || digits === '0' || result !== '')  ? <>AC</> : <>C</>}
          </button>

          <button
            className='keyboard-btn operation'
            id='divide'
            onClick={() => {operationClickHandle('/')}}>
            /
          </button>

          <button
            className='keyboard-btn operation'
            id='multiply'
            onClick={() => {operationClickHandle(MULTIPLICATION_SIGN)}}>
            {MULTIPLICATION_SIGN}
          </button>

          <button
            className='keyboard-btn operation'
            id='subtract'
            onClick={() => {operationClickHandle('-')}}>
            -
          </button>

          <button
            className='keyboard-btn operation'
            id='add'
            onClick={() => {operationClickHandle('+')}}>
            +
          </button>

          <button
            className='keyboard-btn'
            id='equals'
            onClick={() => {equalsClickHandle()}}>
            =
          </button>

          <div id='digits'>
            <button
              className='keyboard-btn digit'
              id='one'
              onClick={() => {digitCLickHandle('1')}}>
              1
            </button>

            <button
              className='keyboard-btn digit'
              id='two'
              onClick={() => {digitCLickHandle('2')}}>
              2
            </button>

            <button
              className='keyboard-btn digit'
              id='three'
              onClick={() => {digitCLickHandle('3')}}>
              3
            </button>         

            <button
              className='keyboard-btn digit'
              id='four'
              onClick={() => {digitCLickHandle('4')}}>
              4
            </button>

            <button
              className='keyboard-btn digit'
              id='five'
              onClick={() => {digitCLickHandle('5')}}>
              5
            </button>

            <button
              className='keyboard-btn digit'
              id='six'
              onClick={() => {digitCLickHandle('6')}}>
              6
            </button>
          
            <button
              className='keyboard-btn digit'
              id='seven'
              onClick={() => {digitCLickHandle('7')}}>
              7
            </button>

            <button
              className='keyboard-btn digit'
              id='eight'
              onClick={() => {digitCLickHandle('8')}}>
              8
            </button>
            
            <button
              className='keyboard-btn digit'
              id='nine'
              onClick={() => {digitCLickHandle('9')}}>
              9
            </button>
            
            <button
              className='keyboard-btn digit'
              id='zero'
              onClick={() => {digitCLickHandle('0')}}>
              0
            </button>

            <button
              className='keyboard-btn digit'
              id='decimal'
              onClick={() => {digitCLickHandle('.')}}>
              .
            </button>
          </div>
        </div>
      </div>
      <footer>
        <p>	&#169; 2022 coded by <a href="https://github.com/mrsandw1ch" rel='noreferrer' target='_blank'>mrsandw1ch</a></p>
        <p>designed by <a href="https://www.behance.net/DariaBorisovna" rel='noreferrer' target='_blank'>lil_soup</a></p>
      </footer>
    </div>
  );
}

export default App;
