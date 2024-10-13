import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

function NotFoundView() {
  return (
    <section className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-primary">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md dark:bg-secondary">
        <svg
          className="w-24 h-24 mx-auto mb-6 text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01"
          />
        </svg>
        <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-dark-primary">
          404
        </h1>
        <p className="mb-6 text-xl text-gray-600 dark:text-dark-primary-foreground">
          Oops! Página no encontrada
        </p>
        <p className="mb-8 text-gray-500 dark:text-dark-primary-foreground">
          Lo sentimos, la página que estás buscando no existe o ha sido
          eliminada.
        </p>
        <Button
          size="lg"
          className="dark:bg-primary dark:text-dark-primary"
          asChild
        >
          <Link to="/" className="inline-flex items-center justify-center">
            <Home size={20} className="mr-2" />
            Volver al Inicio
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default NotFoundView;
