import { useState } from 'react'
import './App.css'
import Header from './Components/header'
import Grid from './Components/grid'
import Prompt from './Components/prompt'
import PromptState from './Context/prompt_state'
// import TestContext from './Components/test'

function App() {
  const [count, setCount] = useState(0)

  return (
    <PromptState>
      <div className="App">
        <Header />
        <Grid />
        <Prompt />
        {/* <TestContext /> */}
      </div>

    </PromptState>
  )
}

export default App
