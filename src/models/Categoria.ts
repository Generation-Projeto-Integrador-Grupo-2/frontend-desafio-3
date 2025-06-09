import type Produto from "./Produto";

export default interface Categoria {
    id: number;
    nome: string;
    descricao: string;
    saudavel: boolean;
    imagemUrl: string;
    produto?: Produto;
}