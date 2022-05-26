import { useState } from 'react'
import './App.css'
import Header from './Components/header'
import Grid from './Components/grid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <Grid text='this is what should appear in place of grid'/>
    </div>
  )
}

export default App
