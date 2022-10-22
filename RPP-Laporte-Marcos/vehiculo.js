class Vehiculo{
    id;
    modelo;
    anoFabricacion;
    velocidadMaxima;

    constructor(i, m, aF, vM){
        this.id = parseInt(i);
        this.modelo = m.trim() || "Audi 2003";
        this.anoFabricacion = parseInt(aF) > 0 ? parseInt(aF) : 2022;
        this.velocidadMaxima = parseInt(vM) > 0 ? parseInt(vM) : 200;
    }

    toString(){
        return `ID ${this.id}: ${this.modelo} fabricado en ${this.anoFabricacion} llega a ${this.velocidadMaxima}km/h.\n`;
    }
}

class Aereo extends Vehiculo{
    alturaMaxima;
    autonomia;

    constructor(i, m, aF, vM, aM, au){
        super(i, m, aF, vM);
        this.alturaMaxima = parseInt(aM) > 0 ? parseInt(aM) : 1500;
        this.autonomia = parseInt(au) > 0 ? parseInt(au) : 20;
    }

    toString(){
        return super.toString() + `Llega a una altura máxima de ${this.alturaMaxima}m y tiene una autonomía de ${this.autonomia}.\n`;
    }

    AereoExiste(arrayVehiculos) {
        let ret = false
        arrayVehiculos.forEach(vehiculo => {
            if (this.modelo.toLowerCase() == vehiculo.modelo.toLowerCase() && this.anoFabricacion == vehiculo.anoFabricacion && this.velocidadMaxima == vehiculo.velocidadMaxima &&
                this.alturaMaxima == vehiculo.alturaMaxima && this.autonomia == vehiculo.autonomia) {
                ret = true;
            }
        });

        return ret;
    }
}

class Terrestre extends Vehiculo{
    cantidadPuertas;
    cantidadRuedas;

    constructor(i, m, aF, vM, cP, cR){
        super(i, m, aF, vM);
        this.cantidadPuertas = parseInt(cP) > 0 ? parseInt(cP) : 4;
        this.cantidadRuedas = parseInt(cR) > 0 ? parseInt(cR) : 4;
    }

    toString(){
        return super.toString() + `Con ${this.cantidadPuertas} puertas y ${this.cantidadRuedas} ruedas.\n`;
    }

    TerrestreExiste(arrayVehiculos) {
        let ret = false
        arrayVehiculos.forEach(vehiculo => {
            if (this.modelo.toLowerCase() == vehiculo.modelo.toLowerCase() && this.anoFabricacion == vehiculo.anoFabricacion && this.velocidadMaxima == vehiculo.velocidadMaxima &&
                this.cantidadPuertas == vehiculo.cantidadPuertas && this.cantidadRuedas == vehiculo.cantidadRuedas) {
                ret = true;
            }
        });

        return ret;
    }
}
