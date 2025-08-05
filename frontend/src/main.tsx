import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import Landing from "./pages/Landing";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Register from "./pages/Register";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/page1", element: <Page1 /> },
      { path: "/page2", element: <Page2 /> },
      { path: "/page3", element: <Page3 /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
