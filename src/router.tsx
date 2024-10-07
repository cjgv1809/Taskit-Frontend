import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import HomeView from "./views/HomeView";
import SignInView from "./views/SignInView";
import RegisterView from "./views/RegisterView";
import NotFoundView from "./views/NotFoundView";
import DashboardView from "./views/DashboardView";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomeView /> },
      { path: "sign-up", element: <RegisterView /> },
      { path: "sign-in", element: <SignInView /> },
      {
        path: "dashboard",
        element: <DashboardLayout />, // Protected route
        children: [
          { index: true, element: <DashboardView /> }, // Dashboard home
        ],
      },
      { path: "*", element: <NotFoundView /> }, // 404 route at the end
    ],
  },
]);

export default BrowserRouter;
