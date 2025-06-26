import type Produto from "./Produto";

export interface Empresa {
  id?: number;
  nome: string;
  email: string;
  senha?: string; 
  cnpj: string;
  telefone: string;
  endereco: string;
  produtos?: Produto[];
}
