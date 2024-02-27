import { useMemo } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { STORAGE_TOKEN_KEY } from "./constant/basic_constant";
import { HOME, LOGIN, REGISTER } from "./constant/routes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

const router = createBrowserRouter([
  {
    path: HOME,
    element: <Home />,
  },
]);

const loginRouter = createBrowserRouter([
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: REGISTER,
    element: <Register />,
  },
  {
    path: "*",
    element: <Navigate to={LOGIN} />,
  },
]);

const Router = () => {
  const token = useMemo(
    () => window.localStorage.getItem(STORAGE_TOKEN_KEY),
    []
  );

  if (token) {
    return <RouterProvider router={router} />;
  }

  return <RouterProvider router={loginRouter} />;
};

const App = () => {
  return <Router />;
};

export default App;
