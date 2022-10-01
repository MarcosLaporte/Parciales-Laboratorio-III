class Persona{
    id;
    nombre;
    apellido;
    edad;

    constructor(i, n, a, e){
        this.id = parseInt(i) || 1;
        this.nombre = n || "Marcos";
        this.apellido = a || "Laporte";
        parseInt(e) <= 15 ? this.edad = 16 : this.edad = e;
    }

    toString() {
        return `${this.id}: ${this.nombre} ${this.apellido}, ${this.edad}.\n`;
    }
}

class Heroe extends Persona{
    alterego;
    ciudad;
    publicado;

    constructor(i, n, a, e, aE, c, p){
        super(i, n, a, e);
        this.alterego = aE || "Unknown";
        this.ciudad = c || "Chacarita";
        parseInt(p) > 1940 ? this.publicado = p : this.publicado = 1941;
    }

    toString() {
        return super.toString() + `Conocido como ${this.alterego} en ${this.ciudad} y publicado en ${this.publicado}.\n`;
    }
}

class Villano extends Persona{
    enemigo;
    robos;
    asesinatos;

    constructor(i, n, a, e, en, r, as){
        super(i, n, a, e);
        this.enemigo = en || "Ronald McDonald";
        parseInt(r) > 0 ? this.robos = r : this.robos = 1;
        parseInt(as) > 0 ? this.asesinatos = as : this.asesinatos = 1;
    }

    toString() {
        return super.toString() + `Tiene como enemigo a ${this.enemigo} tras cometer ${this.robos} robos y ${this.asesinatos} asesinatos.\n`;
    }
}