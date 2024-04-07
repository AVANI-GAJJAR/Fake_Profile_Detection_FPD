
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Predictions from './pages/Prediction'
import Landing from './pages/Landing'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/predict' element={<Predictions />}></Route>
          <Route path='/landing' element={<Landing />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
