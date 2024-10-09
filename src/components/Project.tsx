import { useEffect, useState } from "react";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  deleteCategory,
  deleteProject,
  getCategoriesByProjectId,
  updateCategory,
  updateProject,
} from "@/services";
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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { Separator } from "./ui/separator";
import CategoryComponent from "./Category";
import { useProject } from "@/hooks";

interface ProjectProps {
  project: {
    id_usuario: number;
    nombre: string;
    descripcion: string;
    id_proyecto: number;
  };
  projectId: number;
  projectData: {
    nombre: string;
    descripcion: string;
  };
  onDelete: (projectId: number) => void;
}

interface Category {
  id_categoria: number;
  nombre: string;
  descripcion: string | null;
}

function Project({ project, projectId, onDelete }: ProjectProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState(project.nombre);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [editingCategoryData, setEditingCategoryData] = useState({
    nombre: "",
    descripcion: "",
  });
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(0);
  const { setProjectId } = useProject();
  // const { userId: idUser } = useUser();
  console.log("Project ID from context:", projectId);
  // console.log("User ID from context:", idUser);

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId);
      // Refetch categories after deleting
      if (projectId !== null) {
        const updatedCategories = await getCategoriesByProjectId(projectId);
        setCategories(updatedCategories);
      } else {
        console.error("Project ID is null");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdateCategory = async (categoryId: number) => {
    if (!editingCategoryData.nombre) {
      console.error("Category name is required");
      return;
    }

    try {
      const updatedCategory = await updateCategory(
        categoryId,
        editingCategoryData.nombre,
        editingCategoryData.descripcion
      );
      console.log("Updated category data:", updatedCategory);

      // Update the local state immediately
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id_categoria === categoryId ? { ...cat, ...updatedCategory } : cat
        )
      );
      setEditingCategoryId(null);
      // Refetch categories to ensure data consistency
      await fetchCategories(projectId);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    categoryId: number
  ) => {
    if (e.key === "Enter") {
      handleUpdateCategory(categoryId);
    }
  };

  const handleCategoryCreated = async (categoryId: number) => {
    console.log("New category created with ID:", categoryId);
    // Refetch categories after creating a new one

    const updatedCategories = await getCategoriesByProjectId(projectId);
    setCategories(updatedCategories);
  };

  const fetchCategories = async (projectId: number) => {
    console.log("Fetching categories for projectId:", projectId);

    try {
      const response = await getCategoriesByProjectId(projectId);
      if (response && Array.isArray(response)) {
        setCategories(response);
        console.log("Categories fetched successfully:", response);
      } else {
        console.warn("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (!projectId) {
      console.warn("No projectId provided");
      return;
    }

    fetchCategories(projectId);
  }, [projectId]);

  const handleUpdateProject = async (projectId: number, name: string) => {
    try {
      if (name.trim() === "") {
        console.error("Project name cannot be blank");
        return;
      }
      await updateProject(projectId, name);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    try {
      // Remove the project ID from the list of project IDs
      setProjectId((prevProjectIds) =>
        prevProjectIds.filter((id) => id !== projectId)
      );

      // Call the deleteProject function with the correct projectId
      await deleteProject(projectId);

      console.log("Project deleted:", projectId);
      onDelete(projectId); // Call the callback function to update the parent state
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (projectName.trim() === "") {
        console.error("Project name cannot be blank");
        return;
      }
      setIsEditing(false);
      handleUpdateProject(projectId, projectName);
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-4 p-4 bg-white rounded-lg rounded-b-none shadow-sm">
        <div className="flex flex-col w-full gap-2">
          {isEditing ? (
            <Input
              type="text"
              autoFocus
              defaultValue={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={() => {
                setIsEditing(false);
                handleUpdateProject(projectId, projectName);
              }}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <h1 className="text-2xl font-bold">{projectName}</h1>
          )}
          <p className="text-gray-500">{project.descripcion}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            title="Editar Proyecto"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 size={20} className="text-white" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            title="Eliminar Proyecto"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 size={20} className="text-white" />
          </Button>
        </div>
      </div>

      <div className="p-4 pt-0 bg-white rounded-lg rounded-t-none shadow">
        <Button
          variant="default"
          size="lg"
          onClick={() => {
            setIsCreatingCategory(true);
            setIsProjectDialogOpen(true);
          }}
        >
          <Plus size={20} className="mr-2" />
          Añadir Categoría
        </Button>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogTrigger>
          <div className="hidden"></div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro de que quieres eliminar este proyecto?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Al eliminar el proyecto, se
              borrarán todos los datos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteProject(projectId);
                setIsDeleteDialogOpen(false);
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Show categories accordion */}
      {categories.length > 0 && (
        <>
          {categories.map((category: Category) => (
            <Accordion
              key={category.id_categoria}
              type="single"
              collapsible
              className="mb-2 bg-white rounded-lg shadow-sm"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {editingCategoryId === category.id_categoria ? (
                        <Input
                          type="text"
                          value={editingCategoryData.nombre}
                          onChange={(e) => {
                            setEditingCategoryData((prev) => ({
                              ...prev,
                              nombre: e.target.value,
                            }));
                          }}
                          onKeyDown={(e) =>
                            handleKeyPress(e, category.id_categoria)
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="mr-2"
                        />
                      ) : (
                        <h3 className="text-lg font-semibold text-gray-700">
                          {category.nombre}
                        </h3>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Editar Categoria"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCategoryId(category.id_categoria);
                          setEditingCategoryData({
                            nombre: category.nombre,
                            descripcion: category.descripcion || "", // Use empty string if null
                          });
                        }}
                        className="p-3 transition-all hover:bg-gray-100 focus-visible:bg-gray-100"
                      >
                        <Edit2 size={22} className="text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        title="Eliminar Categoria"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCategoryToDelete(category.id_categoria); // Set the category ID to state
                          setIsCategoryDialogOpen(true); // Open the dialog
                        }}
                        className="p-3 transition-all hover:bg-gray-100 focus-visible:bg-gray-100"
                      >
                        <Trash2 size={22} className="text-red-500" />
                      </Button>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {editingCategoryId === category.id_categoria ? (
                    <Input
                      type="text"
                      value={editingCategoryData.descripcion}
                      onChange={(e) => {
                        setEditingCategoryData((prev) => ({
                          ...prev,
                          descripcion: e.target.value,
                        }));
                      }}
                      onKeyDown={(e) =>
                        handleKeyPress(e, category.id_categoria)
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="mr-2"
                    />
                  ) : (
                    <p className="text-base font-medium text-gray-500">
                      {category.descripcion || "Sin descripción"}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          <Separator className="mt-8 mb-12 last-of-type:not" />
        </>
      )}

      {/* Creating a new category */}
      {isCreatingCategory && (
        <CategoryComponent
          projectId={projectId}
          isDialogOpen={isProjectDialogOpen}
          setIsDialogOpen={setIsProjectDialogOpen}
          onCreate={() => {
            setIsCreatingCategory(false);
            // Refetch categories after creating a new one
            fetchCategories(projectId);
          }}
          onCategoryCreated={handleCategoryCreated}
        />
      )}

      {/* Delete category modal */}
      {isCategoryDialogOpen && (
        <AlertDialog
          open={isCategoryDialogOpen}
          onOpenChange={setIsCategoryDialogOpen}
        >
          <AlertDialogTrigger>
            <div className="hidden"></div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Estás seguro de que quieres eliminar esta categoría?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Al eliminar la categoría, se
                borrarán todos los datos asociados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsCategoryDialogOpen(false)}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (categoryToDelete) {
                    handleDeleteCategory(categoryToDelete); // Use the state variable
                    setIsCategoryDialogOpen(false);
                    setCategoryToDelete(0);
                  }
                }}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center">
              <ChevronDown size={20} className="mr-2" />
              <span className="font-semibold">Backend</span>
            </div>
            <span className="text-gray-500">1</span>
          </div>
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 mr-3 text-blue-600 form-checkbox"
                />
                <span>Crear el repositorio de Github</span>
              </div>
              <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-200 rounded">
                Por Hacer
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                <Plus size={20} className="mr-2 text-red-500" />
                <input
                  type="text"
                  placeholder="Añadir tarea"
                  className="flex-grow bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div> */}

      {/* <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center">
              <ChevronDown size={20} className="mr-2" />
              <span className="font-semibold">Frontend</span>
            </div>
            <span className="text-gray-500">3</span>
          </div>
        </div> */}
    </div>
  );
}

export default Project;
