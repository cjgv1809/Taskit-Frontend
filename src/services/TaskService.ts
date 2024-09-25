import axios from "axios";

const baseUrl = "http://localhost:4000";

const getTasks = async () => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createTask = async (task: any) => {
  try {
    const response = await axios.post(`${baseUrl}/dashboard`, task);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async (task: any) => {
  try {
    const response = await axios.put(`${baseUrl}/dashboard/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (id: any) => {
  try {
    const response = await axios.delete(`${baseUrl}/dashboard/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getTasks, createTask, updateTask, deleteTask };
