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
  const pastelColors = ["#C9E4C5", "#FCE5C1", "#FFB2AB", "#D6E9C6"];

  return (
    <section
      className="py-12 min-h-[calc(100vh-120px)]"
      style={{ backgroundColor: "#f5f5dc" }}
    >
      <h2
        className="text-2xl font-bold text-gray-800 mb-8 text-center"
        style={{ fontFamily: "Courgette, cursive" }}
      >
        Restaurantes Parceiros
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {restaurantes.map((restaurante, index) => {
          const corCard = pastelColors[index % pastelColors.length];
          return (
            <div
              key={restaurante.id}
              className="rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col items-stretch"
              style={{ backgroundColor: corCard }}
            >
              <div className="overflow-hidden w-full h-48">
                <img
                  src={restaurante.imagem}
                  alt={restaurante.nome}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4 text-center flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-[#2F3E46]">
                  {restaurante.nome}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
