export { renderHome }

function renderHome() {
    const header = document.createElement('div');
    header.innerHTML =`
    <div class="container mt-5">
        <div class="jumbotron text-center">
            <h1 class="display-4">🎮 Memory Game Yordan</h1>
            <p class="lead">Un juego de memoria divertido y desafiante</p>
            <hr class="my-4">
            <p>Elige tu modo de juego:</p>
            <a href="#game" class="btn btn-primary btn-lg" data-link>Un Jugador</a>
            <button class="btn btn-secondary btn-lg ms-2" disabled>Dos Jugadores (Próximamente)</button>
        </div>
    </div>
    `;
    
    return header;
}

/*
<div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
  {" "}
  <div class="col-md-6 p-lg-5 mx-auto my-5">
    {" "}
    <h1 class="display-3 fw-bold">Designed for engineers</h1>{" "}
    <h3 class="fw-normal text-muted mb-3">
      Build anything you want with Aperture
    </h3>{" "}
    <div class="d-flex gap-3 justify-content-center lead fw-normal">
      {" "}
      <a class="icon-link" href="#">
        Learn more
        <svg class="bi" aria-hidden="true">
          <use xlink:href="#chevron-right"></use>
        </svg>{" "}
      </a>{" "}
      <a class="icon-link" href="#">
        Buy
        <svg class="bi" aria-hidden="true">
          <use xlink:href="#chevron-right"></use>
        </svg>{" "}
      </a>{" "}
    </div>{" "}
  </div>{" "}
  <div class="product-device shadow-sm d-none d-md-block"></div>{" "}
  <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>{" "}
</div>;

*/
