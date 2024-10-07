import axios from "axios";

const createCategory = async (
  name: string,
  descripcion: string,
  projectId: number
) => {
  try {
    const requestBody = {
      nombre: name,
      descripcion: descripcion,
      id_proyecto: projectId,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/categorias`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

const getCategoriesByProjectId = async (projectId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/categorias/proyecto/${projectId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const getCategoryByProjectId = async (categoryId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/categorias/${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

const updateCategory = async (
  categoryId: number,
  name: string,
  descripcion: string
) => {
  try {
    const requestBody = {
      nombre: name,
      descripcion: descripcion,
    };

    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/categorias/${categoryId}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

const deleteCategory = async (categoryId: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/categorias/${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export {
  createCategory,
  getCategoriesByProjectId,
  getCategoryByProjectId,
  updateCategory,
  deleteCategory,
};
