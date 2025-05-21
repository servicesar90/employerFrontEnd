import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Routess from './routes/route'



function App() {


  return (
    <>
      <Router>
        <Routess />
      </Router>

      <Toaster position='top-right' reverseOrder={false} />

    </>
  )
}

export default App
