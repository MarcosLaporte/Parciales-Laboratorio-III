// const btnAgregar = document.querySelector('#agregar');
let btnAgregar = document.getElementById('agregar');
let selTipo = document.getElementById('selTipo');
let inpHeroe = document.querySelector('.inputHeroe');
let inpVillano = document.querySelector('.inputVillano');

let filtro = document.getElementById('filtro');
let filasTabla = document.getElementById('fuenteFilas');
let filaId = document.querySelector('#colFiltro_id #id');
let filaNombre = document.querySelector('#colFiltro_nombre #nombre');
let filaApellido = document.querySelector('#colFiltro_apellido #apellido');
let filaEdad = document.querySelector('#colFiltro_edad #edad');
let filaAlterego = document.querySelector('#colFiltro_alterego #alterego');
let filaCiudad = document.querySelector('#colFiltro_ciudad #ciudad');
let filaPublicado = document.querySelector('#colFiltro_publicado #publicado');
let filaEnemigo = document.querySelector('#colFiltro_enemigo #enemigo');
let filaRobos = document.querySelector('#colFiltro_robos #robos');
let filaAsesinatos = document.querySelector('#colFiltro_asesinatos #asesinatos');

let btnAlta = document.getElementById('alta');
let btnModificar = document.getElementById('modificar');
let btnBaja = document.getElementById('eliminar');
let btnCancelar = document.getElementById('cancelar');
let frmABM = document.querySelector('.formABM');
let frmPpal = document.querySelector('.formPpal');

//Carga de datos a la tabla
var personas = [];
const datosString = '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis", "publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica", "publicado":2012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central", "publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500, "asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750, "asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25, "asesinatos":1}]';
function Leer() {
    for (let persona of JSON.parse(datosString)) {
        if (persona.hasOwnProperty("id") && persona.hasOwnProperty("nombre")
            && persona.hasOwnProperty("apellido") && persona.hasOwnProperty("edad")) {
            if (persona.hasOwnProperty("alterego")) {
                let heroe = new Heroe(persona.id, persona.nombre, persona.apellido, persona.edad, persona.alterego, persona.ciudad, persona.publicado);
                personas.push(heroe);
            } else if (persona.hasOwnProperty("enemigo")) {
                let villano = new Villano(persona.id, persona.nombre, persona.apellido, persona.edad, persona.enemigo, persona.robos, persona.asesinatos);
                personas.push(villano);
            }
        }
    }
}

function Cargar(p) {
    filasTabla.innerHTML += "<tr>" +
        `<td class="col_id">${p.id}</td>` +
        `<td class="col_nombre">${p.nombre}</td>` +
        `<td class="col_apellido">${p.apellido}</td>` +
        `<td class="col_edad">${p.edad}</td>` +
        `<td class="col_alterego">${p.alterego!=undefined?p.alterego:"-"}</td>` +
        `<td class="col_ciudad">${p.ciudad!=undefined?p.ciudad:"-"}</td>` +
        `<td class="col_publicado">${p.publicado!=undefined?p.publicado:"-"}</td>` +
        `<td class="col_enemigo">${p.enemigo!=undefined?p.enemigo:"-"}</td>` +
        `<td class="col_robos">${p.robos!=undefined?p.robos:"-"}</td>` +
        `<td class="col_asesinatos">${p.asesinatos!=undefined?p.asesinatos:"-"}</td>`
        + "</tr>";
}


function MapeoDePersonas(filtro){
    personas.map((a) => {
        switch (filtro) {
            case 'T':
                Cargar(a);
                break;
                case 'H':
                    if (a.alterego != NULL && a.ciudad != NULL && a.publicado < 1940) {
                        Cargar(a);
                    }
                    break;
                    case 'V':
                        if (a.enemigo != NULL && a.robos > 0 && a.asesinatos > 0) {
                            Cargar(a);
                        }
            break;
        }
    })
}

function Iniciar() {
    Leer();
    MapeoDePersonas(filtro.value);
}

filtro.addEventListener('change', () => {
    MapeoDePersonas(filtro.value);
});


//Form ABM

btnAgregar.onclick = function () {
    if (frmABM.style.display == 'inherit') {
        frmABM.style.display = 'none';
        frmPpal.style.display = 'inherit';
    } else {
        frmPpal.style.display = 'none';
        frmABM.style.display = 'inherit';
    }
}

frmABM.addEventListener('change', () => {
    if (selTipo.value == 'V') {
        inpHeroe.style.display = 'none';
        inpVillano.style.display = 'inherit';
    } else {
        inpHeroe.style.display = 'inherit';
        inpVillano.style.display = 'none';
    }
});

// btnAlta.addEventListener('click', () => {

// });
btnCancelar.addEventListener('click', () => { btnAgregar.click() });

Iniciar();