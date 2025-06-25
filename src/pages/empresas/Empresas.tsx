import React from 'react';

const empresas = [
  {
    id: 1,
    nome: 'Mercado Extra',
    imagem: './assets/img/mercado-extra.jpg',
    avaliacao: 4.7,
  },
  {
    id: 2,
    nome: 'Mercado Central',
    imagem: './assets/img/mercado-central-saomateus.jpg',
    avaliacao: 4.5,
  },
  {
    id: 3,
    nome: 'Primos Supermercados',
    imagem: './assets/img/primos-mercado.jpg',
    avaliacao: 4.8,
  },
  {
    id: 4,
    nome: 'Joanin Supermercados',
    imagem: './assets/img/joanin-mercado.jpg',
    avaliacao: 4.3,
  },
  {
    id: 5,
    nome: 'Mercado Santa Fé',
    imagem: './assets/img/mercado-santa-fe.jpg',
    avaliacao: 4.6,
  },
  {
    id: 6,
    nome: 'Mercado Baronesa',
    imagem: './assets/img/mercado-baronesa.jpg',
    avaliacao: 4.4,
  },
];

const Empresas: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-800">
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {empresas.map((empresa) => (
          <div
            key={empresa.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={empresa.imagem}
              alt={empresa.nome}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{empresa.nome}</h2>
              <p className="text-green-500 mt-2">{empresa.avaliacao.toFixed(1)} / 5.0</p>
              <p className="text-sm text-gray-600 mt-1">Entregas rápidas e produtos frescos!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Empresas;
