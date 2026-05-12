class Buscaminas {
    constructor(filas, columnas, numMinas) {
        this.filas = filas;
        this.columnas = columnas;
        this.numMinas = numMinas;
        this.tablero = [];
        this.gameOver = false;
        this.victoria = false;
        this.minasColocadas = false;
        this.banderasColocadas = 0;
        this.inicializarTablero();
    }

    inicializarTablero() {
        this.tablero = Array.from({ length: this.filas }, () =>
            Array.from({ length: this.columnas }, () => ({
                esMina: false, revelada: false, bandera: false, minasCerca: 0
            }))
        );
    }

    colocarMinas(fExcluir, cExcluir) {
        let colocadas = 0;
        while (colocadas < this.numMinas) {
            let f = Math.floor(Math.random() * this.filas);
            let c = Math.floor(Math.random() * this.columnas);
            
            // Hueco de 3x3 seguro alrededor del primer clic
            let distF = Math.abs(f - fExcluir);
            let distC = Math.abs(c - cExcluir);

            if (!this.tablero[f][c].esMina && (distF > 1 || distC > 1)) {
                this.tablero[f][c].esMina = true;
                colocadas++;
            }
        }
        this.calcularNumeros();
        this.minasColocadas = true;
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

    alternarBandera(f, c) {
        if (this.gameOver || this.victoria || this.tablero[f][c].revelada) return;
        
        const celda = this.tablero[f][c];
        if (!celda.bandera && this.banderasColocadas < this.numMinas) {
            celda.bandera = true;
            this.banderasColocadas++;
        } else if (celda.bandera) {
            celda.bandera = false;
            this.banderasColocadas--;
        }
    }

    revelar(f, c) {
        if (this.gameOver || this.victoria || this.tablero[f][c].revelada || this.tablero[f][c].bandera) return;
        
        if (!this.minasColocadas) this.colocarMinas(f, c);
        
        this.tablero[f][c].revelada = true;
        
        if (this.tablero[f][c].esMina) {
            this.gameOver = true;
        } else {
            if (this.tablero[f][c].minasCerca === 0) this.revelarVacias(f, c);
            this.verificarVictoria();
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

    verificarVictoria() {
        let celdasSegurasPorRevelar = 0;
        for (let f = 0; f < this.filas; f++) {
            for (let c = 0; c < this.columnas; c++) {
                if (!this.tablero[f][c].esMina && !this.tablero[f][c].revelada) {
                    celdasSegurasPorRevelar++;
                }
            }
        }
        if (celdasSegurasPorRevelar === 0) this.victoria = true;
    }
}

if (typeof module !== 'undefined' && module.exports) module.exports = Buscaminas;