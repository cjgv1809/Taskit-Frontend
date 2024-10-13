import {
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  loginWithFacebook,
  loginWithGoogle,
  logout,
} from "./AuthService";
import {
  createProject,
  getProjectsByUser,
  updateProject,
  deleteProject,
} from "./ProjectService";
import {
  createTask,
  getTasksByProjectId,
  updateTask,
  deleteTask,
} from "./TaskService";

export {
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  loginWithFacebook,
  loginWithGoogle,
  logout,
  createProject,
  getProjectsByUser,
  updateProject,
  deleteProject,
  createTask,
  getTasksByProjectId,
  updateTask,
  deleteTask,
};
