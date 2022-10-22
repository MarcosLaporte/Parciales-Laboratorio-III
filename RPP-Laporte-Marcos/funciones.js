const formPpal = document.getElementById('formPpal');
const numVelProm = document.querySelector('.velocidadPromedio #inpVelMaxPromedio');
const btnVelProm = document.querySelector('.velocidadPromedio #btnPromediarVelMax');

//#region Constantes Tabla
const select_tipo = document.getElementById('sel_tipo');
/* Checkboxes */
const ckBx_id = document.querySelector('.filtroColumnas #chkBxId');
const ckBx_modelo = document.querySelector('.filtroColumnas #chkBxModelo');
const ckBx_anoFab = document.querySelector('.filtroColumnas #chkBxAnoFab');
const ckBx_velMax = document.querySelector('.filtroColumnas #chkBxVelMax');
const ckBx_altMax = document.querySelector('.filtroColumnas #chkBxAltMax');
const ckBx_autonomia = document.querySelector('.filtroColumnas #chkBxAutonomia');
const ckBx_cantPue = document.querySelector('.filtroColumnas #chkBxCantPue');
const ckBx_cantRue = document.querySelector('.filtroColumnas #chkBxCantRue');
/* Columnas */
const cuerpoTabla = document.getElementById('fuenteCuerpo');
const cabeceraTabla = document.getElementById('fila0');
const col_id = document.querySelector('.col_id');
const col_modelo = document.querySelector('.col_modelo');
const col_anoFab = document.querySelector('.col_anoFab');
const col_velMax = document.querySelector('.col_velMax');
const col_altMax = document.querySelector('.col_altMax');
const col_autonomia = document.querySelector('.col_autonomia');
const col_cantPue = document.querySelector('.col_cantPue');
const col_cantRue = document.querySelector('.col_cantRue');
//#endregion

//#region Constantes Formulario ABM
const formABM = document.getElementById('formABM');
const btnAgregar = document.getElementById('agregar');
const abmSel_tipo = document.getElementById('abmSel_tipo');
/*Inputs tipo*/
const abm_tipo = document.getElementById('div_tipo');
const inpAereo = document.querySelector('.formInputs .inputAereo');
const inpTerrestre = document.querySelector('.formInputs .inputTerrestre');
/*Botones*/
const btnAlta = document.getElementById('alta');
const btnBaja = document.getElementById('eliminar');
const btnCancelar = document.getElementById('cancelar');
//#endregion

//Carga de datos a la tabla
var arrayVehiculos = [];
const datosString = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"DodgeViper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook", "anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R", "anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989, "velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953, "velMax":174, "altMax":3, "autonomia":870}]';

function Leer() {
    JSON.parse(datosString).forEach((vehiculo) => {
        if (vehiculo.hasOwnProperty("id") && vehiculo.hasOwnProperty("modelo")
            && vehiculo.hasOwnProperty("anoFab") && vehiculo.hasOwnProperty("velMax")) {
            if (vehiculo.hasOwnProperty("altMax")) {
                let aereo = new Aereo(vehiculo.id, vehiculo.modelo, vehiculo.anoFab, vehiculo.velMax, vehiculo.altMax, vehiculo.autonomia);
                arrayVehiculos.push(aereo);
            } else if (vehiculo.hasOwnProperty("cantPue")) {
                let terrestre = new Terrestre(vehiculo.id, vehiculo.modelo, vehiculo.anoFab, vehiculo.velMax, vehiculo.cantPue, vehiculo.cantRue);
                arrayVehiculos.push(terrestre);
            }
        }
    });
}

function Cargar(vehiculos) {
    vehiculos.forEach(vehiculo => {
        let auxVehiculos = [vehiculo.id, vehiculo.modelo, vehiculo.anoFabricacion, vehiculo.velocidadMaxima, vehiculo.alturaMaxima || "", vehiculo.autonomia || "", vehiculo.cantidadPuertas || "", vehiculo.cantidadRuedas || ""];
        let nuevaFila = document.createElement("tr");
        nuevaFila.addEventListener("dblclick", AbmModificar);
        nuevaFila.id = vehiculo.id;

        auxVehiculos.forEach(element => {
            let td = document.createElement("td");
            td.id = `vehiculo${auxVehiculos[0]}Val${element}`;
            td.textContent = element;
            nuevaFila.appendChild(td);
        });

        cuerpoTabla.appendChild(nuevaFila);
    });
}

