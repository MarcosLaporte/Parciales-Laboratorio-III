const formPpal = document.getElementById('formPpal');

//#region Constantes Tabla
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
const abmAceptar = document.getElementById('aceptar');
const abmCancelar = document.getElementById('cancelar');

let abmId;
let abmNombre;
let abmApellido;
let abmEdad;
let abmAlterego;
let abmCiudad;
let abmPublicado;
let abmEnemigo;
let abmRobos;
let abmAsesinatos;
//#endregion

//Carga de datos a la tabla
var arrayPersonas = [];
const datosString = '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis","publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica","publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central","publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,"asesinatos":1}]';
// const datosString = '[]';

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
	cuerpoTabla.innerHTML = "";

	personas.forEach(persona => {
		let auxElementos = [persona.id, persona.nombre, persona.apellido, persona.edad, persona.alterego, persona.ciudad, persona.publicado, persona.enemigo, persona.robos, persona.asesinatos];
		let nuevaFila = document.createElement("tr");
		nuevaFila.id = persona.id;

		let celda;
		auxElementos.forEach(element => {
			let auxElement = element ? element.toString() : "N/A";
			celda = document.createElement("td");
			celda.className = nuevaFila.id;
			celda.id = `pers${auxElementos[0]}Val${auxElement}`;
			celda.textContent = auxElement;
			nuevaFila.appendChild(celda);
		});

		let botones = ["Modificar", "Eliminar"];
		botones.forEach(btnStr => {
			let input = document.createElement("input");
			input.type = "button";
			input.id = btnStr + 'Pers' + persona.id;
			input.value = btnStr;

			// let funcion = btnStr == "Modificar" ? AbmModificar : AbmModificar;
			// input.addEventListener('click', funcion);
			input.addEventListener('click', AbmModifElim);

			celda = document.createElement("td");
			celda.appendChild(input);
			nuevaFila.appendChild(celda);
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
	// MapeoDePersonas(select_tipo.value);
	Cargar(arrayPersonas);
}

//#region Form ABM

btnAgregar.onclick = function () {
	AbrirABM();
	abm_tipo.style.display = 'inherit';
	abmAceptar.innerText = 'Alta';

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

function AbmModifElim(event) {
	let idFila = event.target.parentNode.parentNode.id;
	let indexPersona = BuscarPersona(idFila);
	let personaSeleccionada = indexPersona != -1 ? arrayPersonas[indexPersona] : null;

	if (personaSeleccionada) {
		AbrirABM();

		abm_tipo.style.display = 'none';
		abmAceptar.innerText = event.target.value;

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
	} else {
		alert("Hubo un problema!");
	}

	abmAceptar.innerText == 'Eliminar' ? BloquearInputs(true) : BloquearInputs(false);

}

function BloquearInputs(estado) {
	document.querySelector('.formInputs #inp_nombre').readOnly = estado;
	document.querySelector('.formInputs #inp_apellido').readOnly = estado;
	document.querySelector('.formInputs #inp_edad').readOnly = estado;
	document.querySelector('.formInputs #inp_alterego').readOnly = estado;
	document.querySelector('.formInputs #inp_ciudad').readOnly = estado;
	document.querySelector('.formInputs #inp_publicado').readOnly = estado;
	document.querySelector('.formInputs #inp_enemigo').readOnly = estado;
	document.querySelector('.formInputs #inp_robos').readOnly = estado;
	document.querySelector('.formInputs #inp_asesinatos').readOnly = estado;
};

abmAceptar.onclick = function () {
	abmId = document.querySelector('.formInputs #inp_id').value;
	abmNombre = document.querySelector('.formInputs #inp_nombre').value;
	abmApellido = document.querySelector('.formInputs #inp_apellido').value;
	abmEdad = document.querySelector('.formInputs #inp_edad').value;

	abmAlterego = document.querySelector('.formInputs #inp_alterego').value;
	abmCiudad = document.querySelector('.formInputs #inp_ciudad').value;
	abmPublicado = document.querySelector('.formInputs #inp_publicado').value;

	abmEnemigo = document.querySelector('.formInputs #inp_enemigo').value;
	abmRobos = document.querySelector('.formInputs #inp_robos').value;
	abmAsesinatos = document.querySelector('.formInputs #inp_asesinatos').value;

	let auxPersonas = arrayPersonas;

	if (abmAceptar.innerText == 'Agregar') {
		if (abmSel_tipo.value === 'H') {
			!CamposValidosHeroe() ? alert("Revise los campos!") : () => {
				let heroe = new Heroe(CrearIdUnico(), abmNombre, abmApellido, abmEdad, abmAlterego, abmCiudad, abmPublicado);
				heroe.HeroeExiste(auxPersonas) ? alert("Este héroe ya existe!") : auxPersonas.push(heroe);
				CerrarABM();
			}
		} else if (abmSel_tipo.value === 'V') {
			!CamposValidosVillano() ? alert("Revise los campos!") : () => {
				let villano = new Villano(CrearIdUnico(), abmNombre, abmApellido, abmEdad, abmEnemigo, abmRobos, abmAsesinatos);
				villano.VillanoExiste(auxPersonas) ? alert("Este villano ya existe!") : auxPersonas.push(villano);
				CerrarABM();
			}
		}
	} else {
		let index = BuscarPersona(abmId);

		if (abmAceptar.innerText == 'Modificar') {
			ModificarPersona(auxPersonas[index]);
		} else {
			auxPersonas.splice(index, 1);
			CerrarABM();
		}
	}

	arrayPersonas = auxPersonas;

}

function ModificarPersona(persona) {
	persona.nombre = abmNombre;
	persona.apellido = abmApellido;
	persona.edad = parseInt(abmEdad);

	if (persona instanceof Heroe && CamposValidosHeroe() ||
		persona instanceof Villano && CamposValidosVillano()) {
		persona.alterego = abmAlterego;
		persona.ciudad = abmCiudad;
		persona.publicado = parseInt(abmPublicado);
		persona.enemigo = abmEnemigo;
		persona.robos = parseInt(abmRobos);
		persona.asesinatos = parseInt(abmAsesinatos);
		CerrarABM();
		return persona;
	} else {
		alert("Revise los campos!");
	}
}

abmCancelar.onclick = CerrarABM;

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

	return nombre.trim() && apellido.trim() && parseInt(edad) >= 16 && alterego.trim()
		&& ciudad.trim() && parseInt(publicado) > 1940 && parseInt(publicado) <= 2022;
}

function CamposValidosVillano() {
	let nombre = document.querySelector('.formInputs #inp_nombre').value;
	let apellido = document.querySelector('.formInputs #inp_apellido').value;
	let edad = document.querySelector('.formInputs #inp_edad').value;

	let enemigo = document.querySelector('.formInputs #inp_enemigo').value;
	let robos = document.querySelector('.formInputs #inp_robos').value;
	let asesinatos = document.querySelector('.formInputs #inp_asesinatos').value;

	return nombre.trim() && apellido.trim() && parseInt(edad) >= 16 &&
		enemigo.trim() && parseInt(robos) > 0 && parseInt(asesinatos) > 0;
}

function AbrirABM() {
	formPpal.style.display = 'none';
	formABM.style.display = 'flex';
	BloquearInputs(false);
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

	// MapeoDePersonas(select_tipo.value);
	Cargar(arrayPersonas);
}

function CrearIdUnico() {
	let id = 0;
	do {
		id++;
	} while (BuscarPersona(id) != -1);

	return id;
}
//#endregion

Iniciar();
