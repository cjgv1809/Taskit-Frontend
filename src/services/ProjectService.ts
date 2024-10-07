import axios from "axios";

interface Project {
  nombre: string;
  descripcion: string;
  id_usuario: number;
}

interface ProjectResponse {
  id_proyecto: number;
  message: string;
}

const createProject = async (
  projectData: Project
): Promise<ProjectResponse> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/proyectos`,
      projectData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 201) {
      throw new Error("Error creating project");
    }

    const { id_proyecto, message } = response.data;
    
    console.log(id_proyecto);
    console.log(message);

    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

const getProjectById = async (projectId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/proyectos/${projectId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const getProjectsByUser = async (userId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/proyectos/usuario/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

const updateProject = async (projectId: number, name: string) => {
  try {
    const requestBody = {
      nombre: name,
    };

    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/proyectos/${projectId}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating project name:", error);
    throw error;
  }
};

const deleteProject = async (projectId: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/proyectos/${projectId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export {
  createProject,
  getProjectById,
  getProjectsByUser,
  updateProject,
  deleteProject,
};
