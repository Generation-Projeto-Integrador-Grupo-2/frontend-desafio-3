import type { Empresa } from "./Empresa";

export default interface Produto {
  id?: number;
  nome: string;
  preco: number;
  descricao: string;
  foto: string;
  categoria?: any;
  empresa?: Empresa;
}
