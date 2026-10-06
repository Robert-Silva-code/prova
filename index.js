const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

require('dotenv').config()

const prisma = require('./lib/prisma')

app.use(cors())
app.use(express.json())

app.get('/teste', (req, res) => { res.json({ mensagem: "Rodando!" }); }); 


app.get('/usuarios', async (req, res) => {
    const todos = await prisma.usuario.findMany()
    res.json(todos)
})

app.post('/usuarios', async (req, res) => {
    const { nome, idade } = req.body

    try{
        const novo = await prisma.usuario.create({
            data: {
                nome: nome, 
                idade: idade
            }
        })
        res.status(200).json(`Usuario criado com sucesso`)
    } catch(erro){
        console.error("Erro ao criar usuario", erro)
        res.json("Erro ao criar usuario")
    }
})

app.put('/usuarios/:id', async (req, res) => {
    const id = Number(req.params.id)
    const {nome, idade} = req.body

    try{
        const atualizado = await prisma.usuario.update({
            where: {id},
            data: {
                nome: nome,
                idade: idade
            }
        })
        res.status(200).json(`Usuario ${id} atualizado com sucesso!`)
    } catch(erro){
        console.error("Erro ao atualizar usuario", erro)
        res.status(404).json("Erro ao atualizar usuario")
    }
})

app.delete('/usuarios/:id', async (req, res) => {
    const id = Number(req.params.id)

    try{
        await prisma.usuario.delete({
            where: {id}
        })
        res.status(200).json("Usuario deletado")
    } catch(erro){
        console.error("Erro ao deletar usuario", erro)
        res.json("Erro ao deletar usuario")
    }
})

app.listen(port, () => {
    console.log(`Rodando em http:///localhost:${port}`)
})