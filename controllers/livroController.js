const id = 0;
const livros =[
  { "id": 1, "nome": "Livro A", "preco": 25, "quantidade": 3 },
  { "id": 2, "nome": "Livro B", "preco": 40, "quantidade": 5 }
];

export const exibirLivros = (req, res)=>{
    res.send(livros)
}

export const buscarLivroPorId = (req, res)=>{
    const id = Number(req.params.id);
    const livro = livros.find(livro => livro.id === id);

    res.send({ livro })
}

export const criarLivro = (req, res)=>{
    
}