
const fs = require("fs")

class Contenedor{
    constructor(archivo){
        this.archivo = archivo
    }

    async save(data){
        let contenido = await fs.promises.readFile(this.archivo)
        let contenidoObj = JSON.parse(contenido)
        let newId;
        if(contenidoObj.length > 0){
            newId = contenidoObj.length + 1;
        }else{
            newId = 1
        }
        data.id = newId;
        contenidoObj.push(data)
        await fs.promises.writeFile(this.archivo, JSON.stringify(contenidoObj))
        console.log(`Objeto Añadido`)
    }

    async getById(num){
         let contenido = await fs.promises.readFile(this.archivo)
         let contenidoObj = JSON.parse(contenido)
         let resultado = contenidoObj.find(objeto => objeto.id === num)
         if(!resultado){
            console.log(null)
            return null
         }
         console.log(resultado)  
         return resultado 
    }

    async getAll(){
        let contenido = await fs.promises.readFile(this.archivo)
        let contenidoObj = JSON.parse(contenido)
        // console.log(contenidoObj)
        return contenidoObj;
        
    }

   async deleteById(num){
        let contenido = await fs.promises.readFile(this.archivo)
        let contenidoObj = JSON.parse(contenido)
        let buscar = contenidoObj.filter(objeto => objeto.id !== num)
        await fs.promises.writeFile(this.archivo, JSON.stringify(buscar))
        let eliminado = contenidoObj.find(objeto => objeto.id === num)
        console.log(eliminado) 
    }

    async deleteAll(){
        await fs.promises.writeFile(this.archivo, "[]")
        console.log("Objetos eliminados")
    }
}

let producto1 = {
    "title": "Remera Oversize roja",
    "price": 6500,
    "thumbail": "https://d3ugyf2ht6aenh.cloudfront.net/stores/096/264/products/13-frente-r1-1f2bccec3bbadf203c16526322133285-1024-1024.jpg"
}
let producto2 = {
    "title": "Remera Oversize negra",
    "price": 4500,
    "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_601169-MLA44315132049_122020-W.jpg"
}
let producto3 = {
    "title": "Remera Oversize blanca",
    "price": 5500,
    "thumbnail": "https://urbanmenshops.com/wp-content/uploads/2021/11/IMG_8292-scaled.jpg"
}
let producto4 = {
    "title": "Remera Oversize verde",
    "price": 3500,
    "thumbnail": "https://aynotdead.com/wp-content/uploads/2021/03/21_03_31-AYND-ESHOP-FW21-D450472.jpg"
}

const contenedor = new Contenedor("productos.txt")

// const usarContenedor = async () => {
//     await contenedor.save(producto1)
//     await contenedor.save(producto2)
//     await contenedor.save(producto3)
//     await contenedor.save(producto4)
// }
// usarContenedor()

// contenedor.getAll()
// contenedor.getById(2)
// contenedor.deleteAll()
// contenedor.deleteById(2)

module.exports = Contenedor;