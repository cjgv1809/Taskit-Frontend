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
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesByProjectId,
  getCategoryByProjectId,
} from "./CategoryService";

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
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesByProjectId,
  getCategoryByProjectId,
};
