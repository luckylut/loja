const {readFile} = require('node:fs/promises');
const path = require('node:path');
const CAMINHO_JSON = path.join(__dirname, '..', 'data', 'livros.json');

async function lerLivros() {
  try {
    const conteudo = await readFile(CAMINHO_JSON, 'utf-8');
    if (!conteudo.trim()) return [];
    const json = JSON.parse(conteudo);
    if (Array.isArray(json)) return json;
    if (json && Array.isArray(json.livros)) return json.livros;
    return []
  } catch (error) {
    if (err.code === 'ENOENT') return [];
    if (err.name === 'SyntaxError') {
      throw new Error (`JSON inválido em ${CAMINHO_JSON}`);
    }
    throw err;
  }
}

module.exports = {lerLivros};