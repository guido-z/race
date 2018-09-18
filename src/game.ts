export class Game {

    private readonly context: CanvasRenderingContext2D;

    constructor() {
        this.context = document.querySelector('canvas').getContext('2d');
    }

    run() {
        this.update();
        this.draw();
        requestAnimationFrame(this.run.bind(this));
    }

    private update() {

    }

    private draw() {

    }

}