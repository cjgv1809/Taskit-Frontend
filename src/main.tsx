import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskDialogProvider } from "./context/TaskDialogContext";
import { CategoryProvider } from "./context/CategoryContext";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";
import BrowserRouter from "./router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <ProjectProvider>
            <CategoryProvider>
              <TaskDialogProvider>
                <TaskProvider>
                  <RouterProvider router={BrowserRouter} />
                </TaskProvider>
              </TaskDialogProvider>
            </CategoryProvider>
          </ProjectProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
