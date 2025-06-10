import { GithubLogoIcon } from "@phosphor-icons/react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Courgette&display=swap"
        rel="stylesheet"
      />

      <footer>
        <div
          style={{ backgroundColor: '#FF6961', color: '#F5F5DC' }}
          className="px-4 py-6 text-center flex flex-col items-center gap-2"
        >
          <h2
            className="text-xl font-semibold underline"
            style={{ fontFamily: 'Courgette, cursive', color: '#F5F5DC' }}
          >
            rebU Eats
          </h2>

          <p className="text-sm">
            Sua refeição favorita, com um clique.
          </p>

          <a
            href="https://github.com/Generation-Projeto-Integrador-Grupo-2/frontend-desafio-3"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="mt-2 transition-colors"
            style={{ color: '#F5F5DC' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5DC')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F5DC')}
            onMouseDown={(e) => (e.currentTarget.style.color = '#32CD32')} 
            onMouseUp={(e) => (e.currentTarget.style.color = '#F5F5DC')}    
          >
            <GithubLogoIcon size={28} weight="fill" />
          </a>

          <p className="text-sm mt-4" style={{ color: '#F5F5DC' }}>
            &copy; {year} rebU Eats. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
