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

type FirebaseUser = Pick<
  User,
  "displayName" | "email" | "phoneNumber" | "photoURL" | "providerId" | "uid"
>;

export interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
}

export interface UserContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;
}

export interface Project {
  id_usuario: number | null;
  nombre: string;
  descripcion: string;
}
