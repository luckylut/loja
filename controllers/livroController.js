let id = 0;
const livros = [];

export const exibirLivros = (_, res) => {
  res.send(livros);
}

export const buscarLivroPorId = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "ID inválido." });
  }

  const livro = livros.find(livro => livro.id === id);
  if (!livro) {
    return res.status(404).send({ msg: "Livro não encontrado." });
  }

  res.send({ livro });
}

export const criarLivro = (req, res) => {
  const { nome, preco, quantidade } = req.body;

  if (!nome || preco == null || quantidade == null) {
    return res.status(400).send({ msg: "Os campos nome, preco e quantidade são obrigatórios." });
  }
  if (typeof nome !== "string" || nome.trim() === "") {
    return res.status(400).send({ msg: "Nome inválido." });
  }
  if (isNaN(preco) || preco < 0) {
    return res.status(400).send({ msg: "Preço inválido." });
  }
  if (!Number.isInteger(quantidade) || quantidade < 0) {
    return res.status(400).send({ msg: "Quantidade inválida." });
  }

  id++;
  const novoLivro = { id, nome: nome.trim(), preco: Number(preco), quantidade: Number(quantidade) };
  livros.push(novoLivro);

  res.status(201).send({ msg: 'Livro criado com sucesso!' });
}

export const atualizarLivro = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "ID inválido." });
  }

  const { nome, preco, quantidade } = req.body;

  const livroIndex = livros.findIndex(l => l.id === id);
  if (livroIndex === -1) {
    return res.status(404).send({ msg: "Livro não encontrado." });
  }

  // Validações opcionais para campos enviados
  if (nome !== undefined) {
    if (typeof nome !== "string" || nome.trim() === "") {
      return res.status(400).send({ msg: "Nome inválido." });
    }
    livros[livroIndex].nome = nome.trim();
  }
  if (preco !== undefined) {
    if (isNaN(preco) || preco < 0) {
      return res.status(400).send({ msg: "Preço inválido." });
    }
    livros[livroIndex].preco = Number(preco);
  }
  if (quantidade !== undefined) {
    if (!Number.isInteger(quantidade) || quantidade < 0) {
      return res.status(400).send({ msg: "Quantidade inválida." });
    }
    livros[livroIndex].quantidade = Number(quantidade);
  }

  res.send({ msg: `Livro com ID: ${id} atualizado com sucesso.` });
}

export const deletarLivro = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "ID inválido." });
  }

  const livroIndex = livros.findIndex(l => l.id === id);
  if (livroIndex === -1) {
    return res.status(404).send({ msg: "Livro não encontrado." });
  }

  livros.splice(livroIndex, 1);

  res.status(200).send({ msg: `Livro com ID: ${id} deletado com sucesso.` });
}
