import './App.css'
import Routes from './components/Routes'
import AuthProvider from './provider/authProvider'

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
