import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../../components/carrinho/CarrinhoContext";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCarrinho();

 const promocoes = [
  {
    id: 1,
    nome: "Espaguete de abobrinha",
    precoOriginal: 49.9,
    precoPromocional: 29.9,
    imagem: "https://ik.imagekit.io/6tjnbersb/Espaguete-de-Abobrinha-com-Molho-de-Tomate-e-Manjericao-1-1200x675.jpg?updatedAt=1750878978575",
  },
  {
    id: 2,
    nome: "Lasanha ao molho branco",
    precoOriginal: 35.9,
    precoPromocional: 27.9,
    imagem: "https://ik.imagekit.io/6tjnbersb/lasanhacommolhobranco.jpg?updatedAt=1750878978308",
  },
  {
    id: 3,
    nome: "X-Tudo de pernil",
    precoOriginal: 64.9,
    precoPromocional: 34.9,
    imagem: "https://ik.imagekit.io/6tjnbersb/x-tudo-de-pernil.jpg?updatedAt=1750878978740",
  },
  {
    id: 4,
    nome: "Salada Caesar",
    precoOriginal: 32.9,
    precoPromocional: 8.90,
    imagem: "https://ik.imagekit.io/6tjnbersb/salada-caesar-para-4-pessoas.jpg?updatedAt=1750887964352",
  },
];

  const categorias = [
    {
      id: 1,
      nome: "Doces",
      cor: "#FDAE61",
      imagem: "https://ik.imagekit.io/6tjnbersb/triple-chocolate-cake-4.png?updatedAt=1750837469815"
    },
    {
      id: 2,
      nome: "Lanches",
      cor: "#FF6961",
      imagem: "https://ik.imagekit.io/6tjnbersb/capa-materia-gshow-2022-01-20t11(1).png?updatedAt=1750834554826"
    },
    {
      id: 3,
      nome: "Produtos saudáveis",
      cor: "#A3C293",
      imagem: "https://ik.imagekit.io/6tjnbersb/fruits.png?updatedAt=1750838224726"
    },
    {
      id: 5,
      nome: "Veganos",
      cor: "#A4CC68",
      imagem: "https://ik.imagekit.io/6tjnbersb/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0.png?updatedAt=1750838445533"
    },
    {
      id: 6,
      nome: "Fitness",
      cor: "#72DD96",
      imagem: "https://ik.imagekit.io/6tjnbersb/proteinbar.png?updatedAt=1750838702822"
    },
    {
      id: 4,
      nome: "Bebidas",
      cor: "#A8DADC",
      imagem: "https://ik.imagekit.io/6tjnbersb/glass-with-orange-juice-png-0.png?updatedAt=1750839057184"
    }
  ];

  const handlePeçaAgora = () => {
    navigate("/produtos");
  };

  const handleAdicionarIndividual = (produto: typeof promocoes[0]) => {
    adicionarAoCarrinho({
      id: produto.id,
      nome: produto.nome,
      preco: produto.precoPromocional,
      imagem: produto.imagem,
      quantidade: 1,
    });

    toast.success(`${produto.nome} adicionado ao carrinho!`);
  };

  const handleCategoriaClick = (id: number) => {
    navigate(`/produtos/categoria/${id}`);
  };

  return (
    <div className="w-full">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/6tjnbersb/iStock-10240457.jpg?updatedAt=1750818785429')",
        }}
      >
        <div className="bg-[#7aa82970] w-full h-full">
          <div className="max-w-7xl mx-auto flex flex-col items-start justify-center px-6 py-24 text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
              <span
                className="text-7xl font-bold block"
                style={{
                  fontFamily: 'Courgette, cursive',
                  color: '#F5F5DC',
                  textDecoration: 'underline',
                }}
              >
                rebU Eats
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-white drop-shadow-md mb-8">
              Sua refeição favorita você encontra aqui!
            </p>
            <button
              onClick={handlePeçaAgora}
              className="bg-[#ff6961] hover:bg-green-600 text-[#f5f5dc] px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition duration-300 cursor-pointer"
            >
              Peça agora
            </button>
          </div>
        </div>
      </div>

      <div className="py-12 px-4 md:px-16 bg-[#f5f5dc]">
        <h2
          className="text-3xl font-bold text-left mb-10 text-[#2F3E46]"
          style={{ fontFamily: 'Courgette, cursive' }}
        >
          Categorias
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              onClick={() => handleCategoriaClick(categoria.id)}
              className="flex flex-col items-center cursor-pointer transition hover:scale-105"
              style={{ maxWidth: "200px" }}
            >

              <div
                className="w-full flex items-center justify-center rounded-2xl shadow-md h-28 overflow-hidden"
                style={{ backgroundColor: categoria.cor }}
              >
                <img
                  src={categoria.imagem}
                  alt={categoria.nome}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="mt-2 text-center">
                <span className="text-md font-semibold text-[#2F3E46] block">
                  {categoria.nome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-12 px-4 md:px-16 bg-[#f5f5dc]">
        <h2
          className="text-3xl font-bold text-left mb-10 text-[#2F3E46]"
          style={{ fontFamily: 'Courgette, cursive' }}
        >
          Promoções do Dia
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {promocoes.map((produto, index) => {

        const pastelColors = ["#C9E4C5", "#FCE5C1", "#FFB2AB", "#D6E9C6"];
        const corCard = pastelColors[index % pastelColors.length];

        return (
          <div
            key={produto.id}
            className="flex flex-col items-stretch cursor-pointer transition hover:scale-105 h-full"
            style={{ maxWidth: "220px", margin: "0 auto" }}
            onClick={() => handleAdicionarIndividual(produto)}
          >
            <div
          className="w-full h-32 rounded-2xl shadow-md overflow-hidden bg-white flex-shrink-0"
            >
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="w-full h-full object-cover rounded-2xl"
          />
            </div>

            <div
          className="flex flex-col justify-between mt-3 text-center rounded-b-2xl p-4 w-full flex-1"
          style={{ backgroundColor: corCard, minHeight: "180px", display: "flex" }}
            >
          <div>
            <h3 className="text-md font-semibold text-[#2F3E46] mb-1">
              {produto.nome}
            </h3>
            <p className="text-sm text-gray-500 line-through mb-1">
              R$ {produto.precoOriginal.toFixed(2)}
            </p>
            <p className="font-bold text-lg mb-2 text-[#2F3E46]">
              R$ {produto.precoPromocional.toFixed(2)}
            </p>
          </div>

          <button
            className="bg-green-600 hover:bg-[#ff6961] text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300 w-full cursor-pointer mt-4"
            style={{ marginTop: "auto" }}
            onClick={(e) => {
              e.stopPropagation();
              handleAdicionarIndividual(produto);
            }}
          >
            Adicionar ao carrinho
          </button>
            </div>
          </div>
        );
          })}
        </div>
      </div>


      <div className="px-4 md:px-16 py-16" style={{ backgroundColor: '#f5f5dc' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">

          <div className="w-full md:w-1/2">
            <img
              src="https://ik.imagekit.io/6tjnbersb/woman_receiving_grocery_order.jpg?updatedAt=1750830333205"
              alt="Sobre a rebU Eats"
              className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 text-left text-[#2F3E46]">
            <h2
              className="text-4xl font-bold mb-6"
              style={{ fontFamily: 'Courgette, cursive' }}
            >
              Muito mais que delivery.
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              A rebU Eats é uma rede colaborativa sem comissões, feita para valorizar quem produz e entrega com afeto. Conheça nossa proposta ética, livre e comunitária — e faça parte dessa revolução na forma de se alimentar.
            </p>
            <button
              onClick={() => navigate("/sobre")}
              className="bg-[#ff6961] hover:bg-green-600 text-[#f5f5dc] px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300 cursor-pointer"
            >
              Saiba mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
