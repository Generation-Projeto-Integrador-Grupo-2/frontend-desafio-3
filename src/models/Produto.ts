export default interface Produto {
  categoria?: any;
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  preco: number;
  empresa?: string;
}
