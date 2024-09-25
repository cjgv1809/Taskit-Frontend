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
      { path: "sign-in", element: <SignInView /> },
      { path: "sign-up", element: <RegisterView /> },
      {
        path: "dashboard",
        element: <DashboardLayout />, // This is now the protected route
        children: [
          { index: true, element: <DashboardView /> }, // Dashboard home
          // Add other routes for tasks:
          // { path: "create-task", element: <CreateTaskView /> },
          // { path: "edit-task/:taskId", element: <EditTaskView /> },
        ],
      },
      { path: "*", element: <NotFoundView /> }, // 404 route at the end
    ],
  },
]);

export default BrowserRouter;
