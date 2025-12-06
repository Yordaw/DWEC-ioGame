//renderizado de cartas, tablero y elementos del DOM con aspecto

import { CONFIG, TAMAÑOS } from './gameState.js';

//crea una celda flip (carta o tarjeta o como se llame)
export function crearCeldaFlip(valor) {
  const flipContainer = document.createElement("div");
  flipContainer.setAttribute('class', 'flip-container');

  const flipCard = document.createElement("div");
  flipCard.setAttribute('class', 'flip-card');

  const flipFront = crearCaraFlip('flip-front', '?');
  const flipBack = crearCaraFlip('flip-back', valor);

  flipCard.append(flipFront, flipBack);
  flipContainer.appendChild(flipCard);

  return flipContainer;
}

//crea una cara de la carta flip
export function crearCaraFlip(clase, contenido) {
  const cara = document.createElement("div");
  cara.setAttribute('class', clase);
  
  const texto = document.createElement("h2");
  texto.setAttribute('class', 'textoCeldas');
  texto.innerHTML = contenido;
  
  cara.appendChild(texto);
  
  return cara;
}

//crea el área de puntos, que será la zona que tiene titulos, etcc dentro
export function crearAreaPuntos() {
  const areaPuntos = document.createElement('div');
  areaPuntos.setAttribute('id', 'areaPuntos');

  const tituloPuntos = document.createElement('h2');
  tituloPuntos.setAttribute('id', 'tituloPuntos');
  tituloPuntos.innerHTML = ' Puntos ';

  const puntos1 = crearElementoPuntos('puntos1', 'Player 1', 0);
  const puntos2 = crearElementoPuntos('puntos2', 'Player 2', 0);

  //boton reset de la partida
  const btnReset = crearBotonReset();

  areaPuntos.append(tituloPuntos, puntos1, puntos2, btnReset);
  
  return areaPuntos;
}

//crea un elemento de puntos para un jugador
export function crearElementoPuntos(id, nombreJugador, puntos) {
  const elementoPuntos = document.createElement("h2");
  elementoPuntos.setAttribute('class', 'puntos');
  elementoPuntos.setAttribute('id', id);
  elementoPuntos.innerHTML = `${nombreJugador}: ${puntos}`;
  
  return elementoPuntos;
}

//crea el tablero del jugador
export function crearTableroJugador() {
  const tablero = document.createElement("div");
  tablero.setAttribute('class', 'tablero');
  tablero.setAttribute('id', 'tablUno');

  const tituloTablero1 = document.createElement("h2");
  tituloTablero1.setAttribute('id', 'tituloTablero1');
  tituloTablero1.innerHTML = `Player 1`;

  const juego1 = document.createElement("div");
  juego1.setAttribute('class', 'juego');

  tablero.append(tituloTablero1, juego1);
  
  return tablero;
}

//actualiza el grid css del contenedor dependiendo del tamaño. Antes utilizaba uno aspecto universal pero quedaba mal visiualmente
export function actualizarGridJuego(contenedor, tamano) {
  contenedor.classList.remove('grid-4', 'grid-6', 'grid-8');
  contenedor.classList.add(`grid-${tamano}`);
}

//crea un botón para selección de dificultad
export function crearBotonDificultad(config, callback) {
  const boton = document.createElement('button');
  boton.setAttribute('class', 'boton-dificultad');
  
  const nombreDificultad = document.createElement('div');
  nombreDificultad.setAttribute('class', 'nombre-dificultad');
  nombreDificultad.innerHTML = config.nombre;
  
  const descripcionDificultad = document.createElement('div');
  descripcionDificultad.setAttribute('class', 'descripcion-dificultad');
  descripcionDificultad.innerHTML = config.descripcion;
  
  boton.append(nombreDificultad, descripcionDificultad);
  boton.addEventListener('click', callback);

  return boton;
}

//crea la pantalla de selección de dificultad
export function crearSeleccionDificultad(onDificultadSeleccionada) {
  const contenedorBotones = document.createElement('div');
  contenedorBotones.setAttribute('class', 'contenedor-dificultad');

  Object.values(TAMAÑOS).forEach((config) => {
    const boton = crearBotonDificultad(config, () => onDificultadSeleccionada(config));
    contenedorBotones.appendChild(boton);
  });

  return contenedorBotones;
}

//muestra celdas temporalmente al inicio del juego para poder ver y acordarse
export function mostrarCeldaTemporalmente(flipContainer) {
  flipContainer.classList.toggle('flipped');
  
  setTimeout(() => {
    flipContainer.classList.toggle('flipped');
  }, CONFIG.TIEMPO_MOSTRAR_CELDAS);
}

//actualiza el título del turno
export function actualizarTituloTurno(tituloElement, turnoActual) {
  tituloElement.innerHTML = `Player ${turnoActual}`;
}

//actualiza los puntos
export function actualizarPuntosUI(puntos1, puntos2) {
  const element1 = document.querySelector('#puntos1');
  const element2 = document.querySelector('#puntos2');

  if (element1) element1.innerHTML = `Player 1: ${puntos1}`;
  if (element2) element2.innerHTML = `Player 2: ${puntos2}`;
}

//boton reset de la partida. Este es el que esta debajo de los puntos para resetear la partida y los numeros.
export function crearBotonReset() {
  const boton = document.createElement('button');
  boton.setAttribute('class', 'btn btn-danger btn-lg');
  boton.setAttribute('id', 'btnReset');
  boton.innerHTML = 'Reset';
  return boton;
}

//crea botón reiniciar. Este sale al final de una partida, cuando se gana.
export function crearBotonReiniciar(callback) {
  const boton = document.createElement('button');
  boton.setAttribute('class', 'btn btn-warning btn-lg');
  boton.setAttribute('id', 'btnResetFinJuego');
  boton.innerHTML = 'Reiniciar';
  boton.addEventListener('click', callback);
  return boton;
}
