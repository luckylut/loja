import express from "express";
import { buscarLivroPorId, criarLivro, exibirLivros } from "../controllers/livroController.js";
const livroRoutes = express.Router();

livroRoutes.get("/", exibirLivros);
livroRoutes.get("/:id", buscarLivroPorId);

livroRoutes.post("/", criarLivro);

export default livroRoutes;