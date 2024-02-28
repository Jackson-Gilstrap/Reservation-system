import { useState } from 'react'
import Questionnaire from './components/Questionnair'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Questionnaire/>
    </>
  )
}

export default App
