import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SignupPage } from './components/signup'
import { LoginPage } from './components/login'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/Signup' element={<SignupPage/>}/>
      <Route path='/Login' element={<LoginPage/>}/>
    </Routes>
    </BrowserRouter>
  )
  
}

export default App
