const formPpal = document.getElementById('formPpal');
const numEdadProm = document.querySelector('.edadPromedio #inpEdadPromedio');
const btnEdadProm = document.querySelector('.edadPromedio #btnPromediarEdad');

//#region Constantes Tabla
const select_tipo = document.getElementById('sel_tipo');
/* Checkboxes */
const ckBx_id = document.querySelector('.filtroColumnas #chkBxId');
const ckBx_nombre = document.querySelector('.filtroColumnas #chkBxNombre');
const ckBx_apellido = document.querySelector('.filtroColumnas #chkBxApellido');
const ckBx_edad = document.querySelector('.filtroColumnas #chkBxEdad');
const ckBx_alterego = document.querySelector('.filtroColumnas #chkBxAlterego');
const ckBx_ciudad = document.querySelector('.filtroColumnas #chkBxCiudad');
const ckBx_publicado = document.querySelector('.filtroColumnas #chkBxPublicado');
const ckBx_enemigo = document.querySelector('.filtroColumnas #chkBxEnemigo');
const ckBx_robos = document.querySelector('.filtroColumnas #chkBxRobos');
const ckBx_asesinatos = document.querySelector('.filtroColumnas #chkBxAsesinatos');
/* Columnas */
const cuerpoTabla = document.getElementById('fuenteCuerpo');
const cabeceraTabla = document.getElementById('fila0');
const col_id = document.querySelector('.col_id');
const col_nombre = document.querySelector('.col_nombre');
const col_apellido = document.querySelector('.col_apellido');
const col_edad = document.querySelector('.col_edad');
const col_alterego = document.querySelector('.col_alterego');
const col_ciudad = document.querySelector('.col_ciudad');
const col_publicado = document.querySelector('.col_publicado');
const col_enemigo = document.querySelector('.col_enemigo');
const col_robos = document.querySelector('.col_robos');
const col_asesinatos = document.querySelector('.col_asesinatos');
//#endregion

//#region Constantes Formulario ABM
const formABM = document.getElementById('formABM');
const btnAgregar = document.getElementById('agregar');
const abmSel_tipo = document.getElementById('abmSel_tipo');
/*Inputs tipo*/
const abm_tipo = document.getElementById('div_tipo');
const inpHeroe = document.querySelector('.formInputs .inputHeroe');
const inpVillano = document.querySelector('.formInputs .inputVillano');
/*Botones*/
const btnAlta = document.getElementById('alta');
const btnBaja = document.getElementById('eliminar');
const btnCancelar = document.getElementById('cancelar');
//#endregion

//Carga de datos a la tabla
var arrayPersonas = [];
const datosString = '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis","publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica","publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central","publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,"asesinatos":1}]';

function Leer() {
    JSON.parse(datosString).forEach((persona) => {
        if (persona.hasOwnProperty("id") && persona.hasOwnProperty("nombre")
            && persona.hasOwnProperty("apellido") && persona.hasOwnProperty("edad")) {
            if (persona.hasOwnProperty("alterego")) {
                let heroe = new Heroe(persona.id, persona.nombre, persona.apellido, persona.edad, persona.alterego, persona.ciudad, persona.publicado);
                arrayPersonas.push(heroe);
            } else if (persona.hasOwnProperty("enemigo")) {
                let villano = new Villano(persona.id, persona.nombre, persona.apellido, persona.edad, persona.enemigo, persona.robos, persona.asesinatos);
                arrayPersonas.push(villano);
            }
        }
    });
}

function Cargar(personas) {
    personas.forEach(persona => {
        let auxPersonas = [persona.id, persona.nombre, persona.apellido, persona.edad, persona.alterego || "", persona.ciudad || "", persona.publicado || "", persona.enemigo || "", persona.robos || "", persona.asesinatos || ""];
        let nuevaFila = document.createElement("tr");
        nuevaFila.addEventListener("dblclick", AbmModificar);
        nuevaFila.id = persona.id;

        auxPersonas.forEach(element => {
            let td = document.createElement("td");
            td.id = `pers${auxPersonas[0]}Val${element}`;
            td.textContent = element;
            nuevaFila.appendChild(td);
        });

        cuerpoTabla.appendChild(nuevaFila);
    });
}

