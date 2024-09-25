import { IoLogoApple, IoLogoWindows, IoLogoAndroid } from "react-icons/io";
import { Button } from "./ui/button";

function TrialSection() {
  return (
    <section className="bg-secondary text-white py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            ¡Prueba Taskit Hoy!
          </h2>
          <p className="text-lg md:text-2xl font-semibold mb-8 text-pretty">
            Comienza gratis. No se requiere tarjeta de crédito.
          </p>
          <Button variant="default" size="lg">
            Probar Taskit
          </Button>
          <div className="mt-8 flex justify-center items-center space-x-4">
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
