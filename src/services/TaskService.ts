import axios from "axios";

const createTask = async (
  categoryId: number,
  title: string,
  description: string,
  status: string,
  priority: string
) => {
  try {
    const task = {
      id_categoria: categoryId,
      titulo: title,
      descripcion: description,
      estado: status,
      prioridad: priority,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/tareas`,
      task,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

const getTasksByCategoryId = async (categoryId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/tareas/categoria/${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

const getTaskById = async (taskId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/tareas/${taskId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
};

const updateTask = async (
  taskId: number,
  title: string,
  status: string,
  priority: string
) => {
  try {
    const task = {
      titulo: title,
      estado: status,
      prioridad: priority,
    };

    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/tareas/${taskId}`,
      task,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

const deleteTask = async (taskId: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/tareas/${taskId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

const getAllCompletedTasks = async (userId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/tareas/usuario/${userId}/finalizadas`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    throw error;
  }
};

export {
  createTask,
  getTasksByCategoryId,
  getTaskById,
  updateTask,
  deleteTask,
  getAllCompletedTasks,
};
