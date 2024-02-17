
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
