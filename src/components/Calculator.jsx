import { useState } from 'react'
import {
  Delete,
  Divide,
  Minus,
  Plus,
  Equal,
  Percent,
} from 'lucide-react'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
      return
    }

    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '×':
        return prev * current
      case '÷':
        return current === 0 ? 0 : prev / current
      case '%':
        return prev % current
      default:
        return current
    }
  }

  const handleOperation = (op) => {
    const currentValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = calculate(
        previousValue,
        currentValue,
        operation
      )

      setDisplay(result.toString())
      setPreviousValue(result)
    }

    setOperation(op)
    setWaitingForNewValue(true)
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display)

      const result = calculate(
        previousValue,
        currentValue,
        operation
      )

      setDisplay(result.toString())
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const handleToggleSign = () => {
    setDisplay((parseFloat(display) * -1).toString())
  }

  const Button = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`h-14 rounded-xl font-semibold transition-all duration-200 active:scale-95 ${className}`}
    >
      {children}
    </button>
  )

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 p-4">
      <div className="w-full max-w-sm bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6">
        <div className="mb-6">
          <div className="bg-slate-950 rounded-2xl p-6">
            <div className="text-right text-slate-400 text-sm h-6">
              {operation && previousValue !== null && (
                <span>
                  {previousValue} {operation}
                </span>
              )}
            </div>

            <div className="text-right text-5xl font-bold text-cyan-400">
              {display}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button
            onClick={handleClear}
            className="col-span-2 bg-red-600 hover:bg-red-700 text-white"
          >
            AC
          </Button>

          <Button
            onClick={handleBackspace}
            className="bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center"
          >
            <Delete size={18} />
          </Button>

          <Button
            onClick={() => handleOperation('÷')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center"
          >
            <Divide size={18} />
          </Button>

          {['7', '8', '9'].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num)}
              className="bg-slate-800 hover:bg-slate-700 text-white"
            >
              {num}
            </Button>
          ))}

          <Button
            onClick={() => handleOperation('×')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            ×
          </Button>

          {['4', '5', '6'].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num)}
              className="bg-slate-800 hover:bg-slate-700 text-white"
            >
              {num}
            </Button>
          ))}

          <Button
            onClick={() => handleOperation('-')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center"
          >
            <Minus size={18} />
          </Button>

          {['1', '2', '3'].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num)}
              className="bg-slate-800 hover:bg-slate-700 text-white"
            >
              {num}
            </Button>
          ))}

          <Button
            onClick={() => handleOperation('+')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center"
          >
            <Plus size={18} />
          </Button>

          <Button
            onClick={() => handleNumber('0')}
            className="col-span-2 bg-slate-800 hover:bg-slate-700 text-white"
          >
            0
          </Button>

          <Button
            onClick={handleDecimal}
            className="bg-slate-800 hover:bg-slate-700 text-white"
          >
            .
          </Button>

          <Button
            onClick={handleEquals}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
          >
            <Equal size={18} />
          </Button>

          <Button
            onClick={() => handleOperation('%')}
            className="col-span-2 bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center"
          >
            <Percent size={18} />
          </Button>

          <Button
            onClick={handleToggleSign}
            className="col-span-2 bg-slate-800 hover:bg-slate-700 text-white"
          >
            ±
          </Button>
        </div>
      </div>
    </div>
  )
}