class Buscaminas {
constructor(filas, columnas, numeroMinas) {
this.filas = filas;
this.columnas = columnas;
this.numeroMinas = numeroMinas;
this.tablero = [];
this.minasColocadas = false;

this.inicializarTablero();
this.colocarMinas();
}

inicializarTablero() {
this.tablero = Array.from({ length: this.filas }, () =>
Array.from({ length: this.columnas }, () => ({
esMina: false,
revelada: false,
minasAdyacentes: 0,
}))
);
}

colocarMinas() {
let minasRestantes = this.numeroMinas;
while (minasRestantes > 0) {
const fila = Math.floor(Math.random() * this.filas);
const columna = Math.floor(Math.random() * this.columnas);

if (!this.tablero[fila][columna].esMina) {
this.tablero[fila][columna].esMina = true;
minasRestantes--;
}
}
this.calcularNumeros();
}

calcularNumeros() {
for (let f = 0; f < this.filas; f++) {
for (let c = 0; c < this.columnas; c++) {
if (!this.tablero[f][c].esMina) {
this.tablero[f][c].minasAdyacentes = this.contarMinasAlrededor(f, c);
}
}
}
}

contarMinasAlrededor(fila, columna) {
let contador = 0;
for (let i = -1; i <= 1; i++) {
for (let j = -1; j <= 1; j++) {
const nuevaFila = fila + i;
const nuevaCol = columna + j;

if (
nuevaFila >= 0 &&
nuevaFila < this.filas &&
nuevaCol >= 0 &&
nuevaCol < this.columnas
) {
if (this.tablero[nuevaFila][nuevaCol].esMina) {
contador++;
}
}
}
}
    return contador;
  }
}

module.exports = Buscaminas;
