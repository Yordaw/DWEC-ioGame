export { renderContentForOne };

// ==========================================
// OBJETO PARTIDA - Centraliza el estado del juego
// ==========================================
const PARTIDA = {
  turno: 1,
  contador: 1,
  numUno: null,
  numDos: null,
  tempI: null,
  tempJ: null,
  puntosPlayer1: 0,
  puntosPlayer2: 0,
  matriz: [],
  tamanoSeleccionado: null // Nuevo: guarda el tamaño elegido
};

// ==========================================
// CONSTANTES DEL JUEGO
// ==========================================
const CONFIG = {
  TIEMPO_MOSTRAR_CELDAS: 2500,
  TIEMPO_VOLTEAR_FALLO: 500
};

// Tamaños disponibles del tablero
const TAMAÑOS = {
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

// ==========================================
// FUNCIÓN PRINCIPAL - Punto de entrada
// ==========================================
function renderContentForOne(titTablero) {
  // Crear el área principal del tablero
  const areaTablero = document.createElement("div");
  areaTablero.setAttribute('id', 'areaTablero');

  // Crear y añadir el área de puntos
  const areaPuntos = crearAreaPuntos();
  
  // Crear y añadir el tablero del jugador
  const tablero = crearTableroJugador();

  // Ensamblar el área del tablero
  areaTablero.append(areaPuntos);
  areaTablero.append(tablero);

  // Mostrar pantalla de selección de dificultad
  const juego1 = tablero.querySelector('.juego');
  const tituloTablero1 = tablero.querySelector('#tituloTablero1');
  
  mostrarSeleccionDificultad(juego1, tituloTablero1);

  return areaTablero;
}

// ==========================================
// FUNCIONES DE SELECCIÓN DE DIFICULTAD
// ==========================================

/**
 * Muestra la pantalla de selección de dificultad
 * @param {HTMLElement} contenedor - Contenedor donde mostrar los botones
 * @param {HTMLElement} tituloTablero - Elemento del título del tablero
 */
function mostrarSeleccionDificultad(contenedor, tituloTablero) {
  // Actualizar título
  tituloTablero.innerHTML = 'Selecciona Dificultad';
  
  // Crear contenedor de botones con clase CSS
  const contenedorBotones = document.createElement('div');
  contenedorBotones.setAttribute('class', 'contenedor-dificultad');

  // Crear botones para cada dificultad
  Object.entries(TAMAÑOS).forEach(([clave, config]) => {
    const boton = crearBotonDificultad(config, contenedor, tituloTablero);
    contenedorBotones.appendChild(boton);
  });

  // Limpiar contenedor y añadir botones
  contenedor.innerHTML = '';
  contenedor.appendChild(contenedorBotones);
}

/**
 * Crea un botón de selección de dificultad
 * @param {Object} config - Configuración del tamaño (valor, nombre, descripción)
 * @param {HTMLElement} contenedor - Contenedor del juego
 * @param {HTMLElement} tituloTablero - Elemento del título
 * @returns {HTMLElement} - Botón de dificultad
 */
function crearBotonDificultad(config, contenedor, tituloTablero) {
  const boton = document.createElement('button');
  boton.setAttribute('class', 'boton-dificultad');
  
  // Crear estructura interna del botón
  const nombreDificultad = document.createElement('div');
  nombreDificultad.setAttribute('class', 'nombre-dificultad');
  nombreDificultad.innerHTML = config.nombre;
  
  const descripcionDificultad = document.createElement('div');
  descripcionDificultad.setAttribute('class', 'descripcion-dificultad');
  descripcionDificultad.innerHTML = config.descripcion;
  
  boton.append(nombreDificultad, descripcionDificultad);

  // Evento click: iniciar juego con el tamaño seleccionado
  boton.addEventListener('click', () => {
    if (comenzarJuego()) {
      PARTIDA.tamanoSeleccionado = config.valor;
      iniciarJuego(contenedor, tituloTablero);
    }
  });

  return boton;
}

/**
 * Inicia el juego con el tamaño seleccionado
 * @param {HTMLElement} contenedor - Contenedor del juego
 * @param {HTMLElement} tituloTablero - Elemento del título
 */
function iniciarJuego(contenedor, tituloTablero) {
  // Limpiar el contenedor
  contenedor.innerHTML = '';

  // Generar la matriz con el tamaño seleccionado
  PARTIDA.matriz = generarMatrizJuego(PARTIDA.tamanoSeleccionado);
  console.table(PARTIDA.matriz); // Para debug en consola
  
  // Actualizar el grid del contenedor según el tamaño
  actualizarGridJuego(contenedor, PARTIDA.tamanoSeleccionado);
  
  // Renderizar las celdas en el DOM
  renderizarCeldas(PARTIDA.matriz, contenedor, tituloTablero);
}

/**
 * Actualiza el grid CSS del contenedor según el tamaño del tablero
 * @param {HTMLElement} contenedor - Contenedor del juego
 * @param {number} tamano - Tamaño del tablero
 */
function actualizarGridJuego(contenedor, tamano) {
  // Añadir clase específica según el tamaño
  contenedor.classList.remove('grid-4', 'grid-6', 'grid-8');
  contenedor.classList.add(`grid-${tamano}`);
}

// ==========================================
// FUNCIONES PURAS DE CREACIÓN DE ELEMENTOS DOM
// ==========================================

/**
 * Crea el área de puntos con sus elementos hijos
 * @returns {HTMLElement} - Elemento DOM del área de puntos
 */
function crearAreaPuntos() {
  const areaPuntos = document.createElement('div');
  areaPuntos.setAttribute('id', 'areaPuntos');

  // Crear título del área de puntos
  const tituloPuntos = document.createElement('h2');
  tituloPuntos.setAttribute('id', 'tituloPuntos');
  tituloPuntos.innerHTML = ' Puntos ';

  // Crear elementos de puntos para cada jugador
  const puntos1 = crearElementoPuntos('puntos1', 'Player 1', 0);
  const puntos2 = crearElementoPuntos('puntos2', 'Player 2', 0);

  // Ensamblar el área de puntos
  areaPuntos.append(tituloPuntos, puntos1, puntos2);
  
  return areaPuntos;
}

/**
 * Crea un elemento de puntos para un jugador
 * @param {string} id - ID del elemento
 * @param {string} nombreJugador - Nombre del jugador
 * @param {number} puntos - Puntos iniciales
 * @returns {HTMLElement} - Elemento DOM de puntos
 */
function crearElementoPuntos(id, nombreJugador, puntos) {
  const elementoPuntos = document.createElement("h2");
  elementoPuntos.setAttribute('class', 'puntos');
  elementoPuntos.setAttribute('id', id);
  elementoPuntos.innerHTML = `${nombreJugador}: ${puntos}`;
  
  return elementoPuntos;
}

/**
 * Crea el tablero del jugador con su estructura
 * @returns {HTMLElement} - Elemento DOM del tablero
 */
function crearTableroJugador() {
  const tablero = document.createElement("div");
  tablero.setAttribute('class', 'tablero');
  tablero.setAttribute('id', 'tablUno');

  // Crear título del tablero
  const tituloTablero1 = document.createElement("h2");
  tituloTablero1.setAttribute('id', 'tituloTablero1');
  tituloTablero1.innerHTML = `Player 1`;

  // Crear área del juego
  const juego1 = document.createElement("div");
  juego1.setAttribute('class', 'juego');

  // Ensamblar el tablero
  tablero.append(tituloTablero1, juego1);
  
  return tablero;
}

// ==========================================
// FUNCIONES PURAS DE GENERACIÓN DE DATOS
// ==========================================

/**
 * Genera un array de números barajados para el juego
 * @param {number} tamano - Tamaño del tablero (filas y columnas)
 * @returns {number[]} - Array de números barajados (copia)
 */
function generarArrayNumeros(tamano) {
  const totalCeldas = tamano * tamano;
  const cantidadPares = totalCeldas / 2;
  
  // Crear array con cada número duplicado
  const arrayNumeros = [];
  for (let i = 0; i < cantidadPares; i++) {
    arrayNumeros.push(i, i);
  }

  // Barajar los números usando algoritmo Fisher-Yates
  return barajarArray(arrayNumeros);
}

/**
 * Baraja un array usando el algoritmo Fisher-Yates
 * @param {Array} array - Array a barajar
 * @returns {Array} - Copia del array barajado
 */
function barajarArray(array) {
  const arrayBarajado = [...array]; // Crear copia para no mutar el original
  
  for (let i = arrayBarajado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayBarajado[i], arrayBarajado[j]] = [arrayBarajado[j], arrayBarajado[i]];
  }
  
  return arrayBarajado;
}

