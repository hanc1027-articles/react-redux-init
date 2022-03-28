import { useState } from 'react'
import "./App.css"
import { useSelector, useDispatch } from 'react-redux'
import { next, previous, changeByColorCode } from './features/colorSlice'

export default function App() {
  const bgColor = useSelector((state) => state.color.bgColorCode)
  const dispatch = useDispatch()
  const [inputColor, setInputColor] = useState(bgColor);

  return (
    <div className="App">
      <header className='App-header' style={{ backgroundColor: bgColor}}>
        <button
          onClick={() => dispatch(previous())}
        >
          Previous
        </button>
        <button
          onClick={() => dispatch(next())}
        >
          Next
        </button>

        <hr/>

        <input type="text" value={inputColor} onChange={(event) => setInputColor(event.target.value)}></input>
        <button
          onClick={() => dispatch(changeByColorCode(inputColor))}
        >
          ChangeColor
        </button>
      </header>
    </div>
  )
}