function MapeoDePersonas(filtro) {
    cuerpoTabla.innerHTML = "";
    auxPersonas = [];
    arrayPersonas.map((persona) => {
        switch (filtro) {
            case 'T':
                auxPersonas.push(persona);
                break;
            case 'H':
                if (persona instanceof Heroe) {
                    auxPersonas.push(persona);
                }
                break;
            case 'V':
                if (persona instanceof Villano) {
                    auxPersonas.push(persona);
                }
                break;
        }
    })
    Cargar(auxPersonas);
}

function Iniciar() {
    formABM.style.display = 'none';
    Leer();
    MapeoDePersonas(select_tipo.value);
}

select_tipo.addEventListener('change', () => {
    MapeoDePersonas(select_tipo.value);
});

//#region Edad Promedio
function CalcularEdadPromedio() {
    acumulador = 0;
    arrayFiltrado = arrayPersonas.filter((persona) => {
        switch (select_tipo.value) {
            case 'T':
                return true;
            case 'H':
                return (persona instanceof Heroe)
            case 'V':
                return (persona instanceof Villano)
        }
    });
    contador = arrayFiltrado.length;
    acumulador = arrayFiltrado.reduce((suma, persona) => suma + persona.edad, 0);

    return acumulador / contador;
}

btnEdadProm.addEventListener('click', () => {
    numEdadProm.value = (CalcularEdadPromedio()).toFixed(2);
});
//#endregion

//#region Form ABM

btnAgregar.onclick = function () {
    AbrirABM();
    abm_tipo.style.display = 'inherit';
    btnAlta.innerText = 'Alta';
    btnBaja.style.display = 'none';

    document.querySelector('.formInputs #inp_id').placeholder = 'ID único autogenerado';
    document.querySelector('.formInputs #inp_nombre').placeholder = 'Marcos';
    document.querySelector('.formInputs #inp_apellido').placeholder = 'Laporte';
    document.querySelector('.formInputs #inp_edad').placeholder = '16+';
    document.querySelector('.formInputs #inp_alterego').placeholder = 'DareDevil';
    document.querySelector('.formInputs #inp_ciudad').placeholder = "Hell's Kitchen";
    document.querySelector('.formInputs #inp_publicado').placeholder = '1941+';
    document.querySelector('.formInputs #inp_enemigo').placeholder = 'Spider-Man';
    document.querySelector('.formInputs #inp_robos').placeholder = '1+';
    document.querySelector('.formInputs #inp_asesinatos').placeholder = '1+';

}

function AbmModificar() {
    let idFilaSeleccionada = event.target.parentNode.id;
    let indexPersona = BuscarPersona(idFilaSeleccionada);
    let personaSeleccionada = indexPersona != -1 ? arrayPersonas[indexPersona] : null;
    AbrirABM();

    abm_tipo.style.display = 'none';
    btnAlta.innerText = 'Modificar';
    btnBaja.style.removeProperty('display');

    document.querySelector('.formInputs #inp_id').value = personaSeleccionada.id;
    document.querySelector('.formInputs #inp_nombre').value = personaSeleccionada.nombre;
    document.querySelector('.formInputs #inp_apellido').value = personaSeleccionada.apellido;
    document.querySelector('.formInputs #inp_edad').value = personaSeleccionada.edad;

    if (personaSeleccionada instanceof Heroe) {
        inpHeroe.style.display = 'inherit';
        inpVillano.style.display = 'none';
        document.querySelector('.formInputs #inp_alterego').value = personaSeleccionada.alterego;
        document.querySelector('.formInputs #inp_ciudad').value = personaSeleccionada.ciudad;
        document.querySelector('.formInputs #inp_publicado').value = personaSeleccionada.publicado;
    } else {
        inpHeroe.style.display = 'none';
        inpVillano.style.display = 'inherit';
        document.querySelector('.formInputs #inp_enemigo').value = personaSeleccionada.enemigo;
        document.querySelector('.formInputs #inp_robos').value = personaSeleccionada.robos;
        document.querySelector('.formInputs #inp_asesinatos').value = personaSeleccionada.asesinatos;
    }
}

