import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import httpClientInstance from '../httpClient'
import userApi from '../api/userApi'

export type UserSO = {
  id: string
  createdAt: string
  email: string
  username: string
  fullname: string
}

type AuthContextType = {
  token: string | null
  setToken: (a: string | null) => void
  user: UserSO
}

const AuthContext = createContext<AuthContextType>({
  token: '' || null,
  setToken: () => {},
  user: {
    id: '',
    createdAt: '',
    email: '',
    username: '',
    fullname: '',
  },
})

type AuthProviderType = {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderType) => {
  const [token, setToken_] = useState(localStorage.getItem('token'))
  const [user, setUser_] = useState<UserSO>({
    id: '',
    createdAt: '',
    email: '',
    username: '',
    fullname: '',
  })

  const setToken = (newToken: string | null) => {
    setToken_(newToken)
  }

  useEffect(() => {
    const getProfile = async () => {
      const result = await userApi.getProfile()

      setUser_(result.data)
    }

    if (token) {
      httpClientInstance.defaults.headers.common['Authorization'] =
        'Bearer ' + token
      localStorage.setItem('token', token)

      getProfile().catch(console.error)
    } else {
      delete httpClientInstance.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }, [token])

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
    }),
    [token, user]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
