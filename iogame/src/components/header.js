export {renderHeader}

function renderHeader() {
    const header = document.createElement('div');
    header.innerHTML=`
    <nav class="navbar navbar-expand-lg bg-light" id="barraNav">
        <div class="container-fluid">
            <a class="navbar-brand" href="#" data-link>Memory Game</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#login" data-link>Login</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#registro" data-link>Registro</a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" href="#game" data-link id="botonJuego" hidden>Juego</a>
                    </li>
                    
                </ul>
                
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <button class="btn btn-danger btn-lg ms-2" id="botonLogout" hidden>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>    
    `;
    //Revisamos si hay token guardado(se está logeado) para poder ocultar o mostrar el ciertas opciones del header.
    //Verificar estado inicial
    refreshHeader(header);

    //Escuchar cambios en el almacenamiento
    window.addEventListener('storage', () => {
        refreshHeader(header);
    });

    //También escuchar eventos personalizados para cambios dentro de la misma pestaña
    window.addEventListener('authStateChanged', () => {
        refreshHeader(header);
    });

    const botonLogout = header.querySelector('#botonLogout');

    botonLogout.addEventListener('click', () => {
        localStorage.removeItem("access_token");
        //Disparar evento personalizado
        window.dispatchEvent(new Event('authStateChanged'));
        window.location.hash = '#login';
        refreshHeader(header);
    });


    return header;
}


function refreshHeader(header) {
    const token = localStorage.getItem("access_token");
    const botonLogout = header.querySelector('#botonLogout');
    const botonJuego = header.querySelector('#botonJuego');
    const loginLink = header.querySelector('a[href="#login"]');
    const registroLink = header.querySelector('a[href="#registro"]');

    if (token) {
        //Usuario logeado
        botonLogout.removeAttribute("hidden");
        botonJuego.removeAttribute("hidden");
        loginLink.parentElement.style.display = 'none';
        registroLink.parentElement.style.display = 'none';
    } else {
        //Usuario no logeado
        botonJuego.setAttribute("hidden", true);
        botonLogout.setAttribute("hidden", true);
        loginLink.parentElement.style.display = 'block';
        registroLink.parentElement.style.display = 'block';
    }
}


