import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SignupPage } from './components/signup'
import { LoginPage } from './components/login'
import { ExpensePage } from './components/expenses'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/Signup' element={<SignupPage/>}/>
      <Route path='/Login' element={<LoginPage/>}/>
       <Route path='/Expenses' element={<ExpensePage/>}/>
    </Routes>
    </BrowserRouter>
  )
  
}

export default App
