const frmPpal = document.querySelector('.formPpal');
const numEdadProm = document.querySelector('.edadPromedio #edadPromedio');
const btnEdadProm = document.querySelector('.edadPromedio #promediarEdad');

//#region Constantes Tabla
const filtroTabla = document.getElementById('filtro');
/* Checkboxes */
const cbId = document.querySelector('.filtroColumnas #id');
const cbNombre = document.querySelector('.filtroColumnas #nombre');
const cbApellido = document.querySelector('.filtroColumnas #apellido');
const cbEdad = document.querySelector('.filtroColumnas #edad');
const cbAlterego = document.querySelector('.filtroColumnas #alterego');
const cbCiudad = document.querySelector('.filtroColumnas #ciudad');
const cbPublicado = document.querySelector('.filtroColumnas #publicado');
const cbEnemigo = document.querySelector('.filtroColumnas #enemigo');
const cbRobos = document.querySelector('.filtroColumnas #robos');
const cbAsesinatos = document.querySelector('.filtroColumnas #asesinatos');
/* Columnas */
const cuerpoTabla = document.getElementById('fuenteCuerpo');
const colId = document.querySelector('.col_id');
const colNombre = document.querySelector('.col_nombre');
const colApellido = document.querySelector('.col_apellido');
const colEdad = document.querySelector('.col_edad');
const colAlterego = document.querySelector('.col_alterego');
const colCiudad = document.querySelector('.col_ciudad');
const colPublicado = document.querySelector('.col_publicado');
const colEnemigo = document.querySelector('.col_enemigo');
const colRobos = document.querySelector('.col_robos');
const colAsesinatos = document.querySelector('.col_asesinatos');
/* Filas */
const filTabla = document.querySelector('#tabla .fila');
//#endregion

//#region Constantes Formulario ABM
const frmABM = document.querySelector('.formABM');
const btnAgregar = document.getElementById('agregar');
const selTipo = document.getElementById('selTipo');
/*Inputs*/
const abm_id = document.querySelector('.formInputs #inp_id');
const abm_nombre = document.querySelector('.formInputs #inp_nombre');
const abm_apellido = document.querySelector('.formInputs #inp_apellido');
const abm_edad = document.querySelector('.formInputs #inp_edad');
const abm_tipo = document.querySelector('.formInputs #inp_tipo');
    const inpHeroe = document.querySelector('.formInputs .inputHeroe');
        const abm_alterego = document.querySelector('.formInputs #inp_alterego');
        const abm_ciudad = document.querySelector('.formInputs #inp_ciudad');
        const abm_publicado = document.querySelector('.formInputs #inp_publicado');
    const inpVillano = document.querySelector('.formInputs .inputVillano');
        const abm_enemigo = document.querySelector('.formInputs #inp_enemigo');
        const abm_robos = document.querySelector('.formInputs #inp_robos');
        const abm_asesinatos = document.querySelector('.formInputs #inp_asesinatos');
/*Botones*/
const btnAlta = document.getElementById('alta');
const btnModificar = document.getElementById('modificar');
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

function Cargar(p) {
    cuerpoTabla.innerHTML +=
    "<tr class='fila'>" +
        `${cbId.checked ? `<td class="col_id" id="celda"> ${p.id}</td>` : ''}
        ${cbNombre.checked ? `<td class="col_nombre" id="celda">${p.nombre}</td>` : ''}
        ${cbApellido.checked ? `<td class="col_apellido" id="celda">${p.apellido}</td>` : ''}
        ${cbEdad.checked ? `<td class="col_edad" id="celda">${p.edad}</td>` : ''}
        ${cbAlterego.checked ? `<td class="col_alterego" id="celda">${p.alterego != undefined ? p.alterego : "-"}</td>` : ''}
        ${cbCiudad.checked ? `<td class="col_ciudad" id="celda">${p.ciudad != undefined ? p.ciudad : "-"}</td>` : ''}
        ${cbPublicado.checked ? `<td class="col_publicado" id="celda">${p.publicado != undefined ? p.publicado : "-"}</td>` : ''}
        ${cbEnemigo.checked ? `<td class="col_enemigo" id="celda">${p.enemigo != undefined ? p.enemigo : "-"}</td>` : ''}
        ${cbRobos.checked ? `<td class="col_robos" id="celda">${p.robos != undefined ? p.robos : "-"}</td>` : ''}
        ${cbAsesinatos.checked ? `<td class="col_asesinatos" id="celda">${p.asesinatos != undefined ? p.asesinatos : "-"}</td>` : ''}`
    + "</tr>";
}

