import { User } from "firebase/auth";

type FirebaseUser = Pick<
  User,
  "displayName" | "email" | "phoneNumber" | "photoURL" | "providerId" | "uid"
>;
export interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
}

export interface UserContextType {
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
}

export interface Project {
  id_proyecto: number;
  nombre: string;
  descripcion: string;
  id_usuario: number;
}

export interface Task {
  id_tarea: number;
  titulo: string;
  prioridad: "Alta" | "Media" | "Baja";
  estado: "Por hacer" | "En curso" | "Finalizado";
  id_proyecto: number;
}

export interface State {
  projects: Project[];
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface ProjectContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export type Action =
  | { type: "FETCH_PROJECT_SUCCESS"; payload: Project }
  | { type: "FETCH_PROJECTS_SUCCESS"; payload: Project[] }
  | { type: "FETCH_TASKS_SUCCESS"; payload: Task[] }
  | { type: "FETCH_ALL_TASKS_SUCCESS"; payload: Task[] }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_PROJECT"; payload: Project }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_PROJECT"; payload: number }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

export enum PriorityEnum {
  Alta = "Alta",
  Media = "Media",
  Baja = "Baja",
}

export enum StatusEnum {
  PorHacer = "Por hacer",
  EnProceso = "En proceso",
  Finalizado = "Finalizado",
}