function MapeoDeVehiculos(filtro) {
    cuerpoTabla.innerHTML = "";
    let auxVehiculos = [];
    arrayVehiculos.map((vehiculo) => {
        switch (filtro) {
            case 'T':
                auxVehiculos.push(vehiculo);
                break;
            case 'A':
                if (vehiculo instanceof Aereo) {
                    auxVehiculos.push(vehiculo);
                }
                break;
            case 'C':
                if (vehiculo instanceof Terrestre) {
                    auxVehiculos.push(vehiculo);
                }
                break;
        }
    })
    
    Cargar(auxVehiculos);
}

function Iniciar() {
    formABM.style.display = 'none';
    Leer();
    MapeoDeVehiculos(select_tipo.value);
}

select_tipo.addEventListener('change', () => {
    MapeoDeVehiculos(select_tipo.value);
});

//#region Velocidad Máxima Promedio
function CalcularVelMaxPromedio() {
    acumulador = 0;
    let arrayFiltrado = arrayVehiculos.filter((vehiculo) => {
        switch (select_tipo.value) {
            case 'T':
                return true;
            case 'A':
                return (vehiculo instanceof Aereo)
            case 'C':
                return (vehiculo instanceof Terrestre)
        }
    });
    acumulador = arrayFiltrado.reduce((suma, vehiculo) => suma + vehiculo.velocidadMaxima, 0);
    contador = arrayFiltrado.length;

    return acumulador / contador;
}

btnVelProm.addEventListener('click', () => {
    numVelProm.value = (CalcularVelMaxPromedio()).toFixed(2);
});
//#endregion

//#region Form ABM
btnAgregar.onclick = function () {
    AbrirABM();
    abm_tipo.style.display = 'inherit';
    btnAlta.innerText = 'Alta';
    btnBaja.style.display = 'none';

    document.querySelector('.formInputs #inp_id').placeholder = 'ID único autogenerado';
    document.querySelector('.formInputs #inp_modelo').placeholder = 'Ferrari';
    document.querySelector('.formInputs #inp_anoFab').placeholder = 2000;
    document.querySelector('.formInputs #inp_velMax').placeholder = '1+';
    document.querySelector('.formInputs #inp_altMax').placeholder = '1+';
    document.querySelector('.formInputs #inp_autonomia').placeholder = "1+";
    document.querySelector('.formInputs #inp_cantPue').placeholder = '1+';
    document.querySelector('.formInputs #inp_cantRue').placeholder = '1+';

}

function AbmModificar() {
    let idFilaSeleccionada = event.target.parentNode.id;
    let indexVehiculo = BuscarVehiculo(idFilaSeleccionada);
    let vehiculoSeleccionado = indexVehiculo != -1 ? arrayVehiculos[indexVehiculo] : null;
    AbrirABM();

    abm_tipo.style.display = 'none';
    btnAlta.innerText = 'Modificar';
    btnBaja.style.removeProperty('display');

    document.querySelector('.formInputs #inp_id').value = vehiculoSeleccionado.id;
    document.querySelector('.formInputs #inp_modelo').value = vehiculoSeleccionado.modelo;
    document.querySelector('.formInputs #inp_anoFab').value = vehiculoSeleccionado.anoFabricacion;
    document.querySelector('.formInputs #inp_velMax').value = vehiculoSeleccionado.velocidadMaxima;

    if (vehiculoSeleccionado instanceof Aereo) {
        inpAereo.style.display = 'inherit';
        inpTerrestre.style.display = 'none';
        document.querySelector('.formInputs #inp_altMax').value = vehiculoSeleccionado.alturaMaxima;
        document.querySelector('.formInputs #inp_autonomia').value = vehiculoSeleccionado.autonomia;
    } else {
        inpAereo.style.display = 'none';
        inpTerrestre.style.display = 'inherit';
        document.querySelector('.formInputs #inp_cantPue').value = vehiculoSeleccionado.cantidadPuertas;
        document.querySelector('.formInputs #inp_cantRue').value = vehiculoSeleccionado.cantidadRuedas;
    }
}

