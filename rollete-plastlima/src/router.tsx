import { createBrowserRouter } from "react-router";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import Rollete from "./pages/rollete.tsx";
import { Buttons } from "./pages/buttons/index.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/rollete",
    element: <Rollete />,
  },
  {
    path: "/buttons",
    element: <Buttons />,
  },
]);
