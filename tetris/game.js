import { BoardNext, BoardTetris } from './boardTetris.js';
import { TetrominoBag } from './tetromino.js';

export class Game {
    constructor(canvas, rows, cols, cellSize, space, canvasNext) {
        this.boardTetris = new BoardTetris(canvas, rows, cols, cellSize, space);
        this.tetrominoBag = new TetrominoBag(canvas, cellSize);
        this.currentTetromino = this.tetrominoBag.nextTetromino();
        this.keyboar();
        this.keys = { up: false, down: false };

        this.lastTime = 0;
        this.lastTime2 = 0;

        this.next = new BoardNext(canvasNext, 8, 4, cellSize, space, this.tetrominoBag.getThreeNextTetromino());

        this.score = 0;
        this.gameOver = false;

        this.questions = [
            {
                question: "¿Cuántas maneras hay de elegir 2 elementos de un conjunto de 5 elementos?",
                options: ["5", "10", "15", "20"],
                answer: "10"
            },
            {
                question: "Si lanzas un dado, ¿cuál es la probabilidad de obtener un número par?",
                options: ["1/2", "1/3", "1/6", "1/4"],
                answer: "1/2"
            },
            {
                question: "¿Cuántas permutaciones se pueden hacer con las letras de la palabra 'GATO'?",
                options: ["12", "16", "24", "32"],
                answer: "24"
            },
            {
                question: "En un grupo de 10 personas, ¿cuántas maneras hay de formar un comité de 3 personas?",
                options: ["120", "210", "100", "90"],
                answer: "120"
            },
            {
                question: "Si tienes 3 camisetas y 2 pantalones, ¿cuántas combinaciones diferentes de ropa puedes usar?",
                options: ["5", "6", "7", "8"],
                answer: "6"
            },
            {
                question: "¿Cuántas maneras hay de organizar 4 libros en una estantería?",
                options: ["12", "16", "24", "36"],
                answer: "24"
            },
            {
                question: "Si lanzas dos monedas, ¿cuál es la probabilidad de obtener al menos una cara?",
                options: ["1/4", "1/2", "3/4", "1/3"],
                answer: "3/4"
            },
            {
                question: "¿Cuántas combinaciones de 5 elementos se pueden formar a partir de un conjunto de 8 elementos?",
                options: ["56", "70", "80", "90"],
                answer: "56"
            },
            {
                question: "Si tienes 5 tipos de helados y quieres elegir 3, ¿cuántas combinaciones diferentes puedes hacer?",
                options: ["10", "15", "20", "25"],
                answer: "10"
            },
            {
                question: "¿Cuántas maneras hay de elegir 3 cartas de una baraja de 52 cartas?",
                options: ["1326", "22100", "17296", "19600"],
                answer: "22100"
            },
            {
                question: "¿Cuántas maneras hay de organizar 5 personas en una fila?",
                options: ["60", "120", "240", "360"],
                answer: "120"
            },
            {
                question: "Si un restaurante ofrece 4 tipos de ensaladas y 3 tipos de aderezos, ¿cuántas combinaciones de ensaladas y aderezos se pueden hacer?",
                options: ["7", "10", "12", "15"],
                answer: "12"
            },
            {
                question: "¿Cuántas maneras hay de seleccionar 2 frutas de un conjunto de 6 frutas?",
                options: ["15", "20", "30", "36"],
                answer: "15"
            },
            {
                question: "Si tienes 4 amigos y quieres elegir 2 para ir al cine, ¿cuántas combinaciones diferentes puedes hacer?",
                options: ["4", "6", "8", "10"],
                answer: "6"
            },
            {
                question: "¿Cuántas maneras hay de elegir 1 libro de un estante que tiene 8 libros?",
                options: ["8", "16", "24", "32"],
                answer: "8"
            },
            {
                question: "Si lanzas un dado y una moneda, ¿cuántos resultados diferentes son posibles?",
                options: ["6", "12", "18", "24"],
                answer: "12"
            },
            {
                question: "¿Cuántas maneras hay de elegir 3 colores de una paleta de 10 colores?",
                options: ["120", "210", "100", "90"],
                answer: "120"
            },
            {
                question: "Si tienes 3 tipos de pasteles y 4 tipos de helados, ¿cuántas combinaciones de postres puedes hacer?",
                options: ["7", "10", "12", "15"],
                answer: "12"
            },
            {
                question: "¿Cuántas maneras hay de organizar 6 sillas en una mesa?",
                options: ["720", "600", "480", "360"],
                answer: "720"
            }]

        this.questionInterval = null; // Para almacenar el temporizador de preguntas
        this.fallSpeed = 3000; // Velocidad de caída inicial en milisegundos
        this.startQuestionTimer(); // Inicia el temporizador de preguntas
    }

    startQuestionTimer() {
        this.questionInterval = setInterval(() => {
            this.displayRandomQuestion();
        }, 60000); // 60000 ms = 1 minuto
    }

    displayRandomQuestion() {
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        const question = this.questions[randomIndex];

        // Mostrar la pregunta y opciones en la consola
        console.log(question.question);
        question.options.forEach((option, index) => {
            console.log(`${index + 1}: ${option}`);
        });

        // Captura la respuesta del usuario
        const userAnswer = prompt(question.question + "\n" + question.options.join("\n"));
        this.checkAnswer(userAnswer, question.answer);
    }

    checkAnswer(selected, correct) {
        if (selected === correct) {
            alert("Respuesta correcta");
            // No reiniciar el juego aquí, solo continuar
        } else {
            alert("Respuesta incorrecta");
            this.increaseFallingSpeed();
        }
    }

