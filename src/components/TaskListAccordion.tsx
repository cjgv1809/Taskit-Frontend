import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Edit2, Trash2, TriangleAlert } from "lucide-react";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Badge } from "./ui/badge";
import { PriorityEnum, StatusEnum } from "@/types";
import { useProject } from "@/hooks";
import Loading from "./Loading";

function TaskListAccordion() {
  const { state, dispatch } = useProject();
  const { tasks, loading, error } = state;
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [openAccordionId, setOpenAccordionId] = useState<string | undefined>(
    undefined
  );
  const [editingTaskData, setEditingTaskData] = useState({
    titulo: "",
    descripcion: "",
  });
  const [selectedStatus, setSelectedStatus] = useState<StatusEnum>(
    StatusEnum.PorHacer
  );
  const [selectedPriority, setSelectedPriority] = useState<PriorityEnum>(
    PriorityEnum.Baja
  );
  const { projectId } = useParams<{ projectId: string }>();
  const projectIdNumber = Number(projectId);

  const statusOptions: StatusEnum[] = [
    StatusEnum.PorHacer,
    StatusEnum.EnProceso,
    StatusEnum.Finalizado,
  ];
  const priorityOptions: PriorityEnum[] = [
    PriorityEnum.Alta,
    PriorityEnum.Media,
    PriorityEnum.Baja,
  ];

  const showIconsAccordingToPriority = (priority: string) => {
    switch (priority) {
      case PriorityEnum.Alta:
        return <TriangleAlert size={20} className="text-red-500" />;
      case PriorityEnum.Media:
        return <TriangleAlert size={20} className="text-yellow-500" />;
      case PriorityEnum.Baja:
        return <TriangleAlert size={20} className="text-green-500" />;
      default:
        return null;
    }
  };

  const showBadgeAccordingToStatus = (status: string) => {
    switch (status) {
      case StatusEnum.PorHacer:
        return (
          <Badge variant="secondary" className="px-4">
            {status}
          </Badge>
        );
      case StatusEnum.EnProceso:
        return (
          <Badge variant="secondary" className="px-4">
            {status}
          </Badge>
        );
      case StatusEnum.Finalizado:
        return (
          <Badge variant="secondary" className="px-4">
            {status}
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleAccordionChange = (value: string) => {
    setOpenAccordionId(value === openAccordionId ? undefined : value);
  };

  const fetchTasks = useCallback(async () => {
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
  }, [projectIdNumber, dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [projectIdNumber, fetchTasks]);

  const handleEditTask = async (
    taskId: number,
    titulo: string,
    estado: StatusEnum,
    prioridad: PriorityEnum
  ) => {
    try {
      const updatedTask = {
        titulo,
        estado,
        prioridad,
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/tareas/${taskId}`,
        updatedTask,
        { headers: { "Content-Type": "application/json" } }
      );
      dispatch({ type: "UPDATE_TASK", payload: response.data });

      // refetch tasks
      await fetchTasks();

      // Reset editing state
      setEditingTaskId(null);
      setIsEditingTask(false);
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Error editing task" });
      console.error("Error editing task:", err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tareas/${taskId}`, {
        headers: { "Content-Type": "application/json" },
      });
      dispatch({ type: "DELETE_TASK", payload: taskId });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Error deleting task" });
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="w-full">
      {loading && <Loading />}
      {error && <p>Error al cargar tareas</p>}

      {tasks?.length === 0 && (
        <p className="text-lg font-semibold text-center text-gray-500">
          No hay tareas en este proyecto
        </p>
      )}

      {tasks?.length > 0 &&
        tasks?.map((task) => (
          <React.Fragment key={task.id_tarea.toString()}>
            <Accordion
              type="single"
              collapsible
              value={
                editingTaskId === task.id_tarea
                  ? task.id_tarea.toString()
                  : openAccordionId
              }
              onValueChange={handleAccordionChange}
              className="mb-2 bg-white rounded-lg shadow-sm dark:bg-secondary/50"
            >
              <AccordionItem value={task.id_tarea.toString()}>
                <AccordionTrigger>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {editingTaskId === task.id_tarea && isEditingTask ? (
                        <Input
                          type="text"
                          value={editingTaskData.titulo || ""}
                          placeholder="Ingrese título de la tarea"
                          onChange={(e) => {
                            setEditingTaskData((prev) => ({
                              ...prev,
                              titulo: e.target.value,
                            }));
                          }}
                        />
                      ) : (
                        <div className="flex items-center gap-4">
                          <h3 className="text-lg font-extrabold text-gray-700 dark:text-dark-primary-foreground">
                            {task.estado === StatusEnum.Finalizado ? (
                              <del className="text-lg font-extrabold text-gray-700 dark:text-dark-primary-foreground">
                                {task.titulo}
                              </del>
                            ) : (
                              task.titulo
                            )}
                          </h3>
                          <div className="flex items-center gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <div>
                                    {showIconsAccordingToPriority(
                                      task.prioridad
                                    )}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Prioridad {task.prioridad}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            {showBadgeAccordingToStatus(task.estado)}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Editar Tarea"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTaskId(task.id_tarea);
                          setEditingTaskData({
                            titulo: task.titulo || "",
                            descripcion: task.descripcion || "",
                          });
                          setIsEditingTask((prev) => !prev);
                          setSelectedStatus(task.estado as StatusEnum);
                          setSelectedPriority(task.prioridad as PriorityEnum);
                          setOpenAccordionId(task.id_tarea.toString());
                        }}
                        className="p-3 transition-all hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-secondary/95"
                      >
                        <Edit2 size={22} className="text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Eliminar Tarea"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsTaskDialogOpen(true);
                        }}
                        className="p-3 transition-all hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-secondary/95"
                      >
                        <Trash2 size={22} className="text-red-500" />
                      </Button>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <>
                    {editingTaskId === task.id_tarea && isEditingTask ? (
                      <Input
                        type="text"
                        value={editingTaskData.descripcion || ""}
                        placeholder="Ingrese descripción de la tarea"
                        onChange={(e) => {
                          setEditingTaskData((prev) => ({
                            ...prev,
                            descripcion: e.target.value,
                          }));
                        }}
                      />
                    ) : (
                      <p className="text-base font-bold text-gray-500 dark:text-gray-400">
                        {task.descripcion ?? "Sin descripción"}
                      </p>
                    )}
                    {editingTaskId === task.id_tarea && isEditingTask && (
                      <div className="flex flex-col gap-4 mt-4">
                        <div className="grid grid-cols-[1fr,1fr] gap-2 items-center">
                          <Label className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Seleccione el estado de la tarea
                          </Label>
                          <div className="flex flex-wrap justify-end gap-3">
                            {statusOptions.map((status) => (
                              <Badge
                                key={status}
                                className={`px-4 bg-primary-foreground/10 min-w-28
                                  ${
                                    selectedStatus === status
                                      ? "dark:bg-primary-foreground dark:text-primary bg-accent"
                                      : "bg-primary-foreground/10"
                                  }
                                  `}
                                onClick={() => setSelectedStatus(status)}
                              >
                                {status}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-[1fr,1fr] gap-2 items-center">
                          <Label className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Seleccione la prioridad de la tarea
                          </Label>
                          <div className="flex flex-wrap justify-end gap-3">
                            {priorityOptions.map((priority) => (
                              <Badge
                                key={priority}
                                className={`px-4 bg-primary-foreground/10 min-w-28
                                  ${
                                    selectedPriority === priority
                                      ? "dark:bg-primary-foreground dark:text-primary bg-accent"
                                      : "bg-primary-foreground/10"
                                  }
                                  `}
                                onClick={() => setSelectedPriority(priority)}
                              >
                                {priority}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          type="button"
                          onClick={() => {
                            handleEditTask(
                              task.id_tarea,
                              editingTaskData.titulo,
                              selectedStatus,
                              selectedPriority
                            );
                            setEditingTaskId(null);
                          }}
                        >
                          Guardar cambios
                        </Button>
                      </div>
                    )}
                  </>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Separator className="my-4 last:hidden" />
          </React.Fragment>
        ))}

      {/* Delete task modal */}
      {isTaskDialogOpen &&
        tasks.map((task) => (
          <React.Fragment key={task.id_tarea}>
            <AlertDialog
              open={isTaskDialogOpen}
              onOpenChange={setIsTaskDialogOpen}
            >
              <AlertDialogTrigger>
                <div className="hidden"></div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás seguro de que quieres eliminar esta tarea?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Al eliminar la tarea, se
                    borrarán todos los datos asociados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsTaskDialogOpen(false)}>
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDeleteTask(task.id_tarea);
                      setIsTaskDialogOpen(false);
                    }}
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </React.Fragment>
        ))}
    </div>
  );
}

export default TaskListAccordion;
