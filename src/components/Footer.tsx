import { BiLogoFacebook, BiLogoTwitter, BiLogoLinkedin } from "react-icons/bi";

function Footer() {
  return (
    <footer className="bg-white py-4 px-4 text-center">
      <div className="container mx-auto flex items-center justify-between">
        <div className="mt-2 space-x-4">
          <a href="#" className="text-typography font-normal hover:underline">
            Términos y Condiciones
          </a>
          <a href="#" className="text-typography font-normal hover:underline">
            Politica de Privacidad
          </a>
          <a href="#" className="text-typography font-normal hover:underline">
            FAQ (Preguntas Frecuentes)
          </a>
          <a href="#" className="text-typography font-normal hover:underline">
            @{new Date().getFullYear()} Taskit
          </a>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <a href="#" className="text-accent hover:underline">
            <BiLogoFacebook size={40} />
          </a>
          <a href="#" className="text-accent hover:underline">
            <BiLogoTwitter size={40} />
          </a>
          <a href="#" className="text-accent hover:underline">
            <BiLogoLinkedin size={40} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
