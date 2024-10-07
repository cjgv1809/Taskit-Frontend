import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Plus, ChevronRight, LogOut } from "lucide-react";
import { useAuth, useUser } from "@/hooks";
import Project from "@/components/Project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logout } from "@/services/AuthService";
import { createProject, deleteProject, getProjectsByUser } from "@/services";

interface ProjectType {
  id_usuario: number;
  nombre: string;
  descripcion: string;
}

interface ProjectTypeResponse {
  id_proyecto: number;
  message: string;
}

interface FullProjectType extends ProjectType {
  id_proyecto: number;
  message: string;
}

function DashboardView() {
  const { currentUser } = useAuth();
  const { userId } = useUser();
  const [projects, setProjects] = useState<FullProjectType[]>([]);
  const [, setProjectId] = useState(0);
  const [projectData, setProjectData] = useState({
    nombre: "",
    descripcion: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log("userId:", userId);

  useEffect(() => {
    // fetch projects on component mount
    const handleFetchProjects = async () => {
      try {
        if (userId !== null) {
          const projects: FullProjectType[] = await getProjectsByUser(1);
          setProjects(projects);
        } else {
          console.error("User ID is null");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    // fetch projects
    handleFetchProjects();
  }, [userId]);

  // create new project
  const handleCreateNewProject = async () => {
    try {
      if (userId === null) {
        console.error("User ID is null");
        return;
      }
      const newProject: ProjectType = { ...projectData, id_usuario: userId };

      if (
        newProject.nombre.trim() === "" ||
        newProject.descripcion.trim() === ""
      ) {
        console.error("Project name and description cannot be blank");
        return;
      }

      console.log("Creating new project:", newProject);

      const response: ProjectTypeResponse = await createProject(newProject);

      const { id_proyecto, message } = response;
      console.log("Project created:", id_proyecto, message);

      // Set project ID and add to projects list
      setProjectId(id_proyecto);
      console.log("Project ID:==============>>>>", id_proyecto);

      if (userId === null) {
        console.error("User ID is null");
        return;
      }

      const fullProject: FullProjectType = {
        ...newProject,
        id_usuario: userId,
        id_proyecto,
        message,
      };

      setProjects((prevProjects) => [...prevProjects, fullProject]);
      setProjectData({ nombre: "", descripcion: "" });
    } catch (error) {
      console.error("Error creating project:", error);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteProject = async (projectId: number) => {
    try {
      await deleteProject(projectId);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id_proyecto !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Menu className="text-gray-500" />
          <span className="text-gray-600">Inicio /</span>
        </div>
        <div className="flex items-center"></div>
      </header>

      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="flex-[0.2] bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4">
            <button className="flex items-center justify-center w-full px-4 py-2 font-medium text-red-600 bg-red-100 rounded-md">
              <Plus size={20} className="mr-2" />
              Añadir tarea
            </button>
          </div>
          <nav className="flex-1 mt-4">
            <ul>
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex items-center justify-between w-full px-4 py-2 text-base text-gray-600 rounded-none hover:bg-gray-100"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Proyectos
                  <Plus size={20} />
                </Button>
                <div>
                  {projects.map((project, index) => (
                    <Link
                      to="#"
                      className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100"
                      key={`project-${index}`}
                    >
                      <ChevronRight size={16} className="mr-2" />
                      {project.nombre}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </nav>
          <Button variant="ghost" size="lg" asChild>
            <Link
              to="/"
              onClick={logout}
              className="flex items-center w-full gap-2 text-base text-gray-600 rounded-none hover:bg-gray-100"
            >
              <LogOut size={20} />
              <span className="font-semibold text-gray-600">Cerrar Sesión</span>
            </Link>
          </Button>
          <div className="flex justify-center w-full border-t">
            <img src="images/Logo.svg" alt="Taskit Logo" className="w-40" />
          </div>
        </aside>

        {/* Dialog to add a new project */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div className="hidden"></div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Crear nuevo proyecto</DialogTitle>
              <DialogDescription>
                Añade un nuevo proyecto a tu lista
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateNewProject();
              }}
            >
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name" className="sr-only">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ingresa un nombre"
                    name="name"
                    value={projectData.nombre}
                    onChange={(e) =>
                      setProjectData({ ...projectData, nombre: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="descripcion" className="sr-only">
                    Descripción
                  </Label>
                  <Input
                    id="descripcion"
                    type="text"
                    placeholder="Ingresa una descripción"
                    name="descripcion"
                    value={projectData.descripcion}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        descripcion: e.target.value,
                      })
                    }
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Crear Proyecto</Button>
                </DialogFooter>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Main Content */}
        <div className="flex-[0.8] flex flex-col overflow-hidden">
          {/* Page Content */}
          <main className="flex-1 p-6 pb-20 overflow-y-scroll scrollbar-none">
            <h1 className="mb-2 text-2xl font-bold">
              Hola, {currentUser?.displayName}!
            </h1>
            <p className="mb-6 text-gray-600">
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Dashboard Image */}
            {projects.length === 0 && (
              <div className="flex flex-col items-center p-6 mb-6 bg-white rounded-lg shadow-sm">
                <img
                  src="images/dashboard-image.webp"
                  alt="Dashboard Image"
                  className="w-48 h-auto mx-auto"
                />
                <p className="mt-4 font-semibold text-center text-gray-600">
                  ¡Añade un nuevo proyecto para comenzar!
                </p>
                <Button
                  variant="default"
                  size="lg"
                  className="mt-4"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus size={20} className="mr-2" />
                  Crear Proyecto
                </Button>
              </div>
            )}

            <div className="space-y-6">
              {projects.map((project) => (
                <Project
                  key={project.id_proyecto}
                  project={project}
                  projectId={project.id_proyecto}
                  projectData={projectData}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
