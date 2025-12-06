# DWEC-ioGame
Proyecto Juego ioGame asignatura DWEC DAW2

# Memory Game - Yordan

## 1. Descripción General

Es un juego de memoria estilo clásico para dos jugadores por turnos. El objetivo es encontrar parejas de números en un tablero, pero con una diferencia: antes de empezar, todas las tarjetas se revelan brevemente para que memorices las posiciones. Luego los jugadores van descubriendo parejas por turnos. Quien acumule más puntos gana. Incluye autenticación de usuarios, sistema de perfiles y diferentes niveles de dificultad.

## 2. Tecnologías Utilizadas

- **Frontend Framework:** Vite (herramienta de build ultrarrápida)
- **Lenguaje:** JavaScript vanilla con módulos ES6
- **Web Components:** Componentes reutilizables sin framework externo
- **Estilos:** SCSS (CSS con superpoderes) + Bootstrap 5
- **Control de Estado:** Sistema custom con observables
- **Diseño:** Responsive con flexbox y CSS Grid
- **Herramientas:** ESLint para mantener el código limpio

## 3. Estructura del Proyecto

```
iogame2/
├── src/
│   ├── components/          → Componentes del juego (login, home, tablero, etc)
│   ├── services/            → Lógica pura del juego y gestión de datos
│   │   ├── gameLogic.js     → Algoritmo del juego (barajar, generar tablero)
│   │   ├── gameState.js     → Estado global del juego
│   │   ├── cardRenderer.js  → Renderiza las tarjetas en pantalla
│   │   ├── Observable.js    → Sistema de eventos reactivo
│   │   └── gamesService.js  → API y datos de partidas
│   ├── style/               → Estilos SCSS
│   ├── main.js              → Archivo principal (punto de entrada)
│   └── router.js            → Ruteador para cambiar entre páginas
├── public/                  → Recursos estáticos
├── index.html               → Página HTML
└── package.json             → Dependencias del proyecto
```

**Cómo funciona:**
- El router cambia entre componentes según la URL
- Cada componente es un Web Component (clase que extiende HTMLElement)
- La lógica del juego está separada de la interfaz
- El estado se maneja con un sistema observable (patrón observer)

## 4. Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| **Rojo Neón** | `#FF3D47` | Color principal, botones, bordes, títulos destacados |
| **Rojo Oscuro** | `#E63342` | Hover de botones, gradientes |
| **Rojo Muy Oscuro** | `#CC2D35` | Bordes de elementos rojos |
| **Negro Puro** | `#000000` | Texto sobre rojo, fondo de botones |
| **Negro Gris 1** | `#0F0F0F` | Fondo de la página |
| **Negro Gris 2** | `#1A1A1A` | Fondo de tableros, navbar, footer, formularios |
| **Negro Gris 3** | `#2A2A2A` | Fondo de tarjetas sin voltear, inputs |
| **Negro Gris 4** | `#333333` | Inputs en focus |
| **Gris Oscuro** | `#4A4A4A` | Bordes sutiles |
| **Gris Medio** | `#444444` | Botones secundarios |
| **Gris Claro** | `#555555` | Hover botones secundarios |
| **Gris Muy Claro** | `#888888` | Placeholders en inputs |
| **Gris Casi Blanco** | `#CCCCCC` | Texto principal, links |
| **Blanco** | `#FFFFFF` | Texto sobre rojo, fondos de tarjetas al voltear |

**Resumen:** Tema oscuro con acentos en rojo neón. Muy gamer, muy de esos juegos retro pero modernos.

---

*Proyecto realizado como práctica de JavaScript vanilla con componentes web modernos.*
