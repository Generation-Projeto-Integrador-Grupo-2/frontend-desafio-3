import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

export default function Footer() {
  let data = new Date().getFullYear()

  return (
    <div className="flex justify-center bg-[#2F3E46] text-[#f5f5dc]">
      <div className="container flex flex-col py-4 px-4">
        <div className="flex flex-col items-start gap-4">
          {/* Logo */}
          <span
            className="text-3xl font-bold"
            style={{
              fontFamily: 'Courgette, cursive',
              color: '#F5F5DC',
              textDecoration: 'underline',
            }}
          >
            <Link to="/home" className="hover:text-green-300 transition-colors">
              rebU Eats
            </Link>
          </span>

          {/* Redes Sociais */}
          <div className="flex flex-col">
            <div className="flex gap-3 mt-1">
              <a
                href="https://github.com/Generation-Projeto-Integrador-Grupo-2/desafio1_front_end"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#f5f5dc] flex items-center justify-center transition duration-300 hover:bg-[#e0e0cc] hover:shadow-lg hover:scale-110"
              >
                <GithubLogoIcon size={27} weight="fill" color="#2F3E46" />
              </a>
              <a
                href="https://github.com/Generation-Projeto-Integrador-Grupo-2/desafio1_front_end"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#f5f5dc] flex items-center justify-center transition duration-300 hover:bg-[#e0e0cc] hover:shadow-lg hover:scale-110"
              >
                <InstagramLogoIcon size={27} weight="fill" color="#2F3E46" />
              </a>
              <a
                href="https://github.com/Generation-Projeto-Integrador-Grupo-2/desafio1_front_end"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#f5f5dc] flex items-center justify-center transition duration-300 hover:bg-[#e0e0cc] hover:shadow-lg hover:scale-110"
              >
                <LinkedinLogoIcon size={27} weight="fill" color="#2F3E46" />
              </a>
            </div>
          </div>

          {/* Informações de contato */}
          <div className="mt-2">
            <p className="mb-1">📍 Av. Paulista, 100 - Bela Vista, São Paulo - SP 01310-000</p>
            <p className="mb-1">📞 (11) 0000-0000</p>
            <p className="mb-4">✉️ contato@rebueats.com</p>
          </div>
        </div>

        {/* Linha e copyright */}
        <div className="w-full h-0.5 bg-[#f5f5dc] mt-3 rounded-full" />
        <div className="w-full flex justify-center mt-4 text-[#f5f5dc]">
          <p className="text-center text-sm font-normal">
            rebUEats © {data}. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  )
}
