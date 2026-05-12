document.addEventListener('DOMContentLoaded', () => {
    const filas = 10;
    const columnas = 10;
    const minas = 15;
    const juego = new Buscaminas(filas, columnas, minas);
    const contenedor = document.getElementById('tablero');

    function renderizar() {
        contenedor.innerHTML = '';
        contenedor.style.gridTemplateColumns = `repeat(${columnas}, 40px)`;

        for (let f = 0; f < filas; f++) {
            for (let c = 0; c < columnas; c++) {
                const celdaData = juego.tablero[f][c];
                const div = document.createElement('div');
                div.classList.add('celda');

                // Lógica de ajedrez puro (0101 / 1010)
                if ((f + c) % 2 === 0) {
                    div.classList.add('clara');
                } else {
                    div.classList.add('oscura');
                }

                if (celdaData.revelada) {
                    div.classList.add('revelada');
                    if (celdaData.esMina) {
                        div.innerText = '💣';
                        div.style.backgroundColor = '#ff4d4d'; 
                    } else if (celdaData.minasCerca > 0) {
                        div.innerText = celdaData.minasCerca;
                        div.classList.add(`num-${celdaData.minasCerca}`);
                    }
                }

                div.addEventListener('click', () => {
                    if (!juego.gameOver) {
                        juego.revelar(f, c);
                        renderizar();
                        if (juego.gameOver && celdaData.esMina) {
                            setTimeout(() => alert("💥 ¡BOOM! Has perdido."), 10);
                        }
                    }
                });

                contenedor.appendChild(div);
            }
        }
    }

    renderizar();
    document.getElementById('reset-btn').onclick = () => location.reload();
});