/**
 * Convierte un array lineal en una matriz bidimensional
 * @param {number[]} arrayNumeros - Array de números
 * @param {number} filas - Número de filas
 * @param {number} columnas - Número de columnas
 * @returns {number[][]} - Matriz bidimensional (copia)
 */
function convertirAMatriz(arrayNumeros, filas, columnas) {
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

/**
 * Genera la matriz completa del juego
 * @param {number} tamano - Tamaño del tablero
 * @returns {number[][]} - Matriz del juego
 */
function generarMatrizJuego(tamano) {
  const arrayNumeros = generarArrayNumeros(tamano);
  return convertirAMatriz(arrayNumeros, tamano, tamano);
}

// ==========================================
// FUNCIONES DE CREACIÓN DE CELDAS
// ==========================================

/**
 * Crea una celda flip con su estructura HTML
 * @param {number} valor - Valor numérico de la celda
 * @returns {HTMLElement} - Elemento DOM de la celda flip
 */
function crearCeldaFlip(valor) {
  // Crear el contenedor del flip
  const flipContainer = document.createElement("div");
  flipContainer.setAttribute('class', 'flip-container');

  // Crear la carta flip
  const flipCard = document.createElement("div");
  flipCard.setAttribute('class', 'flip-card');

  // Crear cara delantera
  const flipFront = crearCaraFlip('flip-front', '?');
  
  // Crear cara trasera
  const flipBack = crearCaraFlip('flip-back', valor);

  // Ensamblar la carta
  flipCard.append(flipFront, flipBack);
  flipContainer.appendChild(flipCard);

  return flipContainer;
}

/**
 * Crea una cara de la carta flip
 * @param {string} clase - Clase CSS de la cara
 * @param {string|number} contenido - Contenido a mostrar
 * @returns {HTMLElement} - Elemento DOM de la cara
 */
function crearCaraFlip(clase, contenido) {
  const cara = document.createElement("div");
  cara.setAttribute('class', clase);
  
  const texto = document.createElement("h2");
  texto.setAttribute('class', 'textoCeldas');
  texto.innerHTML = contenido;
  
  cara.appendChild(texto);
  
  return cara;
}

// ==========================================
// FUNCIONES DE RENDERIZADO
// ==========================================

/**
 * Renderiza todas las celdas del juego en el DOM
 * @param {number[][]} matriz - Matriz con los valores
 * @param {HTMLElement} contenedor - Contenedor donde se añadirán las celdas
 * @param {HTMLElement} tituloPlayer - Elemento del título del jugador actual
 */
function renderizarCeldas(matriz, contenedor, tituloPlayer) {
  actualizarTituloTurno(tituloPlayer);

  // Recorrer la matriz y crear las celdas
  matriz.forEach((fila, i) => {
    fila.forEach((valor, j) => {
      const flipContainer = crearCeldaFlip(valor);
      
      // Mostrar la celda brevemente al inicio
      setTimeout(() => {
        mostrarCeldaTemporalmente(flipContainer);
      }, 500);

      // Añadir el evento de click con la lógica del juego
      agregarEventoClick(flipContainer, i, j, tituloPlayer);

      // Guardar referencia del elemento en la matriz
      matriz[i][j] = flipContainer;
      contenedor.appendChild(flipContainer);
    });
  });
}

/**
 * Añade el evento click a una celda con toda la lógica del juego
 * @param {HTMLElement} flipContainer - Contenedor de la celda
 * @param {number} i - Índice de fila
 * @param {number} j - Índice de columna
 * @param {HTMLElement} tituloPlayer - Elemento del título del jugador
 */
function agregarEventoClick(flipContainer, i, j, tituloPlayer) {
  flipContainer.addEventListener('click', function() {
    // Si la tarjeta está bloqueada, no hacer nada
    if (flipContainer.dataset.locked === "true") return;

    // Voltear la tarjeta
    flipContainer.classList.toggle('flipped');

    // Procesar el click según la lógica del juego
    procesarClick(flipContainer, i, j, tituloPlayer);
  });
}

// ==========================================
// LÓGICA DEL JUEGO
// ==========================================

/**
 * Procesa el click en una celda según el estado del contador
 * @param {HTMLElement} flipContainer - Contenedor de la celda clickeada
 * @param {number} i - Índice de fila
 * @param {number} j - Índice de columna
 * @param {HTMLElement} tituloPlayer - Elemento del título del jugador
 */
function procesarClick(flipContainer, i, j, tituloPlayer) {
  // Si el contador supera 2, reiniciar variables
  if (PARTIDA.contador > 2) {
    resetearTurno();
  }

  if (PARTIDA.contador === 1) {
    procesarPrimerClick(flipContainer, i, j);
  } else if (PARTIDA.contador === 2) {
    procesarSegundoClick(flipContainer, i, j, tituloPlayer);
  }
}

/**
 * Procesa el primer click del turno
 * @param {HTMLElement} flipContainer - Contenedor de la celda
 * @param {number} i - Índice de fila
 * @param {number} j - Índice de columna
 */
function procesarPrimerClick(flipContainer, i, j) {
  PARTIDA.numUno = flipContainer;
  PARTIDA.tempI = i;
  PARTIDA.tempJ = j;
  PARTIDA.contador++;
}

/**
 * Procesa el segundo click del turno y verifica si hay pareja
 * @param {HTMLElement} flipContainer - Contenedor de la celda
 * @param {number} i - Índice de fila
 * @param {number} j - Índice de columna
 * @param {HTMLElement} tituloPlayer - Elemento del título del jugador
 */
function procesarSegundoClick(flipContainer, i, j, tituloPlayer) {
  PARTIDA.numDos = flipContainer;
  PARTIDA.contador++;

  const valorUno = PARTIDA.numUno.querySelector('.flip-back .textoCeldas').textContent;
  const valorDos = PARTIDA.numDos.querySelector('.flip-back .textoCeldas').textContent;

  // Verificar si es el mismo elemento (evitar click doble)
  if (PARTIDA.numUno === PARTIDA.numDos) {
    return;
  }

  // Verificar si los valores coinciden
  if (valorUno === valorDos) {
    manejarAcierto(i, j);
  } else {
    manejarFallo(tituloPlayer);
  }
}

/**
 * Maneja el caso cuando el jugador acierta una pareja
 * @param {number} i - Índice de fila de la segunda celda
 * @param {number} j - Índice de columna de la segunda celda
 */
function manejarAcierto(i, j) {
  // Marcar las celdas en la matriz
  const marcador = PARTIDA.turno === 1 ? 'X' : 'O';
  PARTIDA.matriz[i][j] = marcador;
  PARTIDA.matriz[PARTIDA.tempI][PARTIDA.tempJ] = marcador;
  console.table(PARTIDA.matriz); // Para debug en consola

  // Incrementar puntos del jugador actual
  if (PARTIDA.turno === 1) {
    PARTIDA.puntosPlayer1++;
  } else {
    PARTIDA.puntosPlayer2++;
  }

  // Actualizar la visualización de puntos
  actualizarPuntos();

  // Bloquear las celdas acertadas
  bloquearCelda(PARTIDA.numUno);
  bloquearCelda(PARTIDA.numDos);

  alert('Bien Hecho! +1 punto!');

  // Verificar si el juego ha terminado
  verificarFinJuego();
}

/**
 * Maneja el caso cuando el jugador falla
 * @param {HTMLElement} tituloPlayer - Elemento del título del jugador
 */
function manejarFallo(tituloPlayer) {
  console.log('Casi!');
  
  // Voltear las cartas de vuelta después de un breve delay
  setTimeout(() => {
    PARTIDA.numUno.classList.toggle('flipped');
    PARTIDA.numDos.classList.toggle('flipped');
  }, CONFIG.TIEMPO_VOLTEAR_FALLO);

  // Cambiar de turno
  cambiarTurno();
  
  // Actualizar el título del turno
  setTimeout(() => {
    actualizarTituloTurno(tituloPlayer);
  }, CONFIG.TIEMPO_VOLTEAR_FALLO);
}

/**
 * Bloquea una celda para que no se pueda volver a clickear
 * @param {HTMLElement} celda - Elemento de la celda a bloquear
 */
function bloquearCelda(celda) {
  celda.dataset.locked = 'true';
  celda.classList.add('locked');
}

/**
 * Reinicia las variables del turno actual
 */
function resetearTurno() {
  PARTIDA.contador = 1;
  PARTIDA.numUno = null;
  PARTIDA.numDos = null;
}

/**
 * Cambia el turno al otro jugador
 */
function cambiarTurno() {
  PARTIDA.turno = PARTIDA.turno === 1 ? 2 : 1;
}

// ==========================================
// FUNCIONES DE ACTUALIZACIÓN DE UI
// ==========================================

/**
 * Actualiza el título mostrando el jugador del turno actual
 * @param {HTMLElement} tituloPlayer - Elemento del título a actualizar
 */
function actualizarTituloTurno(tituloPlayer) {
  tituloPlayer.innerHTML = `Player ${PARTIDA.turno}`;
}

/**
 * Actualiza la visualización de los puntos de ambos jugadores
 */
function actualizarPuntos() {
  const puntos1 = document.querySelector('#puntos1');
  const puntos2 = document.querySelector('#puntos2');

  puntos1.innerHTML = `Player 1: ${PARTIDA.puntosPlayer1}`;
  puntos2.innerHTML = `Player 2: ${PARTIDA.puntosPlayer2}`;
}

/**
 * Muestra una celda temporalmente al inicio del juego
 * @param {HTMLElement} flipContainer - Contenedor de la celda
 */
function mostrarCeldaTemporalmente(flipContainer) {
  flipContainer.classList.toggle('flipped');
  
  setTimeout(() => {
    flipContainer.classList.toggle('flipped');
  }, CONFIG.TIEMPO_MOSTRAR_CELDAS);
}

// ==========================================
// FUNCIONES DE CONTROL DEL JUEGO
// ==========================================

/**
 * Pregunta al usuario si quiere comenzar el juego
 * @returns {boolean} - true si acepta, redirige si no
 */
function comenzarJuego() {
  const respuesta = confirm('Comenzar el juego?');
  
  if (!respuesta) {
    window.location.hash = '#';
    return false;
  }
  
  return true;
}

/**
 * Verifica si el juego ha terminado y maneja el final
 */
function verificarFinJuego() {
  const puntosTotal = PARTIDA.puntosPlayer1 + PARTIDA.puntosPlayer2;
  // Calcular el máximo de puntos según el tamaño del tablero
  const maxPuntos = (PARTIDA.tamanoSeleccionado * PARTIDA.tamanoSeleccionado) / 2;
  
  if (puntosTotal >= maxPuntos) {
    console.log('Fin del Juego');
    alert('El juego ha acabado!!');
    
    if (confirm('Quieres jugar de nuevo?')) {
      resetearPartida();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }
}

/**
 * Reinicia todas las variables de la partida
 */
function resetearPartida() {
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
}