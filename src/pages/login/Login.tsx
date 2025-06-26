import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const {
        tipo,
        handleLoginUsuario,
        handleLoginEmpresa,
        isLoading,
        usuario,
        empresa,
    } = useContext(AuthContext);

    // Estado para controlar tipo de login selecionado
    const [loginTipo, setLoginTipo] = useState<"usuario" | "empresa">("usuario");

    // Dados genéricos para login, com campos id, nome, email, senha e token
    const [loginData, setLoginData] = useState({
        id: 0,
        nome: "",
        email: "",
        senha: "",
        token: "",
    });

    useEffect(() => {
        if (
            (usuario?.token && tipo === "usuario") ||
            (empresa?.token && tipo === "empresa")
        ) {
            navigate("/home");
        }
    }, [usuario, empresa, tipo, navigate]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    }

    async function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (loginTipo === "empresa") {
            await handleLoginEmpresa(loginData);
        } else {
            await handleLoginUsuario(loginData);
        }
    }

    return (
        <>
            <div
                className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold"
                style={{ backgroundImage: "url('/assets/img/salada.jpg')" }}
            >
                <div className="flex justify-start items-center pl-10"></div>

                <div className="max-w-md bg-gray-300 p-8 rounded-3xl shadow-xl flex flex-col items-center gap-6">
                    {/* Toggle entre Usuário e Empresa */}
                    <div className="flex gap-4 mb-4">
                        <button
                            type="button"
                            onClick={() => setLoginTipo("usuario")}
                            className={`px-4 py-2 rounded-tl-xl rounded-bl-xl font-semibold ${loginTipo === "usuario"
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            Usuário
                        </button>
                        <button
                            type="button"
                            onClick={() => setLoginTipo("empresa")}
                            className={`px-4 py-2 rounded-tr-xl rounded-br-xl font-semibold ${loginTipo === "empresa"
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            Empresa
                        </button>
                    </div>

                    <form
                        className="w-full flex flex-col gap-4"
                        onSubmit={login}
                        autoComplete="off"
                    >
                        <h2 className="font-bold text-2xl m-2 flex flex-col items-center">
                            Login {loginTipo === "usuario" ? "Usuário" : "Empresa"}
                        </h2>

                        <div className="flex flex-col w-full relative">
                            <label htmlFor="email">Email</label>
                            <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder={`Email da ${loginTipo}`}
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
                                value={loginData.email}
                                onChange={atualizarEstado}
                                required
                            />
                        </div>

                        <div className="flex flex-col w-full relative">
                            <label htmlFor="senha">Senha</label>
                            <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2" />
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Senha"
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
                                value={loginData.senha}
                                onChange={atualizarEstado}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-green-400 hover:bg-green-500 font-medium text-sm py-2 rounded-lg p-4 text-black mt-5 flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="24"
                                    visible={true}
                                />
                            ) : (
                                <span>Entrar</span>
                            )}
                        </button>

                        <p className="text-center">
                            Ainda não tem uma conta?{" "}
                            <Link to="/cadastro" className="text-blue-500 hover:underline">
                                Cadastre-se como Usuário
                            </Link>
                        </p>
                        <p className="text-center mt-2">
                            É uma empresa?{" "}
                            <Link to="/empresas" className="text-green-600 hover:underline">
                                Cadastre sua Empresa aqui
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
