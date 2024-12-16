import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Note from "./Pages/Note";
import NoteProvider from "./Context/NoteProvider";
const routing = createBrowserRouter([
  {
    path: "/",
    element: <Note />,
  },
]);
const AppRouter = () => {
  return (
    <>
      <NoteProvider>
        <RouterProvider router={routing} />
      </NoteProvider>
    </>
  );
};

export default AppRouter;
