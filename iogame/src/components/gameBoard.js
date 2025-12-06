//tablero del juego como Web Component




import { PARTIDA, CONFIG, puntosObservable, turnoObservable, resetearPartidaState } from '../services/gameState.js';
import { 
  generarMatrizJuego, 
  resetearTurno, 
  procesarPrimerClick, 
  procesarSegundoClick, 
  manejarAcierto, 
  cambiarTurno, 
  verificarFinJuego,
  obtenerGanador 
} from '../services/gameLogic.js';
import {
  crearAreaPuntos,
  crearTableroJugador,
  crearCeldaFlip,
  actualizarGridJuego,
  crearSeleccionDificultad,
  mostrarCeldaTemporalmente,
  actualizarTituloTurno,
  actualizarPuntosUI,
  crearBotonReiniciar
} from '../services/cardRenderer.js';
import { guardarPartidaEnSupabase } from '../services/gamesService.js';

class GameBoard extends HTMLElement {
  constructor() {
    super();
    this.tituloTablero = null;
    this.juegoContainer = null;
    this.dificultadActual = null;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    //limpiar estado anterior
    resetearPartidaState();

    //crear estructura principal
    const areaTablero = document.createElement("div");
    areaTablero.setAttribute('id', 'areaTablero');

    const areaPuntos = crearAreaPuntos();
    const tablero = crearTableroJugador();

    areaTablero.append(areaPuntos, tablero);

    this.juegoContainer = tablero.querySelector('.juego');
    this.tituloTablero = tablero.querySelector('#tituloTablero1');

    //mostrar selección de dificultad
    this.mostrarSeleccionDificultad();

    //limpiar contenido anterior y agregar nuevo
    this.innerHTML = '';
    this.appendChild(areaTablero);

    //suscribirse a cambios de observables
    this.suscribirseAObservables();
  }

  mostrarSeleccionDificultad() {
    const seleccionDificultad = crearSeleccionDificultad((config) => {
      if (this.confirmarJuego()) {
        this.dificultadActual = config.valor;
        this.iniciarJuego(config.valor);
      }
    });

    this.tituloTablero.innerHTML = 'Selecciona Dificultad';
    this.juegoContainer.innerHTML = '';
    this.juegoContainer.appendChild(seleccionDificultad);
  }

  iniciarJuego(tamano) {
    this.juegoContainer.innerHTML = '';
    PARTIDA.tamanoSeleccionado = tamano;
    PARTIDA.matriz = generarMatrizJuego(tamano);
    
    actualizarGridJuego(this.juegoContainer, tamano);
    this.renderizarCeldas();
  }

  renderizarCeldas() {
    actualizarTituloTurno(this.tituloTablero, PARTIDA.turno);

    PARTIDA.matriz.forEach((fila, i) => {
      fila.forEach((valor, j) => {
        if (typeof valor === 'string' && (valor === 'X' || valor === 'O')) {
          return; //si ya está marcado, no crear nueva celda
        }

        const flipContainer = crearCeldaFlip(valor);
        
        setTimeout(() => {
          mostrarCeldaTemporalmente(flipContainer);
        }, 500);

        this.agregarEventoClick(flipContainer, i, j);
        PARTIDA.matriz[i][j] = flipContainer;
        this.juegoContainer.appendChild(flipContainer);
      });
    });
  }

  agregarEventoClick(flipContainer, i, j) {
    flipContainer.addEventListener('click', () => {
      if (flipContainer.dataset.locked === "true") return;

      flipContainer.classList.toggle('flipped');
      this.procesarClick(flipContainer, i, j);
    });
  }

  procesarClick(flipContainer, i, j) {
    if (PARTIDA.contador > 2) {
      resetearTurno();
    }

    if (PARTIDA.contador === 1) {
      procesarPrimerClick(flipContainer, i, j);
    } else if (PARTIDA.contador === 2) {
      const esAcierto = procesarSegundoClick(flipContainer, i, j);

      if (PARTIDA.numUno === PARTIDA.numDos) {
        return; //click doble
      }

      if (esAcierto) {
        this.procesarAcierto(i, j);
      } else {
        this.procesarFallo();
      }
    }
  }

  procesarAcierto(i, j) {
    const finDelJuego = manejarAcierto(i, j);
    
    alert('¡Bien Hecho! +1 punto!');

    if (finDelJuego) {
      this.mostrarFinJuego();
    }
  }

  procesarFallo() {
    setTimeout(() => {
      PARTIDA.numUno.classList.toggle('flipped');
      PARTIDA.numDos.classList.toggle('flipped');
    }, CONFIG.TIEMPO_VOLTEAR_FALLO);

    cambiarTurno();

    setTimeout(() => {
      actualizarTituloTurno(this.tituloTablero, PARTIDA.turno);
    }, CONFIG.TIEMPO_VOLTEAR_FALLO);
  }

  mostrarFinJuego() {
    const resultado = obtenerGanador();
    let mensaje = '';

    if (resultado.ganador === 0) {
      mensaje = `¡Empate! Ambos con ${resultado.puntos1} puntos`;
    } else {
      mensaje = `¡Player ${resultado.ganador} ha ganado! (${resultado.puntos1} vs ${resultado.puntos2})`;
    }

    alert('¡El juego ha acabado!\n' + mensaje);

    //preguntar si guardar la partida
    if (confirm('¿Quieres guardar esta partida?')) {
      guardarPartidaEnSupabase();
      setTimeout(() => {
        this.mostrarOpcionesFinales();
      }, 500);
    } else {
      this.mostrarOpcionesFinales();
    }
  }

  mostrarOpcionesFinales() {
    //limpiar el tablero
    this.juegoContainer.innerHTML = '';
    
    //crear botones de reinicio y volver
    const contenedor = document.createElement('div');
    contenedor.setAttribute('class', 'contenedor-finales');
    
    const btnReiniciar = crearBotonReiniciar(() => {
      this.reiniciarJuegoMismaDificultad();
    });
    
    const btnVolver = document.createElement('button');
    btnVolver.setAttribute('class', 'btn btn-secondary btn-lg');
    btnVolver.innerHTML = 'Volver al Menu';
    btnVolver.addEventListener('click', () => {
      window.location.hash = '#';
    });
    
    contenedor.append(btnReiniciar, btnVolver);
    this.juegoContainer.appendChild(contenedor);
    this.tituloTablero.innerHTML = 'Juego Finalizado';
  }

  reiniciarJuegoMismaDificultad() {
    if (this.dificultadActual) {
      this.render();
      this.juegoContainer.innerHTML = '';
      PARTIDA.tamanoSeleccionado = this.dificultadActual;
      PARTIDA.matriz = generarMatrizJuego(this.dificultadActual);
      
      actualizarGridJuego(this.juegoContainer, this.dificultadActual);
      this.renderizarCeldas();
    }
  }

  confirmarJuego() {
    const respuesta = confirm('¿Confirmar inicio del juego?');
    
    if (!respuesta) {
      window.location.hash = '#';
      return false;
    }
    
    return true;
  }

  suscribirseAObservables() {
    //observable de puntos
    puntosObservable.suscribirse((puntos) => {
      actualizarPuntosUI(puntos.player1, puntos.player2);
    });

    //observable de turno
    turnoObservable.suscribirse((turno) => {
      if (this.tituloTablero) {
        actualizarTituloTurno(this.tituloTablero, turno);
      }
    });
  }
}

//registrar el Web Component
customElements.define('game-board', GameBoard);

export { GameBoard };
