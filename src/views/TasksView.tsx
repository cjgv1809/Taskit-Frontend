import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ArrowLeft, ChevronRight, LogOut } from "lucide-react";
import { useAuth, useProject, useTheme, useUser } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import MobileNavSheet from "@/components/MobileNavSheet";
import { logout } from "@/services";
import axios from "axios";

function TasksView() {
  const { currentUser } = useAuth();
  const { userId } = useUser();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { state, dispatch } = useProject();
  const { projects, tasks } = state;
  const { isDarkMode } = useTheme();

  // find project name by id
  const findProjectName = (projectId: number) => {
    const project = projects.find(
      (project) => project.id_proyecto === projectId
    );
    return project?.nombre;
  };

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/tareas/usuario/${userId}/finalizadas`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({ type: "FETCH_ALL_TASKS_SUCCESS", payload: response.data });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: "Error fetching all tasks" });
        console.error("Error fetching tasks:", err);
      }
    };

    fetchAllTasks();
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/proyectos/usuario/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({ type: "FETCH_PROJECTS_SUCCESS", payload: response.data });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: "Error fetching projects" });
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, [dispatch, userId]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between w-full p-4 bg-white border-b border-gray-200 dark:bg-secondary dark:text-dark-primary-foreground dark:border-border">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => mobileMenuRef.current?.click()}
          >
            <Menu
              size={24}
              className="block text-gray-500 cursor-pointer dark:text-dark-primary-foreground md:hidden"
            />
          </Button>

          {/* Mobile Menu */}
          <MobileNavSheet ref={mobileMenuRef} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <DarkModeSwitch />
          </div>
          <div className="ml-6">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {currentUser?.displayName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p className="font-semibold">{currentUser?.displayName}</p>
                  <p className="text-gray-500">{currentUser?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/proyectos/tareas">Ver tareas completadas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/" onClick={logout}>
                    Cerrar Sesión
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-[0.2] flex-col h-full bg-white border-r border-gray-200 dark:border-border">
          <aside className="flex flex-col h-full overflow-y-auto bg-white dark:bg-secondary dark:text-white dark:border-border">
            <nav className="flex-grow mt-4 overflow-y-auto scrollbar-none">
              <ul>
                <li>
                  <Link
                    to="/proyectos"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 hover:dark:bg-primary"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex items-center justify-between w-full px-4 py-2 text-base text-gray-600 rounded-none hover:bg-gray-100 dark:text-gray-300 hover:dark:bg-primary"
                  >
                    Proyectos
                  </Button>
                  <div>
                    <ul>
                      <li>
                        {projects.map((project) => (
                          <Link
                            key={project.id_proyecto}
                            to={`/proyectos/${project.id_proyecto}`}
                            className="flex items-center w-full p-3 ml-0.5 font-medium rounded-md hover:bg-primary dark:text-gray-300"
                          >
                            <ChevronRight size={18} className="mr-1" />
                            {project.nombre}
                          </Link>
                        ))}
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link
                    to="/proyectos/tareas"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 hover:dark:bg-primary"
                  >
                    Tareas
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="mt-auto">
              <Button
                variant="ghost"
                size="lg"
                onClick={logout}
                asChild
                className="justify-start px-4 py-2"
              >
                <Link
                  to="/"
                  className="flex items-center w-full gap-2 px-4 py-2 text-base text-gray-600 rounded-none hover:bg-gray-100 dark:text-secondary-foreground hover:dark:bg-primary"
                >
                  <LogOut size={20} />
                  <span className="font-semibold">Cerrar Sesión</span>
                </Link>
              </Button>
              <div className="flex justify-center w-full border-t dark:border-border">
                <svg
                  className="w-32 h-auto"
                  viewBox="0 0 276 89"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.3333 25.7H27.58C26.6 22.974 24.0333 21 21 21C17.9667 21 15.4 22.974 14.42 25.7H4.66667C2.1 25.7 0 27.815 0 30.4V63.3C0 65.885 2.1 68 4.66667 68H37.3333C39.9 68 42 65.885 42 63.3V30.4C42 27.815 39.9 25.7 37.3333 25.7ZM21 25.7C22.2833 25.7 23.3333 26.7575 23.3333 28.05C23.3333 29.3425 22.2833 30.4 21 30.4C19.7167 30.4 18.6667 29.3425 18.6667 28.05C18.6667 26.7575 19.7167 25.7 21 25.7ZM25.6667 58.6H9.33333V53.9H25.6667V58.6ZM32.6667 49.2H9.33333V44.5H32.6667V49.2ZM32.6667 39.8H9.33333V35.1H32.6667V39.8Z"
                    fill="#F5684E"
                  />
                  <path
                    d="M65.432 71V37.08H55.512V26.968H90.264V37.08H80.344V71H65.432Z"
                    fill={isDarkMode ? "#FFF" : "#111010"}
                  />
                  <path
                    d="M151.96 72.024C149.272 72.024 146.541 71.6827 143.768 71C140.995 70.36 138.648 69.4853 136.728 68.376L139.032 57.944C141.507 59.2667 143.811 60.1413 145.944 60.568C148.12 60.952 150.125 61.144 151.96 61.144C153.667 61.144 154.947 60.8667 155.8 60.312C156.696 59.7573 157.144 59.0107 157.144 58.072C157.144 57.2187 156.653 56.5573 155.672 56.088C154.691 55.576 153.411 55.1067 151.832 54.68C150.296 54.2533 148.653 53.7627 146.904 53.208C145.155 52.6107 143.491 51.8427 141.912 50.904C140.376 49.9227 139.117 48.6427 138.136 47.064C137.155 45.4427 136.664 43.416 136.664 40.984C136.664 37.912 137.411 35.2667 138.904 33.048C140.397 30.7867 142.531 29.0587 145.304 27.864C148.077 26.6267 151.341 26.008 155.096 26.008C157.613 26.008 160.067 26.3493 162.456 27.032C164.888 27.672 166.829 28.5467 168.28 29.656L166.104 39.064C163.928 38.168 161.965 37.528 160.216 37.144C158.509 36.7173 156.888 36.504 155.352 36.504C153.56 36.504 152.195 36.76 151.256 37.272C150.317 37.784 149.848 38.4667 149.848 39.32C149.848 40.1307 150.339 40.792 151.32 41.304C152.301 41.816 153.56 42.3067 155.096 42.776C156.632 43.2453 158.275 43.7787 160.024 44.376C161.773 44.9733 163.416 45.7627 164.952 46.744C166.488 47.7253 167.747 49.0053 168.728 50.584C169.709 52.1627 170.2 54.1467 170.2 56.536C170.2 61.4853 168.579 65.304 165.336 67.992C162.136 70.68 157.677 72.024 151.96 72.024ZM174.583 71V26.968H189.431V44.504H193.975L202.551 26.968H218.551L206.903 48.792L220.151 71H203.255L193.783 54.04H189.431V71H174.583ZM222.083 71V26.968H236.547V71H222.083ZM250.495 71V37.08H240.575V26.968H275.326V37.08H265.407V71H250.495Z"
                    fill={isDarkMode ? "#FFF" : "#111010"}
                  />
                  <path
                    d="M100 27H112L103.489 71H87L100 27Z"
                    fill={isDarkMode ? "#FFF" : "#111010"}
                  />
                  <path
                    d="M100 27H112L103.489 71H87L100 27Z"
                    fill={isDarkMode ? "#FFF" : "#111010"}
                  />
                  <path
                    d="M108.813 27H120.5L133.489 71H117L108.813 27Z"
                    fill={isDarkMode ? "#FFF" : "#111010"}
                  />
                  <path
                    d="M108.813 27H120.5L133.489 71H117L108.813 27Z"
                    fill={isDarkMode ? "#FFF" : "#111010"}
                  />
                  <ellipse
                    cx="110.062"
                    cy="66.5"
                    rx="5.0625"
                    ry="4.5"
                    fill="#F5684E"
                  />
                </svg>
              </div>
            </div>
          </aside>
        </div>

        {/* Main Content */}
        <div className="md:flex-[0.8] flex-1 p-4 overflow-y-auto bg-primary/95 pb-20 scrollbar-thin scrollbar-thumb-primary scrollbar-track-background">
          {/* Page Content */}
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/proyectos")}
            className="flex items-center gap-2 mb-10 text-white"
          >
            <ArrowLeft size={20} className="text-white" />
            Volver a Proyectos
          </Button>
          <main className="flex-1 overflow-y-scroll rounded-lg scrollbar-none dark:text-white">
            <h1 className="mb-2 text-2xl font-bold">
              Hola, {currentUser?.displayName}!
            </h1>
            <p className="mb-6 font-light text-gray-600">
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {tasks?.length === 0 ? (
              <div className="p-4 mb-6 bg-white rounded-lg shadow-sm dark:bg-secondary dark:text-white">
                <h3 className="text-xl font-bold text-center">
                  No hay tareas completadas
                </h3>
              </div>
            ) : (
              <h2 className="mb-4 text-xl font-semibold">
                Tareas completadas{" "}
                <span className="font-normal text-gray-600">
                  ({tasks?.length || 0})
                </span>
              </h2>
            )}

            {/* Show Tasks */}
            <div>
              {tasks?.length > 0 &&
                tasks?.map((task) => (
                  <div
                    key={task.id_tarea}
                    className="p-4 mb-6 bg-white rounded-lg shadow-sm dark:bg-secondary dark:text-white last:mb-0"
                  >
                    <h3 className="text-xl font-bold">{task.titulo}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Estado:</span>{" "}
                      <span className="text-accent2">Completada</span>
                    </p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Prioridad:</span>{" "}
                      {task.prioridad === "Alta" ? (
                        <span className="text-red-500">{task.prioridad}</span>
                      ) : task.prioridad === "Media" ? (
                        <span className="text-yellow-500">
                          {task.prioridad}
                        </span>
                      ) : (
                        <span className="text-green-500">{task.prioridad}</span>
                      )}
                    </p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {task.descripcion || ""}
                    </p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Proyecto:</span>{" "}
                      {findProjectName(task.id_proyecto)}
                    </p>
                  </div>
                ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default TasksView;