btnAlta.onclick = function () {
    let auxVehiculos = arrayVehiculos;
    let id = document.querySelector('.formInputs #inp_id').value;
    let modelo = document.querySelector('.formInputs #inp_modelo').value;
    let anoFab = document.querySelector('.formInputs #inp_anoFab').value;
    let velMax = document.querySelector('.formInputs #inp_velMax').value;

    let altMax = document.querySelector('.formInputs #inp_altMax').value;
    let autonomia = document.querySelector('.formInputs #inp_autonomia').value;

    let cantPue = document.querySelector('.formInputs #inp_cantPue').value;
    let cantRue = document.querySelector('.formInputs #inp_cantRue').value;

    let aereo;
    let terrestre;

    if (btnAlta.innerText === 'Modificar') {
        let index = BuscarVehiculo(id);

        if (index == -1)
            return;

        auxVehiculos[index].modelo = modelo;
        auxVehiculos[index].anoFabricacion = parseInt(anoFab);
        auxVehiculos[index].velocidadMaxima = parseInt(velMax);

        if (auxVehiculos[index] instanceof Aereo) {
            aereo = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia);
            if (CamposValidosAereo()) {
                auxVehiculos[index].alturaMaxima = parseInt(altMax);
                auxVehiculos[index].autonomia = parseInt(autonomia);
                CerrarABM();
            } else {
                alert("Revise los campos!");
            }
        } else {
            terrestre = new Terrestre(id, modelo, anoFab, velMax, cantPue, cantRue);
            if (CamposValidosTerrestre()) {
                auxVehiculos[index].cantidadPuertas = parseInt(cantPue);
                auxVehiculos[index].cantidadRuedas = parseInt(cantRue);
                CerrarABM();
            } else {
                alert("Revise los campos!");
            }
        }
    } else {
        if (abmSel_tipo.value === 'A') {
            if (CamposValidosAereo()) {
                aereo = new Aereo(CrearIdUnico(), modelo, anoFab, velMax, altMax, autonomia);
                aereo.AereoExiste(arrayVehiculos) ? alert("Este vehículo aereo ya existe!") : auxVehiculos.push(aereo);
                CerrarABM();
            } else {
                alert("Revise los campos!");
            }
        } else {
            if (CamposValidosTerrestre()) {
                terrestre = new Terrestre(CrearIdUnico(), modelo, anoFab, velMax, cantPue, cantRue);
                terrestre.TerrestreExiste(arrayVehiculos) ? alert("Este vehículo terrestre ya existe!") : auxVehiculos.push(terrestre);
                CerrarABM();
            } else {
                alert("Revise los campos!");
            }
        }
    }

    arrayVehiculos = auxVehiculos;
}

btnBaja.onclick = function () {
    let id = document.querySelector('.formInputs #inp_id').value;
    let index = BuscarVehiculo(id);
    index != -1 ? arrayVehiculos.splice(index, 1) : alert("Ese vehiculo no existe!");
    CerrarABM();
}

btnCancelar.onclick = CerrarABM;

abmSel_tipo.addEventListener('change', () => {
    if (abmSel_tipo.value === 'A') {
        inpTerrestre.style.display = 'none';
        inpAereo.style.display = 'inherit';
    } else {
        inpAereo.style.display = 'none';
        inpTerrestre.style.display = 'inherit';
    }
});

function BuscarVehiculo(id) {
    let index = -1;
    for (let i = 0; i < arrayVehiculos.length; i++) {
        let vehiculo = arrayVehiculos[i];
        if (vehiculo.id == id) {
            index = i;
            break;
        }
    }

    return index;
}

function CamposValidosAereo() {
    let modelo = document.querySelector('.formInputs #inp_modelo').value;
    let anoFab = document.querySelector('.formInputs #inp_anoFab').value;
    let velMax = document.querySelector('.formInputs #inp_velMax').value;

    let altMax = document.querySelector('.formInputs #inp_altMax').value;
    let autonomia = document.querySelector('.formInputs #inp_autonomia').value;

    return modelo.trim() != '' && parseInt(anoFab) > 0 && parseInt(velMax) > 0 && parseInt(altMax) > 0 && parseInt(autonomia) > 0;
}

function CamposValidosTerrestre() {
    let modelo = document.querySelector('.formInputs #inp_modelo').value;
    let anoFab = document.querySelector('.formInputs #inp_anoFab').value;
    let velMax = document.querySelector('.formInputs #inp_velMax').value;

    let cantPue = document.querySelector('.formInputs #inp_cantPue').value;
    let cantRue = document.querySelector('.formInputs #inp_cantRue').value;

    return modelo.trim() != '' && parseInt(anoFab) > 0 && parseInt(velMax) > 0 &&
        parseInt(cantPue) > 0 && parseInt(cantRue) > 0;
}