function MapeoDePersonas(filtro) {
    cuerpoTabla.innerHTML = "";
    arrayPersonas.map((a) => {
        switch (filtro) {
            case 'T':
                Cargar(a);
                break;
            case 'H':
                if (a.alterego != undefined && a.ciudad != undefined && a.publicado > 1940 && a.publicado < 2022) {
                    Cargar(a);
                }
                break;
            case 'V':
                if (a.enemigo != undefined && a.robos > 0 && a.asesinatos > 0) {
                    Cargar(a);
                }
                break;
        }
    })
}

function Iniciar() {
    Leer();
    MapeoDePersonas(filtroTabla.value);
}

filtroTabla.addEventListener('change', () => {
    MapeoDePersonas(filtroTabla.value);
});

//#region Edad Promedio
function CalcularEdadPromedio() {
    acumulador = 0;
    arrayFiltrado = arrayPersonas.filter((persona) => {
        switch (filtroTabla.value) {
            case 'T':
                return true;
            case 'H':
                return (persona instanceof (Heroe))
            case 'V':
                return (persona instanceof (Villano))
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
    frmPpal.style.display = 'none';
    frmABM.style.display = 'inherit';
}

// filTabla.addEventListener('dblclick', (e) => { console.log(e.currentTarget);});
document.querySelector(".col_id").addEventListener('dblclick', (e) => { console.log(e.currentTarget);});

/*cuerpoTabla. addEventListener('dblclick', () => {
    frmPpal.style.display = 'none';
    frmABM.style.display = 'inherit';

    for (let i = 0; i < cuerpoTabla.rows.length; i++) {
        for (let j = 0; j < cuerpoTabla.rows[i].cells.length; j++) {
            // console.log(`I:${i} J:${j}`);

        }
    }
    /* let id = ;
    let nombre = ;
    let apellido = ;
    let edad = ;
    let alterego = ;
    let ciudad = ;
    let publicado = ;
    let enemigo = ;
    let robos = ;
    let asesinatos = ;
}); */

abm_tipo.addEventListener('change', () => {
    if (selTipo.value == 'V') {
        inpHeroe.style.display = 'none';
        inpVillano.style.display = 'inherit';
    } else {
        inpHeroe.style.display = 'inherit';
        inpVillano.style.display = 'none';
    }
});

btnCancelar.addEventListener('click', () => {
    frmABM.style.display = 'none';
    frmPpal.style.display = 'inherit';
});
//#endregion
 
//#region  Filtro de columnas
cbId.addEventListener('change', () => {
    if(!cbId.checked){
        colId.style.display = "none";
    }else{
        colId.style.removeProperty('display');
    }
    MapeoDePersonas(filtroTabla.value);
});

cbNombre.addEventListener('change', () => {
    if(!cbNombre.checked){
        colNombre.style.display = "none";
    }else{
        colNombre.style.removeProperty('display');
    }
    MapeoDePersonas(filtroTabla.value);
});

cbApellido.addEventListener('change', () => {
    if(!cbApellido.checked){
        colApellido.style.display = "none";
    }else{
        colApellido.style.removeProperty('display');
    }
    MapeoDePersonas(filtroTabla.value);
});

cbEdad.addEventListener('change', () => {
    if(!cbEdad.checked){
        colEdad.style.display = "none";
    }else{
        colEdad.style.removeProperty('display');
    }
    MapeoDePersonas(filtroTabla.value);
});

cbAlterego.addEventListener('change', () => {
    if(!cbAlterego.checked){
        colAlterego.style.display = "none";
    }else{
        colAlterego.style.removeProperty('display');
    }
    MapeoDePersonas(filtroTabla.value);
});

cbCiudad.addEventListener('change', () => {
    if(!cbCiudad.checked){
        colCiudad.style.display = "none";
    }else{
        colCiudad.style.removeProperty('display');
    }
    MapeoDePersonas(filtroTabla.value);
});

cbPublicado.addEventListener('change', () => {
    if(!cbPublicado.checked){
        colPublicado.style.display = "none";
    }else{
        colPublicado.style.removeProperty('display');
    }
    MapeoDePersonas(filtroTabla.value);
});

cbEnemigo.addEventListener('change', () => {
    if(!cbEnemigo.checked){
        colEnemigo.style.display = "none";
    }else{
        colEnemigo.style.removeProperty('display');
    }
    MapeoDePersonas(filtroTabla.value);
});

cbRobos.addEventListener('change', () => {
    if(!cbRobos.checked){
        colRobos.style.display = "none";
    }else{
        colRobos.style.removeProperty('display');
    }
    MapeoDePersonas(filtroTabla.value);
});

cbAsesinatos.addEventListener('change', () => {
    if(!cbAsesinatos.checked){
        colAsesinatos.style.display = "none";
    }else{
        colAsesinatos.style.removeProperty('display');
    }
    MapeoDePersonas(filtroTabla.value);
});
//#endregion

Iniciar();