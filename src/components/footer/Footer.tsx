import { GithubLogoIcon } from "@phosphor-icons/react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-white">

      <div className="bg-rose-100 px-4 py-3 text-center text-red-700">
        <p className="text-sm">
          &copy; {year} rebU Eats. Todos os direitos reservados.
        </p>
      </div>

      <div className="bg-red-800 text-white px-4 py-6 text-center flex flex-col items-center gap-2">
        <h2 className="text-xl font-semibold">rebU Eats</h2>
        <p className="text-sm text-gray-200">
          Sua refeição favorita, com um clique.
        </p>

        <a
          href="https://github.com/Generation-Projeto-Integrador-Grupo-2/frontend-desafio-3"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="mt-2 hover:text-pink-300 transition-colors"
        >
          <GithubLogoIcon size={28} weight="fill" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
