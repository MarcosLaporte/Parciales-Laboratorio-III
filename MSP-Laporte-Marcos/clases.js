class Persona {
    id;
    nombre;
    apellido;
    edad;

    constructor(i, n, a, e) {
        this.id = parseInt(i);
        this.nombre = n.trim();
        this.apellido = a.trim();
        this.edad = parseInt(e);
    }
}

class Heroe extends Persona {
    alterego;
    ciudad;
    publicado;

    constructor(i, n, a, e, aE, c, p) {
        super(i, n, a, e);
        this.alterego = aE.trim();
        this.ciudad = c.trim();
        this.publicado = parseInt(p);
    }

    HeroeExiste(arrayPersonas) {
        arrayPersonas.forEach(persona => {
            if (this.nombre == persona.nombre && this.apellido == persona.apellido && this.edad == persona.edad &&
                this.alterego == persona.alterego && this.ciudad == persona.ciudad && this.publicado == persona.publicado) {
                return true;
            }
        });

        return false;
    }

}

class Villano extends Persona {
    enemigo;
    robos;
    asesinatos;

    constructor(i, n, a, e, en, r, as) {
        super(i, n, a, e);
        this.enemigo = en.trim();
        this.robos = parseInt(r);
        this.asesinatos = parseInt(as);
    }

    VillanoExiste(arrayPersonas) {
        arrayPersonas.forEach(persona => {
            if (this.nombre == persona.nombre && this.apellido == persona.apellido && this.edad == persona.edad) {
                return true;
            }
        });

        return false;
    }
}