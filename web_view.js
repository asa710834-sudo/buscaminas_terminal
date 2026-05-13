let juego;
let configActual = { filas: 8, columnas: 8, minas: 10 };

document.addEventListener('DOMContentLoaded', () => {
    cambiarDificultad(8, 8, 10);
    document.getElementById('reset-btn').onclick = () => {
        cambiarDificultad(configActual.filas, configActual.columnas, configActual.minas);
    };
});

function cambiarDificultad(f, c, m) {
    configActual = { filas: f, columnas: c, minas: m };
    juego = new Buscaminas(f, c, m);
    // Limpiar alertas
    document.getElementById('mensaje-victoria').classList.remove('visible');
    document.getElementById('mensaje-derrota').classList.remove('visible');
    renderizar();
}

function renderizar() {
    const contenedor = document.getElementById('tablero');
    const contadorTexto = document.getElementById('contador-banderas');
    
    contenedor.innerHTML = '';
    contenedor.style.gridTemplateColumns = `repeat(${configActual.columnas}, 35px)`;
    
    contadorTexto.innerText = configActual.minas - juego.banderasColocadas;

    if (juego.victoria) document.getElementById('mensaje-victoria').classList.add('visible');
    if (juego.gameOver) document.getElementById('mensaje-derrota').classList.add('visible');

    for (let f = 0; f < configActual.filas; f++) {
        for (let c = 0; c < configActual.columnas; c++) {
            const celdaData = juego.tablero[f][c];
            const div = document.createElement('div');
            div.classList.add('celda');
            div.classList.add((f + c) % 2 === 0 ? 'clara' : 'oscura');

            if (celdaData.revelada) {
                div.classList.add('revelada');
                if (celdaData.esMina) {
                    div.innerText = '💣';
                    div.classList.add('mina');
                } else if (celdaData.minasCerca > 0) {
                    div.innerText = celdaData.minasCerca;
                    div.classList.add(`num-${celdaData.minasCerca}`);
                }
            } else if (celdaData.bandera) {
                div.innerText = '🚩';
            }

            div.addEventListener('click', () => {
                if (!juego.gameOver && !juego.victoria) {
                    juego.revelar(f, c);
                    renderizar();
                }
            });

            div.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (!juego.gameOver && !juego.victoria) {
                    juego.alternarBandera(f, c);
                    renderizar();
                }
            });

            contenedor.appendChild(div);
        }
    }
}