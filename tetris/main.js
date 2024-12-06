import { Game } from "./game.js";

const canvasTetris = document.getElementById("canvas-tetris");
const canvasNext = document.getElementById("canvas-next");
const rows = 20;
const cols = 10;
const cellSize = 26;
const space = 2;
const score = document.getElementById("score");
const btnMenu = document.getElementById("btn-start");
const menu = document.getElementById("menu");
const gameOverDiv = document.getElementById("gameOverDiv"); // Cambié el nombre a gameOverDiv para mayor claridad
const gameOverButton = document.getElementById("gameOverButton"); // Asegúrate de que este ID sea correcto

const game = new Game(canvasTetris, rows, cols, cellSize, space, canvasNext);

function update() {
    if (game.gameOver) {
        menu.style.display = "flex"; // Oculta el menú si está visible
    } else {
        game.update();
        score.innerHTML = game.score;
        gameOverDiv.style.display = "none"; // Asegúrate de ocultar el div de Game Over si el juego sigue
    }

    requestAnimationFrame(update);
}



btnMenu.addEventListener("click", () => {
    setTimeout(() => {
        menu.style.display = 'none';
        update();
        game.reset();
    }, 200);
});

gameOverButton.addEventListener("click", () => {
    console.log("SIRVE")
    gameOverDiv.style.display = "none"; // Oculta el div de Game Over al presionar el botón
});

let botonGuia = document.getElementById("btn-instrucciones");
let divGuia = document.getElementById("guia");

botonGuia.addEventListener("click", () => {
    console.log('hola');
    divGuia.style.display = 'flex';
});

let botonSalir = document.getElementById("salir");

botonSalir.addEventListener("click", () => {
    console.log('sirve');
    divGuia.style.display = 'none';
});



