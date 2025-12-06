//página de registro Web Component

class RegistroPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    //renderizar cuando se monta el componente
    this.render();
  }

  render() {
    //crear formulario de registro
    this.innerHTML = `
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="form-container">
              <div class="form-box">
                <h2 class="form-title">Registro Nuevo Usuario</h2>
                <form id="registroForm">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="Ingresa tu email">
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password" placeholder="Ingresa tu contraseña">
                  </div>
                  <button type="submit" class="btn btn-primary w-100" id="botonEnviarRegistro">Registrarse</button>
                  <br>
                  <br>
                  <a href="#login" class="btn btn-danger btn-lg" data-link>Volver a Login</a>
                </form>
              </div>
            </div>
            <h2 class="form-title" id="resultadoRegistro"></h2>
          </div>
        </div>
      </div>
    `;

    
    this.hacerListeners();
  }

  hacerListeners() {
    //obtener elementos del formulario
    const form = this.querySelector('#registroForm');
    const mensajeRegistro = this.querySelector('#resultadoRegistro');
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbnJnYWpodW1udGNyYWZzY3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDkzMzksImV4cCI6MjA3NjE4NTMzOX0.2lA4EV1xtMtsAB1weI_DJZ6c2F5QaD-q30pmMn03Ldg';

    //cuando se envía el formulario
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      //obtener datos del formulario
      const email = this.querySelector('#email').value;
      const password = this.querySelector('#password').value;

      const signUpObject = {
        "email": email,
        "password": password
      };

      try {
        //conectar con supabase auth para crear usuario
        const response = await fetch('https://csnrgajhumntcrafsctc.supabase.co/auth/v1/signup', {
          method: 'POST',
          headers: {
            "apiKey": SUPABASE_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpObject)
        });

        const data = await response.json();

        if (response.status === 200) {
          //usuario registrado correctamente
          mensajeRegistro.innerHTML = 'Usuario registrado con éxito. No olvides verificar tu correo!';
          setTimeout(() => {
            window.location.hash = '#login';
          }, 2000);
        } else {
          //error en el registro
          mensajeRegistro.innerHTML = 'Error al registrar el usuario';
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        console.error('Error:', error);
        mensajeRegistro.innerHTML = 'Error al conectar con el servidor';
      }
    });
  }
}

customElements.define('registro-page', RegistroPage);
export { RegistroPage };
