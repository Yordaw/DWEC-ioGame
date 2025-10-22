export { renderHome }

function renderHome() {
    const home = document.createElement('div');
    home.innerHTML =`
    <div class="container mt-5">
        <div class="jumbotron text-center">
            <h1 class="display-4">🎮 Memory Game Yordan</h1>
            <p class="lead">Un juego de memoria en forma de tablero</p>
            <hr class="my-4">
            <p>Elige tu modo de juego:</p>
            <a href="#game" class="btn btn-primary btn-lg" data-link>Un Jugador</a>
            <button class="btn btn-secondary btn-lg ms-2" disabled>Dos Jugadores (Próximamente)</button>
            <a href="#login" class="btn btn-primary btn-lg" data-link>Iniciar Sersión</a>
        </div>
    </div>
    `;
    
    return home;
}

