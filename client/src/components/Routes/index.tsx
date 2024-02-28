import { Article, Home, Login } from '@mui/icons-material'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ARTICLE, LOGIN, REGISTER, USER } from '../../constant/routes'
import Register from '../../pages/Register'
import User from '../../pages/User'
import { useAuth } from '../../provider/authProvider'
import { ProtectedRoute } from './ProtectedRoute'

const Routes = () => {
  const { token } = useAuth()

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '*',
          element: <Navigate to='/' />,
        },
        {
          path: USER,
          element: <User />,
        },
        {
          path: ARTICLE,
          element: <Article />,
        },
      ],
    },
  ]

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: '*',
      element: <Navigate to='/login' />,
    },
    {
      path: LOGIN,
      element: <Login />,
    },
    {
      path: REGISTER,
      element: <Register />,
    },
  ]

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ])

  return <RouterProvider router={router} />
}

export default Routes
