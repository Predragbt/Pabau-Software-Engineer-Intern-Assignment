import { createBrowserRouter } from "react-router";
import App from "./App";
import { Characters } from "./components/Characters";
import { CharacterDetails } from "./components/CharacterDetails";
import { GlobalError } from "./components/errorPages/GlobalError";
import { NotFound } from "./components/errorPages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <GlobalError />,
    children: [
      {
        path: "/",
        element: <Characters />,
      },
      {
        path: "/character/:id",
        element: <CharacterDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