btnAlta.onclick = function () {
    let auxPersonas = arrayPersonas;
    let id = document.querySelector('.formInputs #inp_id').value;
    let nombre = document.querySelector('.formInputs #inp_nombre').value;
    let apellido = document.querySelector('.formInputs #inp_apellido').value;
    let edad = document.querySelector('.formInputs #inp_edad').value;

    let alterego = document.querySelector('.formInputs #inp_alterego').value;
    let ciudad = document.querySelector('.formInputs #inp_ciudad').value;
    let publicado = document.querySelector('.formInputs #inp_publicado').value;

    let enemigo = document.querySelector('.formInputs #inp_enemigo').value;
    let robos = document.querySelector('.formInputs #inp_robos').value;
    let asesinatos = document.querySelector('.formInputs #inp_asesinatos').value;

    let heroe;
    let villano;

    if (btnAlta.innerText === 'Modificar') {
        let index = BuscarPersona(id);
        auxPersonas[index].nombre = nombre;
        auxPersonas[index].apellido = apellido;
        auxPersonas[index].edad = parseInt(edad);

        if (auxPersonas[index] instanceof Heroe) {
            heroe = new Heroe(id, nombre, apellido, edad, alterego, ciudad, publicado);
            if (CamposValidosHeroe()) {
                auxPersonas[index].alterego = alterego;
                auxPersonas[index].ciudad = ciudad;
                auxPersonas[index].publicado = parseInt(publicado);
                CerrarABM();
            } else {
                alert("Revise los campos!");
            }
        } else {
            villano = new Villano(id, nombre, apellido, edad, enemigo, robos, asesinatos);
            if (CamposValidosVillano()) {
                auxPersonas[index].enemigo = enemigo;
                auxPersonas[index].robos = parseInt(robos);
                auxPersonas[index].asesinatos = parseInt(asesinatos);
                CerrarABM();
            } else {
                alert("Revise los campos!");
            }
        }
    } else {
        if (abmSel_tipo.value === 'H') {
            if (CamposValidosHeroe()) {
                heroe = new Heroe(CrearIdUnico(), nombre, apellido, edad, alterego, ciudad, publicado);
                heroe.HeroeExiste(arrayPersonas) ? alert("Este héroe ya existe!") : auxPersonas.push(heroe);
                CerrarABM();
            } else {
                alert("Revise los campos!");
            }
        } else {
            if (CamposValidosVillano()) {
                villano = new Villano(CrearIdUnico(), nombre, apellido, edad, enemigo, robos, asesinatos);
                villano.VillanoExiste(arrayPersonas) ? alert("Este villano ya existe!") : auxPersonas.push(villano);
                CerrarABM();
            } else {
                alert("Revise los campos!");
            }
        }
    }

    arrayPersonas = auxPersonas;
}

btnBaja.onclick = function () {
    let id = document.querySelector('.formInputs #inp_id').value;
    let index = BuscarPersona(id);
    index != -1 ? arrayPersonas.splice(index, 1) : alert("Esa persona no existe!");
    CerrarABM();
}

btnCancelar.onclick = CerrarABM;

abmSel_tipo.addEventListener('change', () => {
    if (abmSel_tipo.value === 'H') {
        inpVillano.style.display = 'none';
        inpHeroe.style.display = 'inherit';
    } else {
        inpHeroe.style.display = 'none';
        inpVillano.style.display = 'inherit';
    }
});

function BuscarPersona(id) {
    let index = -1;
    for (let i = 0; i < arrayPersonas.length; i++) {
        let persona = arrayPersonas[i];
        if (persona.id == id) {
            index = i;
            break;
        }
    }

    return index;
}

function CamposValidosHeroe() {
    let nombre = document.querySelector('.formInputs #inp_nombre').value;
    let apellido = document.querySelector('.formInputs #inp_apellido').value;
    let edad = document.querySelector('.formInputs #inp_edad').value;

    let alterego = document.querySelector('.formInputs #inp_alterego').value;
    let ciudad = document.querySelector('.formInputs #inp_ciudad').value;
    let publicado = document.querySelector('.formInputs #inp_publicado').value;

    return nombre.trim() != '' && apellido.trim() != '' && parseInt(edad) >= 16 && alterego.trim() != ''
        && ciudad.trim() != '' && parseInt(publicado) > 1940 && parseInt(publicado) <= 2022;
}

