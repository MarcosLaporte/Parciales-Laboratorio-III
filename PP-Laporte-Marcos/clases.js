class Persona {
    id;
    nombre;
    apellido;
    edad;

    constructor(i, n, a, e) {
        this.id = parseInt(i);
        this.nombre = n.trim() || 'Marcos';
        this.apellido = a.trim() || "Laporte";
        this.edad = parseInt(e) > 15 ? e : 16;
    }
}

class Heroe extends Persona {
    alterego;
    ciudad;
    publicado;

    constructor(i, n, a, e, aE, c, p) {
        super(i, n, a, e);
        this.alterego = aE.trim() || "Unknown";
        this.ciudad = c.trim() || "Chacarita";
        this.publicado = (parseInt(p) > 1940 && parseInt(p) < 2022) ? p : Math.floor((Math.random() * (2022 - 1941)) + 1941);
    }

    HeroeExiste(arrayPersonas) {
        let ret = false;
        arrayPersonas.forEach(persona => {
            if (this.nombre == persona.nombre && this.apellido == persona.apellido && this.edad == persona.edad &&
                this.alterego == persona.alterego && this.ciudad == persona.ciudad && this.publicado == persona.publicado) {
                ret = true;
            }
        });

        return ret;
    }

}

class Villano extends Persona {
    enemigo;
    robos;
    asesinatos;

    constructor(i, n, a, e, en, r, as) {
        super(i, n, a, e);
        this.enemigo = en.trim() || "Ronald McDonald";
        parseInt(r) > 0 ? this.robos = r : this.robos = 1;
        parseInt(as) > 0 ? this.asesinatos = as : this.asesinatos = 1;
    }

    VillanoExiste(arrayPersonas) {
        let ret = false;
        arrayPersonas.forEach(persona => {
            if (this.nombre == persona.nombre && this.apellido == persona.apellido && this.edad == persona.edad) {
                ret = true;
            }
        });

        return ret;
    }
}