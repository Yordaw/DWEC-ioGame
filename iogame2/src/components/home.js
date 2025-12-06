//página de inicio Web Component

class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    //renderizar cuando se monta el componente
    this.render();
  }

  render() {
    //crear página de inicio con instrucciones y botones de juego
    this.innerHTML = `
      <div class="container mt-5">
        <div class="jumbotron text-center">
          <h1 class="display-4"><strong>Memory Game de Yordan</strong></h1>
          <p class="lead">Pon a prueba tu memoria con este juego de tablero</p>
          <hr class="my-4">
          <p>Elige tu modo de juego:</p>

          <button class="btn btn-primary btn-lg ms-2" id="botonUnJugador">Dos jugadores por turnos</button>
          <button class="btn btn-secondary btn-lg ms-2" disabled>Dos Jugadores Online (Próximamente...o nunca)</button>
          <a href="#login" class="btn btn-primary btn-lg" data-link>Iniciar Sesión</a>
          
          <hr class="my-4">
          
          <div class="text-start">
            <h3>* Instrucciones del Juego *</h3>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Elige tamaño/dificultad:</strong> Van ligados entre sí según el modo elegido.</li>
              <li class="list-group-item"><strong>Memorización inicial:</strong> Cuando empieza el juego se girarán las celdas durante un breve periodo. ¡Fíjate y memoriza las posiciones de cada número! Intenta acordarte de todas y ganarás. Luego vuelven a la normalidad y ahí es cuando realmente comienzan los turnos de ambos jugadores.</li>
              <li class="list-group-item"><strong>Turnos:</strong> Si aciertas sigue tu turno. Si fallas le toca a tu contrincante.</li>
              <li class="list-group-item"><strong>Victoria:</strong> Cuando se acierten todas las posiciones, se acaba el juego y gana el que más puntos tenga.</li>
            </ul>
          </div>
        </div>
      </div>
    `;

    //configurar listeners después de renderizar
    this.setupEventListeners();
  }

  setupEventListeners() {
    //obtener elemento del botón de jugar
    const botonUnJugador = this.querySelector('#botonUnJugador');
    const botonLogin = this.querySelector('a[href="#login"]');
    const token = localStorage.getItem("access_token");

    //iniciar juego si está logeado, sino ir a login
    botonUnJugador.addEventListener('click', () => {
      if (token) {
        //ir al juego
        window.location.hash = '#game';
      } else {
        //ir a login primero
        window.location.hash = '#login';
      }
    });

    //mostrar botón de login solo si no hay token
    if (token) {
      botonLogin.style.display = 'none';
    } else {
      botonLogin.style.display = 'inline-block';
    }
  }
}

customElements.define('home-page', HomePage);
export { HomePage };
