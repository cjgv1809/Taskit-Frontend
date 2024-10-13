import React, { createContext, useReducer, useEffect } from "react";
import { Action, ProjectContextProps, State } from "@/types";
import { useUser } from "@/hooks";
import axios from "axios";

const initialState: State = {
  projects: [],
  tasks: [],
  loading: false,
  error: null,
};

// Reducer to manage state changes
function projectReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_PROJECT_SUCCESS":
      return { ...state, projects: [action.payload], loading: false };
    case "FETCH_PROJECTS_SUCCESS":
      return { ...state, projects: action.payload, loading: false };
    case "FETCH_TASKS_SUCCESS":
      return { ...state, tasks: action.payload, loading: false };
    case "FETCH_ALL_TASKS_SUCCESS":
      return { ...state, tasks: action.payload, loading: false };
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id_proyecto === action.payload.id_proyecto
            ? action.payload
            : project
        ),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id_tarea === action.payload.id_tarea
            ? { ...task, ...action.payload }
            : task
        ),
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id_proyecto !== action.payload
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id_tarea !== action.payload),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// create context
export const ProjectContext = createContext<ProjectContextProps>({
  state: initialState,
  dispatch: () => null,
});

// Provider
export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const { userId } = useUser();

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/proyectos/usuario/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({ type: "FETCH_PROJECTS_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Error fetching projects" });
        console.error("Error fetching projects:", error);
      }
      dispatch({ type: "SET_LOADING", payload: false });
    };

    fetchProjects();
  }, [userId]);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
