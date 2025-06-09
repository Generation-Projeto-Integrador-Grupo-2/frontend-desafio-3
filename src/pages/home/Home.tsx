import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const irParaCategorias = () => {
    navigate("/produtos");
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src="./assets/img/foto-home.jpg"
        alt="Comida deliciosa"
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-4">
          rebU Eats
        </h1>
        <p className="text-2xl md:text-3xl text-gray-200 drop-shadow-md mb-8">
          Sua refeição favorita você encontra aqui.
        </p>
        <button
          onClick={irParaCategorias}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition duration-300"
        >
          Peça agora
        </button>
      </div>
    </div>
  );
}

export default Home;
