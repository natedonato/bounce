

document.addEventListener("DOMContentLoaded", () =>{
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");
    ctx.fillRect(50,50, 100, 100);

    const gameView = new GameView(0, ctx, canvas.height, canvas.width).bindtilt();
});


class GameView {
    constructor(game, ctx, canvasheight, canvaswidth) {
        this.canvasheight = canvasheight;
        this.canvaswidth = canvaswidth;
        this.object = {};
        this.lastUpdated = 0;
    }

    bindtilt() {


        window.addEventListener("deviceorientation", this.handleTilt);

    }

    handleTilt(event) {
        let x = event.beta;
        let y = event.gamma;

        if (x > 90) { x = 90; }
        if (x < -90) { x = -90; } // keep device rightside up

        x += 90;
        y += 90;
        document.getElementById("x").innerHTML = x;
        document.getElementById("y").innerHTML = y;

    }



}