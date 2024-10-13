import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { TaskDialogProvider } from "@/context/TaskDialogContext";
import { ThemeProvider } from "@/context/ThemeContext";
import BrowserRouter from "./router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <TaskDialogProvider>
            <ProjectProvider>
              <RouterProvider router={BrowserRouter} />
            </ProjectProvider>
          </TaskDialogProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
