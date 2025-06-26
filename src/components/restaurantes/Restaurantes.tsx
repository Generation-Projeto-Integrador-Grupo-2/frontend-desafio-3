interface Restaurante {
  id: number;
  nome: string;
  imagem: string;
}

const restaurantes: Restaurante[] = [
  { id: 1, nome: "Ital'in House", imagem: "./assets/img/italin-house.jpg" },
  { id: 2, nome: "Amazing Chicken", imagem: "./assets/img/amazing-chicken.jpg" },
  { id: 3, nome: "Restaurante e Pizzaria Sensação", imagem: "./assets/img/pizzaria-sensacao.jpg" },
  { id: 4, nome: "Restaurante e Creperia Vida's Crepe", imagem: "./assets/img/crespes-cia.jpg" },
  { id: 5, nome: "Kombinado Restaurante", imagem: "./assets/img/kombinado-burguer.jpg" },
  { id: 6, nome: "Casa do Norte Tradição", imagem: "./assets/img/casa-tradicao.jpg" },
  { id: 7, nome: "Empresa1", imagem: "https://ik.imagekit.io/6tjnbersb/Produtos/images.png?updatedAt=1750910388237" },
];

export default function Restaurantes() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {restaurantes.map((restaurante) => (
          <div
            key={restaurante.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="overflow-hidden">
              <img
                src={restaurante.imagem}
                alt={restaurante.nome}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {restaurante.nome}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
