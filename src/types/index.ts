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

export interface ProjectContextType {
  projectId: number | number[];
  setProjectId: React.Dispatch<React.SetStateAction<number[]>>;
}
