//service para guardar partidas en supabase
import { PARTIDA } from './gameState.js';

const SUPABASE_URL = 'https://csnrgajhumntcrafsctc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbnJnYWpodW1udGNyYWZzY3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDkzMzksImV4cCI6MjA3NjE4NTMzOX0.2lA4EV1xtMtsAB1weI_DJZ6c2F5QaD-q30pmMn03Ldg';

//funcion para obtener el id del usuario actual desde el token
function obtenerUserIdDelToken() {
  const token = localStorage.getItem('access_token');
  if (!token) return null;
  
  try {
    const partes = token.split('.');
    const datos = JSON.parse(atob(partes[1])); //atob es ascii to binary, visto en Stack Overflow, porque me daba fallos al descargar dats...
    return datos.sub;
  } catch (error) {
    console.error('error al decodificar token:', error);
    return null;
  }
}

//guardar la partida en supabase
export async function guardarPartidaEnSupabase() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    console.error('no hay token para guardar partida');
    return false;
  }

  const userId = obtenerUserIdDelToken();
  if (!userId) {
    console.error('no se pudo obtener el id del usuario');
    return false;
  }

  //preparar datos para guardar
  const datosPartida = {
    player1_id: userId,
    player2_id: userId, //en este juego, es el mismo usuario jugando contra si mismo
    player1_score: PARTIDA.puntosPlayer1,
    player2_score: PARTIDA.puntosPlayer2,
    winner_id: PARTIDA.puntosPlayer1 > PARTIDA.puntosPlayer2 ? userId : (PARTIDA.puntosPlayer2 > PARTIDA.puntosPlayer1 ? userId : null),
    status: 'finished',
    game_state: {
      tamano: PARTIDA.tamanoSeleccionado,
      duracion: Date.now()
    },
    finished_at: new Date().toISOString() //para convertir la fecha en formato "normal" porque supabase no lo entiende 
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': SUPABASE_KEY,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(datosPartida)
    });

    if (response.ok) {
      console.log('partida guardada correctamente');
      return true;
    } else {
      const error = await response.json();
      console.error('error al guardar partida:', error);
      return false;
    }
  } catch (error) {
    console.error('error en la solicitud:', error);
    return false;
  }
}
