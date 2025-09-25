import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import PostViewer from "../pages/PostViewer";
import TodoPage from "../pages/TodoPage";
import ComponentsPage from "../pages/ComponentsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <PostViewer /> },
      { path: "/", element: <PostViewer /> },
      { path: "/todo", element: <TodoPage /> },
      { path: "/components", element: <ComponentsPage /> },
    ],
  },
]);
const AddRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AddRoutes;
