import  { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Usuario } from '../../models/Usuario';
import { cadastrarUsuario } from '../../service/Service';
import { RotatingLines } from 'react-loader-spinner';
import { UserIcon ,
     EnvelopeIcon,
  LockClosedIcon,
  MapPinIcon,
  HashtagIcon} from '@heroicons/react/24/outline'


    function Cadastro() {

        const navigate = useNavigate();

        const [isLoading, setIsLoading] = useState<boolean>(false);

        const[confirmaSenha, setConfirmaSenha] = useState<string>("");

        const[usuario, setUsuario] = useState<Usuario>({name:'',email:'',senha:'',endereco:'',numero:''})

        function retornar(){
            navigate('/cadastro')
        }

        useEffect(() => {
            if (usuario.id !== undefined){
                retornar()
            }
        }, [usuario])

        function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
            setUsuario({
                ...usuario,
                [e.target.name]: e.target.value
            })
        }

        function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
            setConfirmaSenha(e.target.value)
        }

        async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
            e.preventDefault();

            if(confirmaSenha === usuario.senha && usuario.senha.length >= 8) {

                setIsLoading(true)

                try{
                    await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
                    alert('Usuario cadastrado com sucesso!')
                }catch (error){
                    alert('Erro ao cadastrar o usuario!')
                }
            }else{
                alert('Dados do usuario incorretos! Verifique as informaçoes do cadastro')
                setUsuario({...usuario, senha: ''})
                setConfirmaSenha('')
            }

            setIsLoading(false)
        }

    return (
        <>
    <div className=' flex flex-col items-center justify-center min-h-screen bg-gray-50'>
        <div className='p-2 w-full max-w-md font-semibold '>
            <form className=' justify-center  max-w-md p-4  bg-gray-200 rounded-2xl shadow-md flex-col gap-1' onSubmit={cadastrarNovoUsuario}>
                <h2 className='font-bold text-black text-2xl m-2 flex flex-col items-center'>Cadastrar</h2>
                <div className="flex flex-col w-full relative">
                    <label htmlFor="name">Nome</label>
                    <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                    <input            
                    type="text"
                    id="name"
                    name="name"
                    placeholder=""
                    className=" pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                    value = {usuario.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}          
                    />
                </div>
                <div className="flex flex-col w-full relative">
                    <label htmlFor="email">Email</label>
                    <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=""
                    className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                    value = {usuario.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className='flex flex-col w-full relative'>
                    <label htmlFor="senha">Senha</label>
                    <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                    <input
                    type="senha"
                    id="senha"
                    name="senha"
                    placeholder=""
                    className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                    value = {usuario.senha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className='flex flex-col w-full relative'>
                    <label htmlFor="confirmaSenha">Confirma Senha</label>
                    <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                    <input
                    type="senha"
                    id="confirmaSenha"
                    name="confrimaSenha"
                    placeholder=""
                    className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                    value = {confirmaSenha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                    />
                </div>
                <div className='flex flex-col w-full relative'>
                    <label htmlFor="endereco">Endereço</label>
                    <MapPinIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                    <input
                    type="endereco"
                    id="endereco"
                    name="endereco"
                    placeholder=""
                    className=" pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                    value = {usuario.endereco}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className='flex flex-col w-full relative'>
                    <label htmlFor="numero">Numero</label>
                    <HashtagIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />                  
                    <input
                    type="numero"
                    id="numero"
                    name="numero"
                    placeholder=""
                    className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 "
                    value={usuario.numero}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex justify-around w-full gap-8 m-4">
                    <button 
                        type='reset'
                        className='bg-red-400 hover:bg-red-500 font-medium text-sm py-2 rounded-lg p-4  text-black'
                        onClick={retornar} 
                        >

                        Cancelar
                    </button>
                    <button 
                        type='submit'
                        className='bg-green-400 hover:bg-green-500 font-medium text-sm py-2 rounded-lg p-4 text-black ' 
                        >
                            {
                                isLoading ? <RotatingLines
                                strokeColor='white'
                                strokeWidth='5'
                                animationDuration='0.75'
                                width='24'
                                visible={true}  
                                /> :
                                <span>Cadastrar</span>
                            }
                    </button>
            </div>
                
            </form>
            <div className='mt-5 font-bold text-center'>
                <a href="/login" className='text-blue-500 hover:underline'>Já tem uma conta? Faça login</a>
                </div>
        </div>
    </div>
        </>       
    )
    }

    export default Cadastro