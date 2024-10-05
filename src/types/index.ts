import { User } from "firebase/auth";

// Model: Project
export interface ProjectRequest {
  id_usuario: number;
  nombre: string;
  descripcion: string;
}

export interface ProjectResponse {
  id: number;
  message: string;
}

export type ProjectResponseWithoutId = Omit<ProjectResponse, "id">;

export interface UserProjectResponse {
  id: number;
  id_usuario: number;
  nombre: string;
  descripcion: string;
}

export interface CategoryRequest {
  nombre: string;
  id_proyecto: number;
  descripcion: string;
}

export interface CategoryResponseByProjectId {
  id: number;
  id_proyecto: number;
  nombre: string;
  descripcion: string;
}

export type CategoryResponseWithoutId = Omit<ProjectResponse, "id">;

type TaskStatus = "Pendiente" | "En proceso" | "Completada";

type TaskPriority = "Baja" | "Media" | "Alta";

export interface TaskRequest {
  id_categoria: number;
  titulo: string;
  descripcion: string;
  estado: TaskStatus;
  prioridad: TaskPriority;
}

export interface TaskResponseByCategoryId {
  id: number;
  id_categoria: number;
  titulo: string;
  descripcion: string;
  estado: TaskStatus;
  prioridad: TaskPriority;
}

export type TaskResponseWithoutId = Omit<ProjectResponse, "id">;

export type TaskRequestWithoutIdCategory = Omit<
  TaskRequest,
  "id_categoria" | "id"
>;

type FirebaseUser = Pick<
  User,
  "displayName" | "email" | "phoneNumber" | "photoURL" | "providerId" | "uid"
>;

export interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
}
