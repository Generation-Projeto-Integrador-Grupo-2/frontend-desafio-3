import  { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Usuario } from '../../models/Usuario';
import { cadastrarUsuario } from '../../service/Service';
import { RotatingLines } from 'react-loader-spinner';

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
    <div>
        <div>
            <form onSubmit={cadastrarNovoUsuario}>
                <h2>Cadastrar</h2>
                <div className="flex flex-col w-full">
                    <label htmlFor="name">Nome</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nome"
                    className="border-2 border-slate-700 rounded p-2"
                    value = {usuario.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}          
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="border-2 border-slate-700 rounded p-2"
                    value = {usuario.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div>
                    <label htmlFor="senha">Senha</label>
                    <input
                    type="senha"
                    id="senha"
                    name="senha"
                    placeholder="Senha"
                    className="border-2 border-slate-700 rounded p-2"
                    value = {usuario.senha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmaSenha">Confirma Senha</label>
                    <input
                    type="senha"
                    id="confirmaSenha"
                    name="confrimaSenha"
                    placeholder="Confirma Senha"
                    className="border-2 border-slate-700 rounded p-2"
                    value = {confirmaSenha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                    />
                </div>
                <div >
                    <label htmlFor="endereco">Endereço</label>
                    <input
                    type="endereco"
                    id="endereco"
                    name="endereco"
                    placeholder="Endereco"
                    className="border-2 border-slate-700 rounded p-2"
                    value = {usuario.endereco}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div>
                    <label htmlFor="numero">Numero</label>
                    <input
                    type="numero"
                    id="numero"
                    name="numero"
                    placeholder="numero"
                    className="border-2 border-slate-700 rounded p-2"
                    value={usuario.numero}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex justify-around w-full gap-8">
                    <button 
                        type='reset'
                        className='rounded text-black'
                        onClick={retornar} 
                        >

                        Cancelar
                    </button>
                    <button 
                        type='submit'
                        className='rounded text-black' 
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
        </div>
    </div>
        </>       
    )
    }

    export default Cadastro