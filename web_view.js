// Esperamos a que cargue el HTML
document.addEventListener('DOMContentLoaded', () => {
    const filas = 10;
    const columnas = 10;
    const minas = 15;

    // Instanciamos tu lógica (asegúrate de que logic.js esté cargado antes)
    const juego = new Buscaminas(filas, columnas, minas);
    const contenedor = document.getElementById('tablero');

    // Ajustamos el CSS dinámicamente para que la cuadrícula encaje
    contenedor.style.gridTemplateColumns = `repeat(${columnas}, 35px)`;

    function renderizar() {
        contenedor.innerHTML = ''; // Limpiamos el tablero

        for (let f = 0; f < filas; f++) {
            for (let c = 0; c < columnas; c++) {
                const celdaData = juego.tablero[f][c];
                const div = document.createElement('div');
                div.classList.add('celda');

                if (celdaData.revelada) {
                    div.classList.add('revelada');
                    if (celdaData.esMina) {
                        div.classList.add('mina');
                        div.innerText = '💣';
                    } else if (celdaData.minasCerca > 0) {
                        div.innerText = celdaData.minasCerca;
                        // Color según el número (opcional)
                        div.style.color = ['','blue','green','red','darkblue','brown','cyan','black','grey'][celdaData.minasCerca];
                    }
                }

                // Evento TÁCTIL / CLIC
                div.addEventListener('click', () => {
                    if (celdaData.revelada) return;
                    
                    celdaData.revelada = true;
                    
                    if (celdaData.esMina) {
                        alert('💥 ¡BOOM! Fin del juego.');
                        location.reload(); // Reiniciar
                    } else {
                        renderizar(); // Dibujar de nuevo
                    }
                });

                contenedor.appendChild(div);
            }
        }
    }

    renderizar();
});
