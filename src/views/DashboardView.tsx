import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu, Plus, ChevronRight } from "lucide-react";

function DashboardView() {
  const userId = useUser().user?.id;
  const userName = useUser().user?.firstName;

  return (
    <div>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Menu className="text-gray-500" />
          <span className="text-gray-600">Inicio /</span>
        </div>
        <div className="flex items-center">
          {userId ? <UserButton /> : <SignInButton />}
        </div>
      </header>

      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="flex-[0.2] bg-white border-r border-gray-200 relative">
          <div className="p-4">
            <button className="w-full bg-red-100 text-red-600 rounded-md py-2 px-4 flex items-center justify-center font-medium">
              <Plus size={20} className="mr-2" />
              Añadir tarea
            </button>
          </div>
          <nav className="mt-4">
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
                <div className="flex items-center justify-between text-gray-600 hover:bg-gray-100 px-4 py-2">
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
          <div className="absolute bottom-4 left-4 border-t">
            <img src="images/Logo.svg" alt="Taskit Logo" className="w-40" />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-[0.8] flex flex-col overflow-hidden">
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold mb-2">Hola, {userName}!</h1>
            <p className="text-gray-600 mb-6">
              {new Date().toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <img
                src="images/Imagen-Home.svg"
                alt="Illustration"
                className="w-48 h-48 mx-auto mb-4"
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
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
