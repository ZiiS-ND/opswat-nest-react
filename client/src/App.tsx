import './App.css'
import { Routes } from 'react-router-dom'
import AuthProvider from './provider/authProvider'

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
