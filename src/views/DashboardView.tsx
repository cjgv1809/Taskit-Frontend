import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu, Plus, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/AuthService";

function DashboardView() {
  const { currentUser } = useAuth();

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
                <div className="flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100">
                  <span>Proyectos</span>
                  <Plus size={20} />
                </div>
                <div>
                  <Link
                    to="#"
                    className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    Primer Proyecto
                  </Link>
                </div>
              </li>
            </ul>
          </nav>
          <Button variant="ghost" size="lg" asChild>
            <Link to="/" className="w-full" onClick={logout}>
              Cerrar Sesión
            </Link>
          </Button>
          <div className="flex justify-center w-full border-t">
            <img src="images/Logo.svg" alt="Taskit Logo" className="w-40" />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-[0.8] flex flex-col overflow-hidden">
          {/* Page Content */}
          <main className="flex-1 p-6 overflow-y-auto">
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

            <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
              <img
                src="images/dashboard-image.webp"
                alt="Dashboard Image"
                className="w-48 h-auto mx-auto"
              />
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Historial de Tareas Completadas
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Add completed tasks list here */}
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
