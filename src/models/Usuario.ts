import type Produto from "./Produto";

export interface Usuario {
id?: number;
name: string;
email: string;
senha: string;
endereco: string;
numero: string;
produto?: Produto;
}
