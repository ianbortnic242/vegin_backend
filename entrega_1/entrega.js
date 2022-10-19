class Usuario{

    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombre, autor){
        this.libros.push({nombre, autor})
    }
    getBookNames(){
        return this.libros.map((libro) => libro.nombre)
    }
}

const usuario = new Usuario('ian', 'bortnic', [{'nombre':'sol', 'autor':'ian'}, {'nombre':'luna', 'autor':'max'}], ['perro', 'lagarto'])

usuario.addBook('mar', 'luis')
console.log(usuario.getBookNames())
usuario.addMascota('gato')
console.log(usuario.countMascotas())
console.log(usuario.getFullName())