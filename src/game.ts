export class Game {

    constructor(private readonly context: CanvasRenderingContext2D) {}

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