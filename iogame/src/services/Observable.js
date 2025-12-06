
export class Observable {
  constructor(valorInicial) {
    this.valor = valorInicial;
    this.observadores = [];
  }

  //suscribirse a cambios en los puntos
  suscribirse(callback) {
    this.observadores.push(callback);
    //retornar función para desuscribirse
    return () => {
      this.observadores = this.observadores.filter(obs => obs !== callback);
    };
  }

  //obtener el valor actual
  obtenerValor() {
    return this.valor;
  }

  //establecer nuevo valor y notificar a observadores
  cambiarValor(nuevoValor) {
    if (this.valor !== nuevoValor) {
      this.valor = nuevoValor;
      this.notificar();
    }
  }

  //notificar a todos los observadores
  notificar() {
    this.observadores.forEach(callback => callback(this.valor));
  }
}
