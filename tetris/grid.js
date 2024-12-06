import { Tetromino } from "./tetromino.js";

export class Grid {
    constructor(canvas, rows, cols, cellSize, space) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.space = space;
        this.matriz = [];
        this.restartMatriz();

        this.canvas.width = this.cols * this.cellSize + (this.space * this.cols);
        this.canvas.height = this.rows * this.cellSize + (this.space * this.rows);

        this.block = new Tetromino(this.canvas, this.cellSize)
    }

    restartMatriz() {
        for (let r = 0; r < this.rows; r++) {
            this.matriz[r] = [];
            for (let c = 0; c < this.cols; c++) {
                this.matriz[r][c] = 0;
            }
        }
    }

    drawSquare(x, y, side, color, borderColor) {
        const bordeSide = side / 10;

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, side, side);

        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = bordeSide;
        this.ctx.strokeRect(x + bordeSide / 2, y + bordeSide, side - bordeSide, side - bordeSide);
    }

    getCordinates(col, row) {
        return { x: col * (this.cellSize + this.space), y: row * (this.cellSize + this.space) };
    }

    draw() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const position = this.getCordinates(c, r);
                this.drawSquare(position.x, position.y, this.cellSize, "#000", "#303030");

                if(this.matriz[r][c] !== 0){
                    this.block.drawBlock(position.x, position.y, this.matriz[r][c])
                }
                else {
                    this.drawSquare(position.x, position.y, this.cellSize, "#000", "#303030")
                }
            }
        }
        this.printMatriz()
    }

    draw2() {
        this.drawBackground(); // Dibuja el fondo
    
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const position = this.getCordinates(c, r); // Obtiene las coordenadas para el bloque
    
                if (this.matriz[r][c] !== 0) { // Verifica si la celda no está vacía
                    if (this.matriz[r][c] === 2) {
                        this.block.drawBlock(position.x + this.cellSize, position.y, this.matriz[r][c]);
                    } else if (this.matriz[r][c] === 3) {
                        this.block.drawBlock(position.x, position.y, this.matriz[r][c]);
                    } else {
                        this.block.drawBlock(position.x + this.cellSize / 2, position.y, this.matriz[r][c]);
                    }
                }
            }
        }
    
        this.printMatriz(); // Imprime la matriz (opcional)
    }

    drawBackground(){
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height)
    }

    printMatriz(){
        let text = ""
        this.matriz.forEach((row)=>{
            text += row.join(" ") + "\n"
        })
        console.log(text)
    }
}