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
                        <a class="nav-link" href="#game" data-link>Juego</a>
                    </li>
                    
                </ul>
                
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link text-danger fw-bold" href="#logout" data-link id="botonLogout" hidden>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>    
    `;

    const token = localStorage.getItem("access_token");
    if(token){
        header.querySelector('#botonLogout').removeAttribute("hidden");
    }

    return header;
}


   


