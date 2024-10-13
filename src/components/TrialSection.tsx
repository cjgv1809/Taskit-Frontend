import { IoLogoApple, IoLogoWindows, IoLogoAndroid } from "react-icons/io";
import { Button } from "./ui/button";

function TrialSection() {
  return (
    <section className="px-4 py-16 text-white bg-secondary dark:bg-primary dark:text-dark-primary-foreground">
      <div className="container flex flex-col items-center justify-between gap-8 mx-auto md:flex-row">
        <div className="text-center">
          <h2 className="mb-6 text-5xl font-bold md:text-7xl text-balance">
            ¡Prueba Taskit Hoy!
          </h2>
          <p className="mb-8 text-lg font-semibold md:text-2xl text-pretty">
            Comienza gratis. No se requiere tarjeta de crédito.
          </p>
          <Button variant="default" size="lg">
            Probar Taskit
          </Button>
          <div className="flex items-center justify-center mt-8 space-x-4">
            <IoLogoApple size={60} />
            <IoLogoWindows size={60} />
            <IoLogoAndroid size={60} />
          </div>
        </div>
        <div className="md:w-80 w-60">
          <img
            src="/images/trial-image.webp"
            alt="Trial Image"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

export default TrialSection;
