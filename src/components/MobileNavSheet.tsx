import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useProject, useTheme } from "@/hooks";
import { logout } from "@/services";

const MobileNavSheet = forwardRef<HTMLDivElement>((_, ref) => {
  const { isDarkMode } = useTheme();
  const { state } = useProject();
  const { projects } = state;

  return (
    <Sheet>
      <SheetTrigger>
        <div ref={ref} className="hidden"></div>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>
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
          </SheetTitle>
        </SheetHeader>
        <SheetDescription asChild>
          <div className="flex flex-col items-start gap-2 my-10" role="menu">
            <ul className="flex flex-col w-full">
              <li className="w-full p-3 border-b rounded-md hover:bg-primary">
                <Link
                  to="/proyectos"
                  className="font-semibold text-primary-foreground"
                >
                  Inicio
                </Link>
              </li>
              <li className="w-full p-3 border-b rounded-md hover:bg-primary">
                <Link
                  to="/proyectos"
                  className="font-semibold text-primary-foreground"
                >
                  Proyectos
                </Link>
              </li>
              <ul>
                {projects.map((project, index) => (
                  <li key={`project-${index}`}>
                    <Link
                      to={`/proyectos/${project.id_proyecto}`}
                      className="flex items-center w-full p-3 ml-1 font-medium rounded-md hover:bg-primary"
                    >
                      <ChevronRight size={16} className="mr-2" />
                      {project.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
              <li className="w-full p-3 border-b rounded-md hover:bg-primary">
                <Link
                  to="/proyectos/tareas"
                  className="font-semibold text-primary-foreground"
                >
                  Tareas
                </Link>
              </li>
            </ul>
          </div>
        </SheetDescription>
        <div className="mt-auto">
          <Button
            variant="default"
            size="lg"
            className="w-full font-medium"
            onClick={logout}
          >
            <LogOut size={20} className="mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
});

export default MobileNavSheet;
