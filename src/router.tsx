import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Loading from "./components/Loading";
import HomeView from "./views/HomeView";
import SignInView from "./views/SignInView";
import RegisterView from "./views/RegisterView";
import NotFoundView from "./views/NotFoundView";
import DashboardView from "./views/DashboardView";
import { useVerifySignedInUser } from "./hooks/useVerifySignedInUser";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useVerifySignedInUser();

  console.log("ProtectedRoute state:", { isAuthenticated, loading });

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

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
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: <DashboardView /> }],
      },
      { path: "*", element: <NotFoundView /> },
    ],
  },
]);

export default BrowserRouter;
