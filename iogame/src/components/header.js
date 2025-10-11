export {renderHeader}

function renderHeader() {
    return `
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#" data-link>Memory Game</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#game" data-link>Juego</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#login" data-link>Login</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
    `;
}



