import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8080',  headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);

    const usuario = resposta.data;
    
    delete usuario.senha;
    
    setDados(usuario);

    
}

export const cadastrarEmpresa = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);

    const empresa = resposta.data;

    delete empresa.senha;

    setDados(empresa);
};


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
