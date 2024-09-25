import { Button } from "./ui/button";

function Hero() {
  return (
    <section className="bg-secondary text-white py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row md:gap-10 items-center justify-center md:justify-between">
        <div className="md:flex-1 md:block mb-8 md:mb-0 flex flex-col">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance text-center md:text-left">
            Organízate y despega hacia tus metas.
          </h1>
          <p className="text-lg md:text-2xl font-semibold mb-6 text-pretty text-center md:text-left">
            Nuestra aplicación te permite gestionar tus tareas de manera
            eficiente, mantener el control de tus proyectos y lograr tus
            objetivos con facilidad.
          </p>
          <Button variant="default" size="lg" className="self-center">
            Comienza ahora
          </Button>
        </div>
        <div className="md:w-80 w-64">
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
