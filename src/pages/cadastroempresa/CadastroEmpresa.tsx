import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Empresa } from '../../models/Empresa';
import { cadastrarEmpresa } from '../../service/Service';
import { RotatingLines } from 'react-loader-spinner';
import {
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    HashtagIcon,
    MapPinIcon,
    PhoneIcon,
} from '@heroicons/react/24/outline';
import './CadastroEmpresa.css';

function CadastroEmpresa() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmaSenha, setConfirmaSenha] = useState<string>('');
    const [empresa, setEmpresa] = useState<Empresa>({
        nome: '',
        email: '',
        senha: '',
        cnpj: '',
        telefone: '',
        endereco: ''
    });

    function retornar() {
        navigate('/login');
    }

    useEffect(() => {
        if (empresa.id !== undefined) {
            retornar();
        }
    }, [empresa]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setEmpresa({
            ...empresa,
            [e.target.name]: e.target.value
        });
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmaSenha(e.target.value);
    }

    async function cadastrarNovaEmpresa(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (confirmaSenha === empresa.senha && (empresa.senha?.length ?? 0) >= 8) {
            setIsLoading(true);
            try {
                await cadastrarEmpresa('/empresas', empresa, setEmpresa); // URL corrigida
                alert('Empresa cadastrada com sucesso!');
            } catch {
                alert('Erro ao cadastrar a empresa!');
            }
            setIsLoading(false);
        } else {
            alert('Dados da empresa incorretos! Verifique as informações do cadastro.');
            setEmpresa({ ...empresa, senha: '' });
            setConfirmaSenha('');
        }
    }


    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-gray-100'>
                <div className="fundoCadastro hidden lg:block"></div>
                <div className='p-2 w-full max-w-md font-semibold'>
                    <form onSubmit={cadastrarNovaEmpresa} className='justify-center max-w-md p-4 bg-gray-300 rounded-2xl shadow-md flex-col gap-1'>
                        <h2 className='font-bold text-black text-2xl m-2 flex flex-col items-center'>Cadastrar Empresa</h2>

                        <div className="flex flex-col w-full relative">
                            <label htmlFor="nome">Nome da Empresa</label>
                            <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                                value={empresa.nome}
                                onChange={atualizarEstado}
                            />
                        </div>

                        <div className="flex flex-col w-full relative">
                            <label htmlFor="email">Email</label>
                            <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                                value={empresa.email}
                                onChange={atualizarEstado}
                            />
                        </div>

                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="senha">Senha</label>
                            <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                                value={empresa.senha}
                                onChange={atualizarEstado}
                            />
                        </div>

                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="confirmaSenha">Confirma Senha</label>
                            <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="password"
                                id="confirmaSenha"
                                name="confirmaSenha"
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                                value={confirmaSenha}
                                onChange={handleConfirmarSenha}
                            />
                        </div>

                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="cnpj">CNPJ</label>
                            <HashtagIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                id="cnpj"
                                name="cnpj"
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                                value={empresa.cnpj}
                                onChange={atualizarEstado}
                            />
                        </div>

                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="telefone">Telefone</label>
                            <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                                value={empresa.telefone}
                                onChange={atualizarEstado}
                            />
                        </div>

                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="endereco">Endereço</label>
                            <MapPinIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                id="endereco"
                                name="endereco"
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                                value={empresa.endereco}
                                onChange={atualizarEstado}
                            />
                        </div>

                        <div className="flex justify-around w-full gap-8 m-4">
                            <button
                                type='submit'
                                className='bg-green-400 hover:bg-green-500 font-medium text-sm py-2 rounded-lg p-4 text-black '
                            >
                                {isLoading ? (
                                    <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0.75' width='24' visible={true} />
                                ) : (
                                    <span>Cadastrar</span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className='mt-5 font-bold text-center'>
                        <a href="/login" className='text-blue-500 hover:underline'>Já tem uma conta? Faça login</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CadastroEmpresa;