    increaseFallingSpeed() {
        this.fallSpeed = Math.max(100, this.fallSpeed - 100); // Aumentar la velocidad de caída
        console.log(`La velocidad de caída ahora es: ${this.fallSpeed} ms`);
    }

    update() {
        let currentTime = Date.now();
        let deltaTime = currentTime - this.lastTime;
        let deltaTime2 = currentTime - this.lastTime2;

        if (deltaTime >= this.fallSpeed) {
            this.autoMoveTetrominoDown();
            this.lastTime = currentTime;
        }

        if (deltaTime2 >= 50) {
            this.boardTetris.draw();
            this.currentTetromino.draw(this.boardTetris);
            this.next.draw2();

            if (this.keys.down) {
                this.moveTetrominoDown();
            }

            this.lastTime2 = currentTime;
        }
    }

    //VELOCIDAD AL BAJAR

    autoMoveTetrominoDown(){
        this.currentTetromino.move(1, 0);
        if (this.blockedTetromino()) {
            this.currentTetromino.move(-1, 0);
            this.placeTetromino();
        }
    }

    blockedTetromino(){
        const tetrominoPositions = this.currentTetromino.currentPosition()
        for (let i = 0; i < tetrominoPositions.length; i++) {
            if(!this.boardTetris.isEmpty(tetrominoPositions[i].row, tetrominoPositions[i].column)){
              return true  
            }
        }
        return false
    }
    moveTetrominoLeft(){
        this.currentTetromino.move(0,-1)
        if(this.blockedTetromino()){
            this.currentTetromino.move(0,1)   
        }
    }
    moveTetrominoRigth(){
        this.currentTetromino.move(0,1)
        if(this.blockedTetromino()){
            this.currentTetromino.move(0,-1)   
        }
    }
    moveTetrominoRigth(){
        this.currentTetromino.move(0,1)
        if(this.blockedTetromino()){
            this.currentTetromino.move(0,-1)   
        }
    }
    moveTetrominoDown(){
        this.currentTetromino.move(1,0)
        if(this.blockedTetromino()){
            this.currentTetromino.move(-1,0)   
        }
    }
    rotationTetrominoCW(){
        this.currentTetromino.rotation++
        if(this.currentTetromino.rotation > this.currentTetromino.shapes.length-1){
            this.currentTetromino.rotation = 0
        }
        if(this.blockedTetromino()){
            this.rotationTetrominoCCW()
        }
    }
    rotationTetrominoCCW(){
        this.currentTetromino.rotation--
        if(this.currentTetromino.rotation<0){
            this.currentTetromino.rotation = this.currentTetromino.shapes.length - 1
        }
        if(this.blockedTetromino()){
            this.rotationTetrominoCW()
        }
    }

placeTetromino() {
        const tetrominoPositions = this.currentTetromino.currentPosition();
        for (let i = 0; i < tetrominoPositions.length; i++) {
            this.boardTetris.matriz[tetrominoPositions[i].row][tetrominoPositions[i].column] = this.currentTetromino.id;
        }

        this.score += this.boardTetris.clearFullRow() * 7;

        // AQUI SE PIERDE
        if (this.boardTetris.gameOver()) {
            console.log("perdiste");
            this.askQuestion(); // Llama a la función para preguntar
            return true;
        } else {
            this.currentTetromino = this.tetrominoBag.nextTetromino();
            this.next.listTetrominos = this.tetrominoBag.getThreeNextTetromino();
            this.next.updateMatriz();
        }
    }

    askQuestion() {
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        const question = this.questions[randomIndex];

        // Mostrar la pregunta y opciones en la consola
        console.log(question.question);
        question.options.forEach((option, index) => {
            console.log(`${index + 1}: ${option}`);
        });

        // Captura la respuesta del usuario
        const userAnswer = prompt(question.question + "\n" + question.options.join("\n"));
        this.checkAnswer2(userAnswer, question.answer);
    }

    checkAnswer2(selected, correct) {
        if (selected === correct) {
            alert("Respuesta correcta");
            this.reset(); // Reinicia el juego sin perder el score
        } else {
            alert("Respuesta incorrecta");
            this.gameOver = true; // Mantiene el estado de juego perdido
        }
    }

    //Este es para reiniciar el juego hacerlo pero si gana la preguta
    reset(){
        this.gameOver = false
        this.boardTetris.restartMatriz()
        this.score = 0
        this.hold.tetromino = null
        this.tetrominoBag.reset()
        this.currentTetromino = this.tetrominoBag.nextTetromino()

        this.next.restartMatriz()
        this.next.listTetrominos = this.tetrominoBag.getNextTetromino()
        this.next.updateMatriz()
    }
    keyboar(){
        window.addEventListener("keydown", (evt) =>{
            if(evt.key === 'ArrowLeft'){
                this.moveTetrominoLeft()
            }
            if(evt.key === 'ArrowRight'){
                this.moveTetrominoRigth()
            }
            if(evt.key === 'ArrowUp' && !this.keys.up){
                this.rotationTetrominoCW()
                this.keys.up = true
            }
            if(evt.key === 'ArrowDown'){
                this.moveTetrominoDown()

                this.keys.down = true
            }
        })

        window.addEventListener("keyup", (evt) => {
            if(evt.key === 'ArrowUp'){
                this.keys.up = false
            }
            if(evt.key === 'ArrowDown'){
                this.keys.down = false
            }
        })

    }
}