import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Hero() {
  return (
    <section className="px-4 py-16 text-white lg:p-32 bg-secondary dark:bg-dark-primary">
      <div className="container flex flex-col items-center justify-center mx-auto md:flex-row md:gap-10 md:justify-between">
        <div className="flex flex-col mb-8 md:flex-1 md:block md:mb-0">
          <h1 className="mb-4 text-5xl font-bold text-center md:text-7xl text-balance md:text-left">
            Organízate y despega hacia tus metas.
          </h1>
          <p className="mb-6 text-lg font-semibold text-center md:text-2xl text-pretty md:text-left">
            Nuestra aplicación te permite gestionar tus tareas de manera
            eficiente, mantener el control de tus proyectos y lograr tus
            objetivos con facilidad.
          </p>
          <Button variant="default" size="lg" className="self-center" asChild>
            <Link to="/sign-in">Comienza ahora</Link>
          </Button>
        </div>
        <div className="w-64 md:w-80">
          <img
            src="/images/hero-image.webp"
            alt="Hero Image"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
