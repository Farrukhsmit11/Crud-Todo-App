import './App.css'
import TodoList from './pages/todoList/TodoList'
import { Routes, Route } from "react-router-dom"
import { ForgotPassword, Login, SignUp } from "./pages"
import ResetPassword from './pages/auth/resetPassword/ResetPassword'
import { useEffect, useState } from 'react'
import Loader from './components/loader/Loader'
import OtpVerification from './pages/auth/otpVerification/OtpVerification'

function App() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />}></Route>
        <Route path='/todoList' element={<TodoList />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/resetPassword' element={<ResetPassword />}></Route>
        <Route path='/otpVerification' element={<OtpVerification />}></Route>
      </Routes>

    </>
  )
}

export default App