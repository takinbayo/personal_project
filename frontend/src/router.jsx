import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import About from "./components/About";
import Error404Page from "./components/Error404Page";
import EventPage from "./components/EventPage";
import RegisterPage from "./components/RegisterPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404Page />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
      },
      {
        path: "about",
        element: <About />,
      }, 
      {
        path: "home",
        element: <Home /> 
      },
      {
        path: "event/:date",
        element: <EventPage />,
      },
      {
        path: "login",
        element: <LoginPage />
      }
    ]
  },

]);

export default router;