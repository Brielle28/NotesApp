import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Note from "./Pages/Note";
const routing = createBrowserRouter([
  {
    path: "/",
    element: <Note />,
  },
]);
const AppRouter = () => {
  return (
    <>
      <RouterProvider router={routing} />
    </>
  );
};

export default AppRouter;