function CamposValidosVillano() {
    let nombre = document.querySelector('.formInputs #inp_nombre').value;
    let apellido = document.querySelector('.formInputs #inp_apellido').value;
    let edad = document.querySelector('.formInputs #inp_edad').value;

    let enemigo = document.querySelector('.formInputs #inp_enemigo').value;
    let robos = document.querySelector('.formInputs #inp_robos').value;
    let asesinatos = document.querySelector('.formInputs #inp_asesinatos').value;

    return nombre.trim() != '' && apellido.trim() != '' && parseInt(edad) >= 16 &&
        enemigo.trim() != '' && parseInt(robos) > 0 && parseInt(asesinatos) > 0;
}

function AbrirABM() {
    formPpal.style.display = 'none';
    formABM.style.display = 'flex';
}

function CerrarABM() {
    formABM.style.display = 'none';
    formPpal.style.display = 'flex';

    document.querySelector('.formInputs #inp_id').value = '';
    document.querySelector('.formInputs #inp_nombre').value = '';
    document.querySelector('.formInputs #inp_apellido').value = '';
    document.querySelector('.formInputs #inp_edad').value = '';
    document.querySelector('.formInputs #inp_alterego').value = '';
    document.querySelector('.formInputs #inp_ciudad').value = '';
    document.querySelector('.formInputs #inp_publicado').value = '';
    document.querySelector('.formInputs #inp_enemigo').value = '';
    document.querySelector('.formInputs #inp_robos').value = '';
    document.querySelector('.formInputs #inp_asesinatos').value = '';

    MapeoDePersonas(select_tipo.value);
}

function CrearIdUnico() {
    let id = 0;
    do{
        id++;
    }while(BuscarPersona(id) != -1);

    return id;
}
//#endregion

//#region Ordenamiento de tabla
col_id.addEventListener('click', (e) => {
    arrayPersonas.sort((p1, p2) => CompararValores(p1.id, p2.id));
    MapeoDePersonas(select_tipo.value);
});
col_nombre.addEventListener('click', () => {
    arrayPersonas.sort((p1, p2) => CompararValores(p1.nombre, p2.nombre));
    MapeoDePersonas(select_tipo.value);
});
col_apellido.addEventListener('click', () => {
    arrayPersonas.sort((p1, p2) => CompararValores(p1.apellido, p2.apellido));
    MapeoDePersonas(select_tipo.value);
});
col_edad.addEventListener('click', () => {
    arrayPersonas.sort((p1, p2) => CompararValores(p1.edad, p2.edad));
    MapeoDePersonas(select_tipo.value);
});
col_alterego.addEventListener('click', () => {
    arrayPersonas.sort((p1, p2) => CompararValores(p1.alterego, p2.alterego));
    MapeoDePersonas(select_tipo.value);
});
col_ciudad.addEventListener('click', () => {
    arrayPersonas.sort((p1, p2) => CompararValores(p1.ciudad, p2.ciudad));
    MapeoDePersonas(select_tipo.value);
});
col_publicado.addEventListener('click', () => {
    arrayPersonas.sort((p1, p2) => CompararValores(p1.publicado, p2.publicado));
    MapeoDePersonas(select_tipo.value);
});
col_enemigo.addEventListener('click', () => {
    arrayPersonas.sort((p1, p2) => CompararValores(p1.enemigo, p2.enemigo));
    MapeoDePersonas(select_tipo.value);
});
col_robos.addEventListener('click', () => {
    arrayPersonas.sort((p1, p2) => CompararValores(p1.robos, p2.robos));
    MapeoDePersonas(select_tipo.value);
});
col_asesinatos.addEventListener('click', () => {
    arrayPersonas.sort((p1, p2) => CompararValores(p1.asesinatos, p2.asesinatos));
    MapeoDePersonas(select_tipo.value);
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
arrayCheckBoxes.push(ckBx_id, ckBx_nombre, ckBx_apellido, ckBx_edad, ckBx_alterego, ckBx_ciudad, ckBx_publicado, ckBx_enemigo, ckBx_robos, ckBx_asesinatos);

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
    
    celdasCuerpo.forEach(fila =>{
        chBx.checked ? fila.childNodes[indexColumna].style.removeProperty('display') : fila.childNodes[indexColumna].style.display='none';
    });
    
    chBx.checked ? cabeceraSeleccionada.style.removeProperty('display') : cabeceraSeleccionada.style.display='none';
}
//#endregion

Iniciar();
