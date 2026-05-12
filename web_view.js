document.addEventListener('DOMContentLoaded', () => {
    const filas = 10, columnas = 10, minasTotales = 15;
    const juego = new Buscaminas(filas, columnas, minasTotales);
    const contenedor = document.getElementById('tablero');
    const contadorTexto = document.getElementById('contador-banderas');
    const mensajeVic = document.getElementById('mensaje-victoria');

    function renderizar() {
        contenedor.innerHTML = '';
        contenedor.style.gridTemplateColumns = `repeat(${columnas}, 40px)`;
        
        // Al ganar, forzamos el marcador a 0 (estilo pro)
        contadorTexto.innerText = juego.victoria ? "0" : minasTotales - juego.banderasColocadas;

        if (juego.victoria) {
            contenedor.classList.add('ganador');
            mensajeVic.classList.add('visible');
        }

        for (let f = 0; f < filas; f++) {
            for (let c = 0; c < columnas; c++) {
                const celdaData = juego.tablero[f][c];
                const div = document.createElement('div');
                div.classList.add('celda');
                
                // Aplicar patrón de ajedrez
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

                // Eventos
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

    renderizar();
    document.getElementById('reset-btn').onclick = () => location.reload();
});