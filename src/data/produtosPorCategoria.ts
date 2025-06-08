interface Produto {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
}

const produtosPorCategoria: Record<string, Produto[]> = {
  "Saudável": [

  ],
  "Brasileira": [

  ],
  "Árabe": [

  ],
  "Lanches": [

  ],
  "Japonesa": [

  ],
  "Doces e Bolos": [

  ],
  "Italiana": [

  ],
  "Pizza": [

  ],
  "Carnes": [

  ],
  "Salgados": [

  ],
};

export default produtosPorCategoria;
