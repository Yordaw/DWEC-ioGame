//gestiona el estado global del juego
import { Observable } from './Observable.js';

//configuración del juego para no tener que ir modificando en cada función. Lo he visto de Stack Overflow y me ha gustado
export const CONFIG = {
  TIEMPO_MOSTRAR_CELDAS: 2500,
  TIEMPO_VOLTEAR_FALLO: 500
};

//tamaños del tablero disponibles. También visto en el stack overflow 
export const TAMAÑOS = {
  FACIL: { 
    valor: 4, 
    nombre: 'Fácil', 
    descripcion: '4x4 (8 pares)' 
  },
  MEDIO: { 
    valor: 6, 
    nombre: 'Medio', 
    descripcion: '6x6 (18 pares)' 
  },
  DIFICIL: { 
    valor: 8, 
    nombre: 'Difícil', 
    descripcion: '8x8 (32 pares)' 
  }
};

//observable para notificar cambios de puntos
export const puntosObservable = new Observable({
  player1: 0,
  player2: 0
});

//observable para notificar cambios de turno
export const turnoObservable = new Observable(1);

//objeto que guarda el estado de la partida actual. Antes eran variables globales
export const PARTIDA = {
  turno: 1,
  contador: 1,
  numUno: null,
  numDos: null,
  tempI: null,
  tempJ: null,
  puntosPlayer1: 0,
  puntosPlayer2: 0,
  matriz: [],
  tamanoSeleccionado: null
};

//actualizar puntos y notificar observadores
export function actualizarPuntosState(player1, player2) {
  PARTIDA.puntosPlayer1 = player1;
  PARTIDA.puntosPlayer2 = player2;
  puntosObservable.cambiarValor({ player1, player2 });
}

//cambiar turno y notificar observadores
export function cambiarTurnoState(nuevoTurno) {
  PARTIDA.turno = nuevoTurno;
  turnoObservable.cambiarValor(nuevoTurno);
}

//reiniciar el estado de la partida
export function resetearPartidaState() {
  PARTIDA.turno = 1;
  PARTIDA.contador = 1;
  PARTIDA.numUno = null;
  PARTIDA.numDos = null;
  PARTIDA.tempI = null;
  PARTIDA.tempJ = null;
  PARTIDA.puntosPlayer1 = 0;
  PARTIDA.puntosPlayer2 = 0;
  PARTIDA.matriz = [];
  PARTIDA.tamanoSeleccionado = null;
  
  turnoObservable.cambiarValor(1);
  puntosObservable.cambiarValor({ player1: 0, player2: 0 });
}
