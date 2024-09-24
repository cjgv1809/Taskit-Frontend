import { BiLogoFacebook, BiLogoTwitter, BiLogoLinkedin } from "react-icons/bi";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white py-4 px-4 text-center">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="mt-2 flex flex-col space-y-2 items-center md:items-center md:flex-row md:space-x-4 md:space-y-0">
          <Link
            to="#"
            className="text-typography font-normal hover:underline"
          >
            Términos y Condiciones
          </Link>
          <Link
            to="#"
            className="text-typography font-normal hover:underline"
          >
            Politica de Privacidad
          </Link>
          <Link
            to="#"
            className="text-typography font-normal hover:underline"
          >
            FAQ (Preguntas Frecuentes)
          </Link>
          <Link
            to="#"
            className="text-typography font-normal hover:underline"
          >
            @{new Date().getFullYear()} Taskit
          </Link>
        </div>
        <div className="md:mt-2 mt-4 flex items-center gap-4">
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
