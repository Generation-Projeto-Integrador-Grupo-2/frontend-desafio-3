import axios from "axios";

export const api = axios.create({
    baseURL: "https://backend-desafio-3.onrender.com/", headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    //setDados(resposta.data);

    const usuario = resposta.data;
    
    // Remove o campo senha (que está com token)
    delete usuario.senha;
    
    // Agora atualiza o estado com o objeto limpo
    setDados(usuario);

    
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}
