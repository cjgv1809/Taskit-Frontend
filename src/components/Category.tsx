import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { createCategory, getCategoriesByProjectId } from "@/services";

interface CategoryProps {
  projectId: number;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  onCreate: () => void;
  onCategoryCreated: (categoryId: number) => void;
}

interface Category {
  id: number;
  nombre: string;
  descripcion: string;
}

function Category({
  projectId,
  isDialogOpen,
  setIsDialogOpen,
  onCreate,
  onCategoryCreated,
}: CategoryProps) {
  const [categoryData, setCategoryData] = useState({
    nombre: "",
    descripcion: "",
  });
  const [, setCategoryId] = useState<number | null>(null);
  const [, setCategories] = useState<Category[]>([]);

  const handleCreateNewCategory = async () => {
    try {
      if (categoryData.nombre === "") {
        console.error("Category name is required");
        return;
      }

      const response = await createCategory(
        categoryData.nombre,
        categoryData.descripcion,
        projectId
      );

      const { id_categoria, message } = response;

      // Set the new category ID
      setCategoryId(id_categoria);

      // Call the onCategoryCreated callback with the new category ID
      onCategoryCreated(id_categoria);

      // Refetch categories after creating a new one
      const updatedCategories = await getCategoriesByProjectId(projectId);
      setCategories(updatedCategories);

      // Clear the form
      setCategoryData({ nombre: "", descripcion: "" });

      console.log("Category created:", id_categoria, message);

      // Call the onCreate callback
      onCreate();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  useEffect(() => {
    if (!projectId) return;

    const handleFetchCategories = async () => {

      try {
        const response = await getCategoriesByProjectId(projectId);
        if (response && Array.isArray(response)) {
          setCategories(response);
          console.log("Categories fetched successfully:", response);
        } else {
          console.log("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    handleFetchCategories();
  }, [projectId]);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="hidden"></div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crear nueva categoría</DialogTitle>
            <DialogDescription>
              Añade una nueva categoría para organizar tus tareas.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateNewCategory();
            }}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="cat-name" className="sr-only">
                  Nombre de la categoría
                </Label>
                <Input
                  id="cat-name"
                  type="text"
                  placeholder="Ingresa un nombre"
                  name="name"
                  value={categoryData.nombre}
                  onChange={(e) =>
                    setCategoryData({
                      ...categoryData,
                      nombre: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="cat-descripcion" className="sr-only">
                  Descripción
                </Label>
                <Input
                  id="cat-descripcion"
                  type="text"
                  placeholder="Ingresa una descripción"
                  name="descripcion"
                  value={categoryData.descripcion}
                  onChange={(e) =>
                    setCategoryData({
                      ...categoryData,
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
                <Button type="submit">Crear Categoria</Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Category;
