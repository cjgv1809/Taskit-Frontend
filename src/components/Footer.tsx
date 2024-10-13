import { BiLogoFacebook, BiLogoTwitter, BiLogoLinkedin } from "react-icons/bi";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="px-4 py-4 text-center bg-white max-w-[1400px] mx-auto w-full dark:bg-primary">
      <div className="flex flex-col items-center justify-between px-9 md:flex-row">
        <div className="flex flex-col items-center mt-2 space-y-2 md:items-center md:flex-row md:space-x-4 md:space-y-0 ">
          <Link
            to="#"
            className="font-normal text-typography hover:underline dark:text-dark-primary-foreground"
          >
            Términos y Condiciones
          </Link>
          <Link
            to="#"
            className="font-normal text-typography hover:underline dark:text-dark-primary-foreground"
          >
            Politica de Privacidad
          </Link>
          <Link
            to="#"
            className="font-normal text-typography hover:underline dark:text-dark-primary-foreground"
          >
            FAQ (Preguntas Frecuentes)
          </Link>
          <Link
            to="#"
            className="font-normal text-typography hover:underline dark:text-dark-primary-foreground"
          >
            @{new Date().getFullYear()} Taskit
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-2">
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
