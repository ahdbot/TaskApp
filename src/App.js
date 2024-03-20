import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Css from "./pages/css";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
// level 2 
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signup from "./pages/Singup";
import Signin from "./pages/Signin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },

  {
    path: "/about",
    element: <About />,
  },


  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/css",
    element: <Css />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
]);


function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme}`}>

      <RouterProvider router={router} />
    </div>
  )
}

export default App;
