import {Router, Request, Response} from "express";
import { Filme } from "../models/filme";

const router = Router();

let filmes: Filme [] = [
    {id: 1, titulo: "Vingadores: Ultimato", diretor: "Irmãos Rusosos", ano: 2019, assistido: true},
    {id: 2, titulo: "Homem-Aranha: Um Novo Dias", diretor: "Destin Daniel Cretton", ano: 2026, assistido: false}
]

router.get("/", (req: Request, res: Response) => {
    res.json(filmes)
})

router.get("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const filme = filmes.find(t => t.id == id);

    if(!filme) {
        return res.status(404).json({erro: "Filme não encontrado"})
    }

    res.json(filme)
})

router.post("/", (req: Request, res: Response) => {
    const {titulo, diretor, ano} = req.body;

    const novoFilme: Filme = {
        id: filmes.length + 1,
        titulo: titulo,
        diretor: diretor,
        ano: ano,
        assistido: false
    }

    filmes.push(novoFilme)
    res.status(201).json(novoFilme)
})

router.put("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const filme = filmes.find(t => t.id == id);

    if(!filme) {
        return res.status(404).json({erro: "Filme não encontrado"})
    }

    const {titulo, diretor, ano, assistindo} = req.body;

    filme.titulo = titulo ?? filme.titulo,
    filme.diretor = diretor ?? filme.diretor,
    filme.ano = ano ?? filme.ano,
    filme.assistido = assistindo ?? filme.assistido

    res.json(filme);
})

router.delete("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const filmeRemovido = filmes.find(t => t.id == id)

    filmes = filmes.filter(t => t.id !== id)  

    res.json({mensagem: `Filme ${filmeRemovido?.titulo} com id ${id} removido`})
})

export default router;