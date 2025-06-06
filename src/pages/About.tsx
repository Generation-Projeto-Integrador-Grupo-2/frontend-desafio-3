import React from "react";
import FeatureCard from "../components/FeatureCard";
import { CheckCircle, Users, Shield, Cpu } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="text-red-600 w-8 h-8" />,
    title: "Ética",
    description: "Zero comissões, 100% do valor para os produtores."
  },
  {
    icon: <Users className="text-red-600 w-8 h-8" />,
    title: "Comunidade",
    description: "Rede solidária e colaborativa, baseada em trocas e apoio mútuo."
  },
  {
    icon: <Shield className="text-red-600 w-8 h-8" />,
    title: "Transparência",
    description: "Finanças abertas e modelo baseado em confiança e verdade."
  },
  {
    icon: <Cpu className="text-red-600 w-8 h-8" />,
    title: "Tecnologia",
    description: "Ferramentas livres, acessíveis e de código aberto."
  }
];

const About = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-2">
        Sobre a <span className="text-red-600">reBU</span> <span className="text-green-600">eats</span>
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Mais do que uma plataforma de delivery — uma proposta ética, social e colaborativa
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <p>
          A <strong>reBU Eats</strong> é mais do que uma plataforma de delivery de comida — é uma proposta ética,
          social e colaborativa de repensarmos como nos alimentamos e como nos conectamos.
        </p>
        <p>
          Nosso objetivo é <strong>livre, aberto e comunitário</strong>. Nós colaboramos com diferentes microatores,
          construindo relações solidárias, transparentes e justas. Usamos tecnologia livre e aberta e acreditamos que
          uma alimentação saudável e acessível não deve estar à margem das grandes plataformas.
        </p>
        <p>
          <strong>\"A comida é cultura, é memória, é cuidado. Ela une famílias, amigos e histórias.\"</strong>
        </p>
        <p>
          Através da tecnologia e da colaboração, buscamos facilitar o acesso à comida de qualidade com preço justo,
          fomentando vínculos comunitários.
        </p>
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 text-yellow-900 rounded">
          <h4 className="font-bold mb-1">Transparência Financeira</h4>
          <p>
            O dinheiro arrecadado é distribuído de forma transparente, mantendo os valores justos entre todas as
            partes envolvidas. Nada é escondido.
          </p>
        </div>
        <p className="text-center font-bold text-xl">
          Comida não é só um produto — <br /> <span className="text-red-600">é um direito, a cultura, a partilha.</span>
        </p>
        <div className="text-center">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
            Apoie o Projeto
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;