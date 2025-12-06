/*Al tener que adaptar todo de nuevo con webcomponets y observablse etc.. esto queda comentado y de backup por si acaso...



export { renderContentForOne };

//El objeto guarda/recoge lo siguiente:
// - Los turnos (1 o 2) segundo jugador -> "turno" 
// - Contador de celdas volteadas -> "contador"
// - Las celdas clicadas que se van a voltear, porque no puede pasar de 2 en cada turno -> "numUno y numDos"
// - Los indices de las celdas volteadas -> "tempI y tempJ"
// - Los puntos de cada jugador -> "puntosPlayer1 y puntosPlayer2"
// - La matriz con las celdas volteadas -> "matriz"
// - El tamaño del tablero seleccionado -> "tamanoSeleccionado"
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
  tamanoSeleccionado: null
};

//Esto lo he visto en stack overflow asi que lo pongo. 
//Configuración del juego para no tener que ir modificando el cogido funcion x funcion.
const CONFIG = {
  TIEMPO_MOSTRAR_CELDAS: 2500,
  TIEMPO_VOLTEAR_FALLO: 500
};

//Esto también es del stack overflow para los tamaños del tablero.
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

//La funcion principal, que es la que se EXPORTA!
function renderContentForOne() {
  // Crear el área principal del tablero
  const areaTablero = document.createElement("div");
  areaTablero.setAttribute('id', 'areaTablero');

  // Crear y añadir el área de puntos
  const areaPuntos = crearAreaPuntos();
  
  // Crear y añadir el tablero del jugador
  const tablero = crearTableroJugador();

  // Meter el area de puntos y el tablero en el area principal
  areaTablero.append(areaPuntos);
  areaTablero.append(tablero);

  // Recoge de partes del tablero
  const juego1 = tablero.querySelector('.juego');
  const tituloTablero1 = tablero.querySelector('#tituloTablero1');
  // LLamar a la funcion de mostrar pantalla de selección de dificultad
  mostrarSeleccionDificultad(juego1, tituloTablero1);

  return areaTablero;
}

//Funcion que muestra la pantalla de selección de dificultad
function mostrarSeleccionDificultad(contenedor, tituloTablero) {
  // Poner el título
  tituloTablero.innerHTML = 'Selecciona Dificultad';
  
  // Crear contenedor de botones
  const contenedorBotones = document.createElement('div');
  contenedorBotones.setAttribute('class', 'contenedor-dificultad');

  // Crear botones para cada dificultad
  Object.values(TAMAÑOS).forEach((config) => {
    const boton = crearBotonDificultad(config, contenedor, tituloTablero);
    contenedorBotones.appendChild(boton);
  });

  // Limpiar contenedor y añadir botones
  contenedor.innerHTML = '';
  contenedor.appendChild(contenedorBotones);
}

//La funcion que crea un botón de selección de dificultad
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

  //Al hacer click empiza el juego
  boton.addEventListener('click', () => {
    if (comenzarJuego()) { //comenzarJuego es una funcion que devuelve true o false porque es un confirm (no hay tiempo de hacer popup chulo)
      PARTIDA.tamanoSeleccionado = config.valor;
      iniciarJuego(contenedor, tituloTablero);
    }
  });

  return boton;
}

//Funcion que hace que empiece el juego con el tamaño y la dificultad seleccionada
function iniciarJuego(contenedor, tituloTablero) {
  // Limpiar el contenedor para quitar los bootnes
  contenedor.innerHTML = '';

  // Generar la matriz con el tamaño seleccionado
  PARTIDA.matriz = generarMatrizJuego(PARTIDA.tamanoSeleccionado);
  console.table(PARTIDA.matriz);
  
  //Actualizar el grid del contenedor según el tamaño. Para que se adapte al tablero
  actualizarGridJuego(contenedor, PARTIDA.tamanoSeleccionado);
  
  //Renderizar todas las celdas
  renderizarCeldas(PARTIDA.matriz, contenedor, tituloTablero);
}

//Actualiza el grid CSS del contenedor según el tamaño del tablero porque daba fallos visuales utilizar uno "universal"...
function actualizarGridJuego(contenedor, tamano) {
  contenedor.classList.remove('grid-4', 'grid-6', 'grid-8');
  contenedor.classList.add(`grid-${tamano}`);
}

//Esto crea el area de puntos con sus cosas dentro
function crearAreaPuntos() {
  const areaPuntos = document.createElement('div');
  areaPuntos.setAttribute('id', 'areaPuntos');

  //titulo
  const tituloPuntos = document.createElement('h2');
  tituloPuntos.setAttribute('id', 'tituloPuntos');
  tituloPuntos.innerHTML = ' Puntos ';

  //puntos para los 2 jugadores con funcion externa. No se hace aqui dentor realmente
  const puntos1 = crearElementoPuntos('puntos1', 'Player 1', 0);
  const puntos2 = crearElementoPuntos('puntos2', 'Player 2', 0);

  //lo metemos todo en areaPuntos y lo devolvemos
  areaPuntos.append(tituloPuntos, puntos1, puntos2);
  
  return areaPuntos;
}

//Crea un elemento de puntos para un jugador
function crearElementoPuntos(id, nombreJugador, puntos) {
  const elementoPuntos = document.createElement("h2");
  elementoPuntos.setAttribute('class', 'puntos');
  elementoPuntos.setAttribute('id', id);
  elementoPuntos.innerHTML = `${nombreJugador}: ${puntos}`;
  
  return elementoPuntos;
}

//Crea el tablero del jugador con su estructura
function crearTableroJugador() {
  const tablero = document.createElement("div");
  tablero.setAttribute('class', 'tablero');
  tablero.setAttribute('id', 'tablUno');

  //el titulo del tablero
  const tituloTablero1 = document.createElement("h2");
  tituloTablero1.setAttribute('id', 'tituloTablero1');
  tituloTablero1.innerHTML = `Player 1`;

  // Crear área del juego
  const juego1 = document.createElement("div");
  juego1.setAttribute('class', 'juego');

  //lo ponemos todo dentro del tablero
  tablero.append(tituloTablero1, juego1);
  
  return tablero;
}

//AQUI EMPIEZA EL TEMA DE LA MATRIZ...

//Genera un array de números barajados para el juego. 
function generarArrayNumeros(tamano) {
  const totalCeldas = tamano * tamano;
  const cantidadPares = totalCeldas / 2;
  
  //Crear array con cada número duplicado.ESTO ES DE CHATGPT
  const arrayNumeros = [];
  for (let i = 0; i < cantidadPares; i++) {
    arrayNumeros.push(i, i);
  }

  //mezclar los numeros del array anterior para que salgan aleatorios
  return barajarArray(arrayNumeros);
}

//Baraja un array usando el algoritmo "Fisher-Yates" ESTO ES DE CHATGPT porque me salian todos juntos y ordenados
function barajarArray(array) {
  const arrayBarajado = [...array]; //Crear copia para no mutar el original
  
  for (let i = arrayBarajado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayBarajado[i], arrayBarajado[j]] = [arrayBarajado[j], arrayBarajado[i]];
  }
  
  return arrayBarajado;
}

//Genera la matriz 
function generarMatrizJuego(tamano) {
  const arrayNumeros = generarArrayNumeros(tamano);
  return convertirAMatriz(arrayNumeros, tamano, tamano);
}

//Convierte un array recto en una matriz porque sino es muy complicado pensar como ordenar todo
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

//LA PARTE DE HACER "FLIP" DE LAS CELDAS...

//Crea una celda flip
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

  // Montar la carta
  flipCard.append(flipFront, flipBack);
  flipContainer.appendChild(flipCard);

  return flipContainer;
}

//Crea una cara de la carta flip
function crearCaraFlip(clase, contenido) {
  const cara = document.createElement("div");
  cara.setAttribute('class', clase);
  
  const texto = document.createElement("h2");
  texto.setAttribute('class', 'textoCeldas');
  texto.innerHTML = contenido;
  
  cara.appendChild(texto);
  
  return cara;
}


//Renderiza todas las celdas del juego en el DOM
function renderizarCeldas(matriz, contenedor, tituloPlayer) {
  actualizarTituloTurno(tituloPlayer);

  // Recorrer la matriz y crear las celdas
  matriz.forEach((fila, i) => {
    fila.forEach((valor, j) => {
      const flipContainer = crearCeldaFlip(valor);
      
      // Mostrar la celda brevemente cuando empieza el juego para poder ver el contenido y poder acordarse
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

//Añade el evento click a una celda con toda la lógica del juego
function agregarEventoClick(flipContainer, i, j, tituloPlayer) {
  flipContainer.addEventListener('click', function() {
    //Si la tarjeta está bloqueada, no hacer nada
    if (flipContainer.dataset.locked === "true") return;

    //Voltear la tarjeta
    flipContainer.classList.toggle('flipped');

    //Procesar el click
    procesarClick(flipContainer, i, j, tituloPlayer);
  });
}

//Procesa el click en una celda según el estado del contador
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

//Procesa el primer click del turno
function procesarPrimerClick(flipContainer, i, j) {
  PARTIDA.numUno = flipContainer;
  PARTIDA.tempI = i;
  PARTIDA.tempJ = j;
  PARTIDA.contador++;
}

//Procesa el segundo click del turno y verifica si ha acertado o no. y hace cosas segun que ha pasado
function procesarSegundoClick(flipContainer, i, j, tituloPlayer) {
  PARTIDA.numDos = flipContainer;
  PARTIDA.contador++;

  const valorUno = PARTIDA.numUno.querySelector('.flip-back .textoCeldas').textContent;
  const valorDos = PARTIDA.numDos.querySelector('.flip-back .textoCeldas').textContent;

  // Verificar si es el mismo elemento
  if (PARTIDA.numUno === PARTIDA.numDos) {//evitar click doble en la misma celda
    return;
  }

  // Verificar si los dos coinciden
  if (valorUno === valorDos) {
    manejarAcierto(i, j);
  } else {
    manejarFallo(tituloPlayer);
  }
}

//Maneja el caso cuando el jugador acierta
function manejarAcierto(i, j) {
  // Marcar las celdas en la matriz
  const marcador = PARTIDA.turno === 1 ? 'X' : 'O';
  PARTIDA.matriz[i][j] = marcador;
  PARTIDA.matriz[PARTIDA.tempI][PARTIDA.tempJ] = marcador;
  console.table(PARTIDA.matriz); 

  // Incrementar puntos del jugador actual
  if (PARTIDA.turno === 1) {
    PARTIDA.puntosPlayer1++;
  } else {
    PARTIDA.puntosPlayer2++;
  }

  // Actualizar los puntos
  actualizarPuntos();

  // Bloquear las celdas acertadas
  bloquearCelda(PARTIDA.numUno);
  bloquearCelda(PARTIDA.numDos);

  alert('Bien Hecho! +1 punto!');

  // Verificar si el juego ha terminado o no
  verificarFinJuego();
}

//Maneja el caso cuando el jugador falla
function manejarFallo(tituloPlayer) {
  console.log('Casi!');
  
  // Voltear las cartas de vuelta después de un breve tiempo
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

//Bloquea una celda para que no se pueda volver a clickear
function bloquearCelda(celda) {
  celda.dataset.locked = 'true';
  celda.classList.add('locked');
}

//Reinicia las variables del turno actual
function resetearTurno() {
  PARTIDA.contador = 1;
  PARTIDA.numUno = null;
  PARTIDA.numDos = null;
}

//Cambia el turno al otro jugador
function cambiarTurno() {
  PARTIDA.turno = PARTIDA.turno === 1 ? 2 : 1;
}


//Actualiza el título del jugador del turno
function actualizarTituloTurno(tituloPlayer) {
  tituloPlayer.innerHTML = `Player ${PARTIDA.turno}`;
}

//Actualiza los puntos de los dos jugadore
function actualizarPuntos() {
  const puntos1 = document.querySelector('#puntos1');
  const puntos2 = document.querySelector('#puntos2');

  puntos1.innerHTML = `Player 1: ${PARTIDA.puntosPlayer1}`;
  puntos2.innerHTML = `Player 2: ${PARTIDA.puntosPlayer2}`;
}

//Muestra celda temporalmente al inicio del juego
function mostrarCeldaTemporalmente(flipContainer) {
  flipContainer.classList.toggle('flipped');
  
  setTimeout(() => {
    flipContainer.classList.toggle('flipped');
  }, CONFIG.TIEMPO_MOSTRAR_CELDAS);
}



//Pregunta al usuario si quiere comenzar el juego. Lo ideal hubiera sido hacer popup chulo, pero no hay tiempo
function comenzarJuego() {
  const respuesta = confirm('Comenzar el juego?');
  
  if (!respuesta) {
    window.location.hash = '#';
    return false;
  }
  
  return true;
}

//Verifica si el juego ha terminado y maneja cosas segun caso
function verificarFinJuego() {
  const puntosTotal = PARTIDA.puntosPlayer1 + PARTIDA.puntosPlayer2;
  //Calcular el máximo de puntos según el tamaño del tablero
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

//Reinicia todas las variables de la partida
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

*/
