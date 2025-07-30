import { promises as fs } from 'fs';
const caminhoArquivo = '../data/livros.json'; // caminho do arquivo com os dados

async function lerArquivo() {
  try {
    const dados = await fs.readFile(caminhoArquivo, 'utf-8');
    return JSON.parse(dados);
  } catch (err) {
    // Se o arquivo não existir, retorna lista vazia
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function salvarArquivo(dados) {
  await fs.writeFile(caminhoArquivo, JSON.stringify(dados, null, 2));
}

// 📚 1. Listar todos os livros
export async function listarLivros() {
  return await lerArquivo();
}

// 🔍 2. Buscar livro por ID
export async function buscarLivroPorId(id) {
  const livros = await lerArquivo();
  return livros.find(livro => livro.id === id);
}

// ➕ 3. Criar novo livro
export async function criarLivro(novoLivro) {
  const livros = await lerArquivo();
  novoLivro.id = Date.now().toString(); // Gera ID único
  livros.push(novoLivro);
  await salvarArquivo(livros);
  return novoLivro;
}

// 📝 4. Atualizar livro existente
export async function atualizarLivro(id, dadosAtualizados) {
  const livros = await lerArquivo();
  const index = livros.findIndex(livro => livro.id === id);
  if (index === -1) return null;

  livros[index] = { ...livros[index], ...dadosAtualizados };
  await salvarArquivo(livros);
  return livros[index];
}

// 🗑 5. Remover livro
export async function removerLivro(id) {
  const livros = await lerArquivo();
  const novosLivros = livros.filter(livro => livro.id !== id);
  if (novosLivros.length === livros.length) return false;

  await salvarArquivo(novosLivros);
  return true;
}