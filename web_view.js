document.addEventListener('DOMContentLoaded', () => {
    const filas = 10, columnas = 10, minasTotales = 15;
    const juego = new Buscaminas(filas, columnas, minasTotales);
    const contenedor = document.getElementById('tablero');
    const contadorTexto = document.getElementById('contador-banderas');

    function renderizar() {
        contenedor.innerHTML = '';
        contenedor.style.gridTemplateColumns = `repeat(${columnas}, 40px)`;
        
        // Actualizar contador: Minas totales menos banderas puestas
        contadorTexto.innerText = minasTotales - juego.banderasColocadas;

        for (let f = 0; f < filas; f++) {
            for (let c = 0; c < columnas; c++) {
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
                    div.innerText = '🚩'; // Dibujamos la bandera
                    div.classList.add('bandera-puesta');
                }

                // Clic izquierdo (Revelar)
                div.addEventListener('click', () => {
                    juego.revelar(f, c);
                    renderizar();
                });

                // Clic derecho (Bandera)
                div.addEventListener('contextmenu', (e) => {
                    e.preventDefault(); // Evita que salga el menú del navegador
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