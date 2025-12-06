//página de login Web Component
class LoginPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title text-center">Iniciar Sesión</h2>
                <div class="alert alert-info" role="alert">
                  <strong>Usuario de prueba:</strong><br>
                  Email: <code>lomeded178@httpsu.com</code><br>
                  Contraseña: <code>lomeded178@httpsu.com</code>
                </div>
                <form id="loginForm">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="Ingresa tu email">
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password" placeholder="Ingresa tu contraseña">
                  </div>
                  <button type="submit" class="btn btn-primary w-100" id="botonEnviarLogin">Entrar</button>
                  <br>
                  <br>
                  <a href="#registro" class="btn btn-warning btn-lg" data-link>Registrarse</a>
                </form>
              </div>
            </div>
            <h2 class="card-title text-center" id="resultadoLogin"></h2>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.querySelector('#loginForm');
    const mensajeLogin = this.querySelector('#resultadoLogin');
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbnJnYWpodW1udGNyYWZzY3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDkzMzksImV4cCI6MjA3NjE4NTMzOX0.2lA4EV1xtMtsAB1weI_DJZ6c2F5QaD-q30pmMn03Ldg';

    //cuando se envía el formulario
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = this.querySelector('#email').value;
      const password = this.querySelector('#password').value;

      const datosLogin = {
        "email": email,
        "password": password
      };

      try {
        //conectar con supabase auth
        const response = await fetch('https://csnrgajhumntcrafsctc.supabase.co/auth/v1/token?grant_type=password', {
          method: 'POST',
          headers: {
            "apiKey": SUPABASE_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosLogin)
        });

        const data = await response.json();

        if (response.status === 200) {
          //guardar token y redirigir
          localStorage.setItem('access_token', data.access_token);
          window.dispatchEvent(new Event('authStateChanged'));
          window.location.hash = '#';
        } else {
          //mostrar error temporalmente
          mensajeLogin.innerHTML = 'Error al iniciar sesión. Inténtelo de nuevo...';
          setTimeout(() => {
            mensajeLogin.innerHTML = '';
          }, 2000);
        }
      } catch (error) {
        console.error('Error:', error);
        mensajeLogin.innerHTML = 'Error al conectar con el servidor';
      }
    });
  }
}

customElements.define('login-page', LoginPage);
export { LoginPage };
