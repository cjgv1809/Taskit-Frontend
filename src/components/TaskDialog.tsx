import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useProject, useTaskDialog } from "@/hooks";
import { Badge } from "./ui/badge";
import { PriorityEnum, StatusEnum } from "@/types";
import axios from "axios";

function TaskDialog() {
  const { closeDialog, isOpen } = useTaskDialog();
  const [selectedPriority, setSelectedPriority] = useState<PriorityEnum>(
    PriorityEnum.Baja
  );
  const [selectedStatus, setSelectedStatus] = useState<StatusEnum>(
    StatusEnum.PorHacer
  );
  const [taskData, setTaskData] = useState({
    titulo: "",
    descripcion: "",
  });
  const { dispatch } = useProject();
  const { projectId } = useParams<{ projectId: string }>();
  const projectIdNumber = Number(projectId);

  const handlePrioritySelect = (priority: PriorityEnum) => {
    setSelectedPriority(priority);
  };

  const handleStatusSelect = (status: StatusEnum) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/tareas/proyecto/${projectIdNumber}`,
          { headers: { "Content-Type": "application/json" } }
        );

        dispatch({
          type: "FETCH_TASKS_SUCCESS",
          payload: response.data,
        });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: "Error fetching tasks" });
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [projectIdNumber, dispatch]);

  const handleAddTask = async () => {
    try {
      const task = {
        id_proyecto: projectIdNumber,
        titulo: taskData.titulo,
        descripcion: taskData.descripcion,
        estado: selectedStatus,
        prioridad: selectedPriority,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tareas`,
        task,
        { headers: { "Content-Type": "application/json" } }
      );

      dispatch({ type: "ADD_TASK", payload: response.data });

      // refetch tasks
      const responseData = await axios.get(
        `${import.meta.env.VITE_API_URL}/tareas/proyecto/${projectIdNumber}`,
        { headers: { "Content-Type": "application/json" } }
      );

      dispatch({
        type: "FETCH_TASKS_SUCCESS",
        payload: responseData.data,
      });

      setTaskData({
        titulo: "",
        descripcion: "",
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Error adding task" });
      console.error("Error adding task:", err);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogTrigger asChild>
          <div className="hidden"></div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crear nueva tarea</DialogTitle>
            <DialogDescription>
              Añade una nueva tarea para organizar tus actividades.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask();
              closeDialog();
            }}
          >
            <div className="grid gap-4">
              <div>
                <Label
                  htmlFor="name"
                  className="block mb-1 text-base font-medium text-gray-600"
                >
                  Nombre
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ingresa un nombre"
                  name="name"
                  value={taskData.titulo}
                  onChange={(e) => {
                    setTaskData({
                      ...taskData,
                      titulo: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label
                  htmlFor="descripcion"
                  className="block mb-1 text-base font-medium text-gray-600"
                >
                  Descripción
                </Label>
                <Input
                  id="descripcion"
                  type="text"
                  placeholder="Ingresa una descripción"
                  name="descripcion"
                  value={taskData.descripcion}
                  onChange={(e) => {
                    setTaskData({
                      ...taskData,
                      descripcion: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Label
                  htmlFor="priority"
                  className="block mb-1 text-base font-medium text-gray-600"
                >
                  Prioridad
                </Label>
                <div className="flex flex-wrap gap-2">
                  {(["Alta", "Media", "Baja"] as PriorityEnum[]).map(
                    (priority) => (
                      <Badge
                        key={priority}
                        onClick={() => handlePrioritySelect(priority)}
                        className={`cursor-pointer w-24 text-nowrap ${
                          selectedPriority === priority
                            ? "text-white bg-secondary border border-secondary hover:bg-secondary/95"
                            : "text-secondary-foreground"
                        }`}
                      >
                        {priority}
                      </Badge>
                    )
                  )}
                </div>
              </div>
              <div>
                <Label
                  htmlFor="status"
                  className="block mb-1 text-base font-medium text-gray-600"
                >
                  Estado
                </Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    ["Por hacer", "En proceso", "Finalizado"] as StatusEnum[]
                  ).map((status) => (
                    <Badge
                      key={status}
                      onClick={() => handleStatusSelect(status)}
                      className={`cursor-pointer min-w-32 text-nowrap ${
                        selectedStatus === status
                          ? "text-white bg-secondary border border-secondary hover:bg-secondary/95"
                          : "text-secondary-foreground"
                      }`}
                    >
                      {status}
                    </Badge>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialog}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!taskData.titulo}>
                  Crear Tarea
                </Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TaskDialog;
