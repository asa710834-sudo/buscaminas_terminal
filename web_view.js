document.addEventListener('DOMContentLoaded', () => {
    const filas = 10;
    const columnas = 10;
    const minas = 15;
    let juego = new Buscaminas(filas, columnas, minas);
    const contenedor = document.getElementById('tablero');

    function renderizar() {
        contenedor.innerHTML = '';
        contenedor.style.gridTemplateColumns = `repeat(${columnas}, 40px)`;

        for (let f = 0; f < filas; f++) {
            for (let c = 0; c < columnas; c++) {
                const celdaData = juego.tablero[f][c];
                const div = document.createElement('div');
                div.classList.add('celda');

                // Patrón de ajedrez
                div.classList.add((f + c) % 2 === 0 ? 'clara' : 'oscura');

                if (celdaData.revelada) {
                    div.classList.add('revelada');
                    if (celdaData.esMina) {
                        div.innerText = '💣';
                        div.classList.add('mina');
                    } else if (celdaData.minasCerca > 0) {
                        div.innerText = celdaData.minasCerca;
                        div.classList.add(`num-${celdaData.minasCerca}`);
                    } else {
                        // Es un cero, lo dejamos vacío pero con estilo de revelado
                        div.innerText = '';
                    }
                }

                div.addEventListener('click', () => {
                    if (!juego.gameOver) {
                        juego.revelar(f, c);
                        renderizar(); // Volvemos a dibujar todo el tablero actualizado
                        
                        if (juego.gameOver && celdaData.esMina) {
                            setTimeout(() => alert("¡BOOM! Has perdido"), 50);
                        }
                    }
                });

                contenedor.appendChild(div);
            }
        }
    }

    // Botón de reiniciar
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            location.reload();
        });
    }

    renderizar();
});