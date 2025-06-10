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
      imagem: "./assets/img/espaguete-abobrinha.jpg",
    },
    {
      id: 2,
      nome: "Lasanha ao Molho Branco",
      precoOriginal: 35.9,
      precoPromocional: 27.9,
      imagem: "./assets/img/lasanha-molho-branco.jpg",
    },
    {
      id: 3,
      nome: "X-Tudo",
      precoOriginal: 64.9,
      precoPromocional: 34.9,
      imagem: "./assets/img/x-tudo.jpg",
    },
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

  return (
    <div className="w-full">
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src="./assets/img/foto-home.jpg"
          alt="Comida deliciosa"
          className="absolute inset-0 w-full h-full object-cover animate-slow-zoom scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/40 via-black/30 to-green-600/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4">
            <span
              className="text-8xl font-bold"
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
            className="bg-red-600 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition duration-300"
          >
            Peça agora
          </button>
        </div>
      </div>

      <div className="py-12 px-4 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-red-600">Promoções do Dia</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promocoes.map((produto) => (
            <div
              key={produto.id}
              className="border rounded-2xl shadow-md overflow-hidden transition hover:scale-105"
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{produto.nome}</h3>
                <p className="text-gray-500 line-through">
                  R$ {produto.precoOriginal.toFixed(2)}
                </p>
                <p className="text-green-600 text-xl font-bold mb-4">
                  R$ {produto.precoPromocional.toFixed(2)}
                </p>
                <button
                  onClick={() => handleAdicionarIndividual(produto)}
                  className="bg-green-600 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 w-full"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
