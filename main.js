const readline = require('readline');
const Buscaminas = require('./logic');
const dibujarTablero = require('./view');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuramos la partida (10x10 con 10 minas)
const juego = new Buscaminas(10, 10, 10);

function preguntar() {
  console.clear();
  dibujarTablero(juego);
  
  rl.question('Introduce coordenada (Ej: A1) o "q" para salir: ', (input) => {
    if (input.toLowerCase() === 'q') {
      rl.close();
      return;
    }

    // Convertir A1 -> fila 0, columna 0
    const fila = input.toUpperCase().charCodeAt(0) - 65;
    const columna = parseInt(input.substring(1)) - 1;

    if (fila >= 0 && fila < juego.filas && columna >= 0 && columna < juego.columnas) {
      const celda = juego.tablero[fila][columna];
      celda.revelada = true;

      if (celda.esMina) {
        console.clear();
        dibujarTablero(juego);
        console.log('¡BOOM! Has pisado una mina. Game Over.');
        rl.close();
      } else {
        preguntar();
      }
    } else {
      console.log('Coordenada no válida.');
      setTimeout(preguntar, 1000);
    }
  });
}

preguntar();
