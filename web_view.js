document.addEventListener('DOMContentLoaded', () => {
    const filas = 10, columnas = 10, minasTotales = 15;
    const juego = new Buscaminas(filas, columnas, minasTotales);
    const contenedor = document.getElementById('tablero');
    const contadorTexto = document.getElementById('contador-banderas');

    function renderizar() {
        contenedor.innerHTML = '';
        contenedor.style.gridTemplateColumns = `repeat(${columnas}, 40px)`;
        
        contadorTexto.innerText = minasTotales - juego.banderasColocadas;

        for (let f = 0; f < filas; f++) {
            for (let c = 0; c < columnas; c++) {
                const celdaData = juego.tablero[f][c];
                const div = document.createElement('div');
                div.classList.add('celda');
                const tipoColor = (f + c) % 2 === 0 ? 'clara' : 'oscura';
                div.classList.add(tipoColor);

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
                    juego.revelar(f, c);
                    renderizar();
                    if (juego.victoria) {
                        setTimeout(() => alert("🏆 ¡FELICIDADES! Has despejado todas las minas."), 100);
                    }
                    if (juego.gameOver && celdaData.esMina) {
                        setTimeout(() => alert("💥 BOOM! Juego terminado."), 100);
                    }
                });

                div.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    juego.alternarBandera(f, c);
                    renderizar();
                });

                contenedor.appendChild(div);
            }
        }
    }

    renderizar();
    document.getElementById('reset-btn').onclick = () => location.reload();
});