import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  ARTICLE,
  ARTICLE_ADD,
  ARTICLE_DETAIL,
  LOGIN,
  REGISTER,
  USER,
} from '../../constant/routes'
import Register from '../../pages/Register'
import User from '../../pages/User'
import { useAuth } from '../../provider/authProvider'
import { ProtectedRoute } from './ProtectedRoute'
import Home from '../../pages/Home'
import Article from '../../pages/Article'
import Login from '../../pages/Login'
import ArticleAdd from '../../pages/ArticleAdd'
import ArticleDetail from '../../pages/ArticleDetail'

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
          children: [
            {
              path: ARTICLE,
              element: <Article />,
            },
            {
              path: ARTICLE_ADD,
              element: <ArticleAdd />,
            },
            {
              path: ARTICLE_DETAIL,
              element: <ArticleDetail />,
            },
          ],
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
