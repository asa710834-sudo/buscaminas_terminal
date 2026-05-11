const Buscaminas = require('./logic');

function dibujarTablero(juego) {
  // Generar la cabecera con los números de las columnas
  let cabecera = '   ';
  for (let c = 1; c <= juego.columnas; c++) {
    cabecera += c + (c < 10 ? ' ' : ''); // Ajuste para números de dos cifras
  }
  console.log(cabecera);

  // Recorrer cada fila
  for (let f = 0; f < juego.filas; f++) {
    // Letra de la fila (A, B, C...)
    let filaStr = String.fromCharCode(65 + f) + '  ';
    
    for (let c = 0; c < juego.columnas; c++) {
      const celda = juego.tablero[f][c];
      
      if (!celda.revelada) {
        filaStr += '. ';
      } else if (celda.esMina) {
        filaStr += '* ';
      } else {
        // Mostrar número de minas o espacio si es 0
        filaStr += (celda.minasAdyacentes === 0 ? ' ' : celda.minasAdyacentes) + ' ';
      }
    }
    console.log(filaStr);
  }
}

module.exports = dibujarTablero;
