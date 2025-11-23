export { renderHome }

function renderHome() {
    const home = document.createElement('div');
    home.innerHTML =`
    <div class="container mt-5">
        <div class="jumbotron text-center">
            <h1 class="display-4">🎮 Memory Game de Yordan</h1>
            <p class="lead">Un juego de memoria en forma de tablero hecho en 2º año de DAW 2025</p>
            <hr class="my-4">
            <p>Elige tu modo de juego:</p>

            <button class="btn btn-primary btn-lg ms-2" id="botonUnJugador">Un Jugador</button>
            <button class="btn btn-secondary btn-lg ms-2" disabled>Dos Jugadores (Próximamente...o nunca)</button>
            <a href="#login" class="btn btn-primary btn-lg" data-link>Iniciar Sersión</a>
        </div>
    </div>
    `;

    /*El boton de "Un Jugador" redirecciona al juego si detecta un token(si esta logueado)
    o al login si no detecta un token*/

    const botonUnJugador = home.querySelector('#botonUnJugador');
    const token = localStorage.getItem("access_token");

    botonUnJugador.addEventListener('click', () => {
        if(token){
            window.location.hash = '#game';
        }else{
            window.location.hash = '#login';
        }
    })
    
    return home;
}

