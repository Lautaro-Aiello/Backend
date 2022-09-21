const random = require ("random")

const express = require("express")
const app = express()

const Contenedor = require ("./manejoArchivos")
let contenedor = new Contenedor("productos.txt")

async function productosAll () {
    let productos = await contenedor.getAll()
    let productosStr = JSON.stringify(productos)
    return productosStr
}

async function productoRandom () {
    let array = await contenedor.getAll()
    let arrayLength = await array.length
    let productoRandom = Math.floor(Math.random()*arrayLength)
    return JSON.stringify(array[productoRandom])
}

app.get('/', (req, res) => {
    res.send(`Root!!!!!`);
})

app.get("/productos", async (req, res) =>{
    res.end(await productosAll())
})


app.get("/productoRandom", async (req, res) =>{
    res.end( await productoRandom() )
})


const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => console.log(`Server running in ${server.address().port}`))
server.on("error", error => console.log(`Error en servidor ${error}`))


