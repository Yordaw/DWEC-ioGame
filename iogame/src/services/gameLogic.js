//lgica pura del juego sin cosas del DOM
import { PARTIDA, CONFIG, cambiarTurnoState, actualizarPuntosState } from './gameState.js';

//genera un array de números para el juego
export function generarArrayNumeros(tamano) {
  const totalCeldas = tamano * tamano;
  const cantidadPares = totalCeldas / 2;
  
  const arrayNumeros = [];
  for (let i = 0; i < cantidadPares; i++) {
    arrayNumeros.push(i, i);
  }

  return barajarArray(arrayNumeros);
}

//baraja un array usando el algoritmo "fisher-yates". TOTALMENTE CHATGPT porque ni idea de hacer como esto... Y me salian los numero ordenados uno al lado del otro
export function barajarArray(array) {
  const arrayBarajado = [...array];
  
  for (let i = arrayBarajado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayBarajado[i], arrayBarajado[j]] = [arrayBarajado[j], arrayBarajado[i]];
  }
  
  return arrayBarajado;
}

//genera la matriz del juego
export function generarMatrizJuego(tamano) {
  const arrayNumeros = generarArrayNumeros(tamano);
  return convertirAMatriz(arrayNumeros, tamano, tamano);
}

//convierte un array en una matriz porque si lo dejo en array hay que hacer calculos dificiles para saber donde va cada cosa. 
export function convertirAMatriz(arrayNumeros, filas, columnas) {
  const matriz = [];
  let indice = 0;
  
  for (let i = 0; i < filas; i++) {
    const fila = [];
    for (let j = 0; j < columnas; j++) {
      fila.push(arrayNumeros[indice]);
      indice++;
    }
    matriz.push(fila);
  }
  
  return matriz;
}

//reinicia las variables del turno
export function resetearTurno() {
  PARTIDA.contador = 1;
  PARTIDA.numUno = null;
  PARTIDA.numDos = null;
}

//cambia el turno al otro jugador
export function cambiarTurno() {
  const nuevoTurno = PARTIDA.turno === 1 ? 2 : 1;
  cambiarTurnoState(nuevoTurno);
}

//procesa el primer click del turno
export function procesarPrimerClick(flipContainer, i, j) {
  PARTIDA.numUno = flipContainer;
  PARTIDA.tempI = i;
  PARTIDA.tempJ = j;
  PARTIDA.contador++;
}

//procesa el segundo click y verifica si acierta o falla
export function procesarSegundoClick(flipContainer, i, j) {
  PARTIDA.numDos = flipContainer;
  PARTIDA.contador++;

  const valorUno = PARTIDA.numUno.querySelector('.flip-back .textoCeldas').textContent;
  const valorDos = PARTIDA.numDos.querySelector('.flip-back .textoCeldas').textContent;

  if (PARTIDA.numUno === PARTIDA.numDos) {
    return false; //click doble en la misma celda
  }

  return valorUno === valorDos;
}

//maneja el caso cuando el jugador acierta
export function manejarAcierto(i, j) {
  const marcador = PARTIDA.turno === 1 ? 'X' : 'O';
  PARTIDA.matriz[i][j] = marcador;
  PARTIDA.matriz[PARTIDA.tempI][PARTIDA.tempJ] = marcador;

  if (PARTIDA.turno === 1) {
    PARTIDA.puntosPlayer1++;
  } else {
    PARTIDA.puntosPlayer2++;
  }

  actualizarPuntosState(PARTIDA.puntosPlayer1, PARTIDA.puntosPlayer2);
  bloquearCelda(PARTIDA.numUno);
  bloquearCelda(PARTIDA.numDos);

  return verificarFinJuego();
}

//bloquea una celda para que no se pueda clikear
export function bloquearCelda(celda) {
  celda.dataset.locked = 'true';
  celda.classList.add('locked');
}

//verifica si el juego ha terminado
export function verificarFinJuego() {
  const puntosTotal = PARTIDA.puntosPlayer1 + PARTIDA.puntosPlayer2;
  const maxPuntos = (PARTIDA.tamanoSeleccionado * PARTIDA.tamanoSeleccionado) / 2;
  
  return puntosTotal >= maxPuntos;
}

//obtiene el ganador del juego
export function obtenerGanador() {
  if (PARTIDA.puntosPlayer1 > PARTIDA.puntosPlayer2) {
    return { ganador: 1, puntos1: PARTIDA.puntosPlayer1, puntos2: PARTIDA.puntosPlayer2 };
  } else if (PARTIDA.puntosPlayer2 > PARTIDA.puntosPlayer1) {
    return { ganador: 2, puntos1: PARTIDA.puntosPlayer1, puntos2: PARTIDA.puntosPlayer2 };
  } else {
    return { ganador: 0, puntos1: PARTIDA.puntosPlayer1, puntos2: PARTIDA.puntosPlayer2 };
  }
}
