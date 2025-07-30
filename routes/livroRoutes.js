import express from "express";
import { atualizarLivro, buscarLivroPorId, criarLivro, deletarLivro, exibirLivros } from "../controllers/livroController.js";
const livroRoutes = express.Router();

livroRoutes.get("/", exibirLivros);
livroRoutes.get("/:id", buscarLivroPorId);
livroRoutes.post("/", criarLivro);
livroRoutes.put('/:id', atualizarLivro);
livroRoutes.delete('/:id', deletarLivro);
export default livroRoutes;