function AbrirABM() {
    formPpal.style.display = 'none';
    formABM.style.display = 'flex';
}

function CerrarABM() {
    formABM.style.display = 'none';
    formPpal.style.display = 'flex';

    document.querySelector('.formInputs #inp_id').value = '';
    document.querySelector('.formInputs #inp_modelo').value = '';
    document.querySelector('.formInputs #inp_anoFab').value = '';
    document.querySelector('.formInputs #inp_velMax').value = '';
    document.querySelector('.formInputs #inp_altMax').value = '';
    document.querySelector('.formInputs #inp_autonomia').value = '';
    document.querySelector('.formInputs #inp_cantPue').value = '';
    document.querySelector('.formInputs #inp_cantRue').value = '';

    MapeoDeVehiculos(select_tipo.value);
}

function CrearIdUnico() {
    return arrayVehiculos.reduce((max, vehiculo) => (vehiculo.id > max ? vehiculo.id : max), arrayVehiculos[0].id) +1;
}
//#endregion

//#region Ordenamiento de tabla
col_id.addEventListener('click', (e) => {
    arrayVehiculos.sort((v1, v2) => CompararValores(v1.id, v2.id));
    MapeoDeVehiculos(select_tipo.value);
});
col_modelo.addEventListener('click', () => {
    arrayVehiculos.sort((v1, v2) => CompararValores(v1.modelo, v2.modelo));
    MapeoDeVehiculos(select_tipo.value);
});
col_anoFab.addEventListener('click', () => {
    arrayVehiculos.sort((v1, v2) => CompararValores(v1.anoFabricacion, v2.anoFabricacion));
    MapeoDeVehiculos(select_tipo.value);
});
col_velMax.addEventListener('click', () => {
    arrayVehiculos.sort((v1, v2) => CompararValores(v1.velocidadMaxima, v2.velocidadMaxima));
    MapeoDeVehiculos(select_tipo.value);
});
col_altMax.addEventListener('click', () => {
    arrayVehiculos.sort((v1, v2) => CompararValores(v1.alturaMaxima, v2.alturaMaxima));
    MapeoDeVehiculos(select_tipo.value);
});
col_autonomia.addEventListener('click', () => {
    arrayVehiculos.sort((v1, v2) => CompararValores(v1.autonomia, v2.autonomia));
    MapeoDeVehiculos(select_tipo.value);
});
col_cantPue.addEventListener('click', () => {
    arrayVehiculos.sort((v1, v2) => CompararValores(v1.cantidadPuertas, v2.cantidadPuertas));
    MapeoDeVehiculos(select_tipo.value);
});
col_cantRue.addEventListener('click', () => {
    arrayVehiculos.sort((v1, v2) => CompararValores(v1.cantidadRuedas, v2.cantidadRuedas));
    MapeoDeVehiculos(select_tipo.value);
});


function CompararValores(valorA, valorB) {
    if (valorA) {
        if (valorA > valorB) {
            return 1;
        } else if (valorA == valorB) {
            return 0;
        } else {
            return -1;
        }
    }
}

//#endregion

//#region  Filtro de columnas

let arrayCheckBoxes = new Array();
arrayCheckBoxes.push(ckBx_id, ckBx_modelo, ckBx_anoFab, ckBx_velMax, ckBx_altMax, ckBx_autonomia, ckBx_cantPue, ckBx_cantRue);

arrayCheckBoxes.map((checkBox, index) => {
    checkBox.addEventListener("change", OcultarColumnas);
    checkBox.textContent = index;
});


function OcultarColumnas(element) {
    let chBx = element.currentTarget;
    let indexColumna = chBx.textContent;
    let hijos = Array.from(cabeceraTabla.childNodes);
    let cabeceraSeleccionada = hijos.filter(node => (node.nodeName === "TH" && node.cellIndex == indexColumna)).pop();
    let celdasCuerpo = cuerpoTabla.childNodes;

    celdasCuerpo.forEach(fila => {
        chBx.checked ? fila.childNodes[indexColumna].style.removeProperty('display') : fila.childNodes[indexColumna].style.display = 'none';
    });

    chBx.checked ? cabeceraSeleccionada.style.removeProperty('display') : cabeceraSeleccionada.style.display = 'none';
}
//#endregion

Iniciar();
