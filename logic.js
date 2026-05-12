class Buscaminas {
    constructor(filas, columnas, numMinas) {
        this.filas = filas;
        this.columnas = columnas;
        this.numMinas = numMinas;
        this.tablero = [];
        this.gameOver = false;
        this.inicializarTablero();
    }

    inicializarTablero() {
        this.tablero = Array.from({ length: this.filas }, () =>
            Array.from({ length: this.columnas }, () => ({
                esMina: false,
                revelada: false,
                minasCerca: 0
            }))
        );
        this.colocarMinas();
        this.calcularNumeros();
    }

    colocarMinas() {
        let colocadas = 0;
        while (colocadas < this.numMinas) {
            let f = Math.floor(Math.random() * this.filas);
            let c = Math.floor(Math.random() * this.columnas);
            if (!this.tablero[f][c].esMina) {
                this.tablero[f][c].esMina = true;
                colocadas++;
            }
        }
    }

    calcularNumeros() {
        for (let f = 0; f < this.filas; f++) {
            for (let c = 0; c < this.columnas; c++) {
                if (!this.tablero[f][c].esMina) {
                    this.tablero[f][c].minasCerca = this.contarAdyacentes(f, c);
                }
            }
        }
    }

    contarAdyacentes(f, c) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let nf = f + i, nc = c + j;
                if (nf >= 0 && nf < this.filas && nc >= 0 && nc < this.columnas) {
                    if (this.tablero[nf][nc].esMina) count++;
                }
            }
        }
        return count;
    }

    revelar(f, c) {
        if (this.gameOver || this.tablero[f][c].revelada) return;
        this.tablero[f][c].revelada = true;
        if (this.tablero[f][c].esMina) {
            this.gameOver = true;
        } else if (this.tablero[f][c].minasCerca === 0) {
            this.revelarVacias(f, c);
        }
    }

    revelarVacias(f, c) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let nf = f + i, nc = c + j;
                if (nf >= 0 && nf < this.filas && nc >= 0 && nc < this.columnas) {
                    if (!this.tablero[nf][nc].revelada) this.revelar(nf, nc);
                }
            }
        }
    }
}

// Esto evita errores en el navegador
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Buscaminas;
}