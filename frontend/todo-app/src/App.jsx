import './App.css'
import TodoList from './pages/todoList/TodoList'
import { Routes, Route } from "react-router-dom"
import { ForgotPassword, Login, SignUp } from "./pages"

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />}></Route>
        <Route path='/todoList' element={<TodoList />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
      </Routes>

    </>
  )
}

export default App