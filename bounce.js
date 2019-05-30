
let gameView;
document.addEventListener("DOMContentLoaded", () =>{
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");
    // ctx.fillRect(50,50, 100, 100);

    gameView = new GameView(0, ctx, canvas.height, canvas.width).start();
});


class GameView {
    constructor(game, ctx, canvasheight, canvaswidth) {
        this.ctx = ctx;
        this.canvasheight = canvasheight;
        this.canvaswidth = canvaswidth;
        this.object = {pos: {x: 50, y: 50}, vel: {x: 0, y: 0}, w: 20, h: 20, maxspeed: 8};
        this.lastUpdated = 0;
        this.x = 90;
        this.y = 90;

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
        this.x = x;
        this.y = y;

        document.getElementById("y").innerHTML = this.y;
    }

    updatevel(dt){
        this.object.vel.x = dt * 2 * (this.x - 90)/90;
        this.object.vel.y = dt * 2 * (this.y - 90)/90;
    }

    updateObjectPos(dt){
        this.object.pos.x += this.object.vel.x * dt;
        this.object.pos.y += this.object.vel.y * dt;
        
        if(this.object.pos.x < 0){this.object.pos.x = 0;}
        else if(this.object.pos.x + this.object.w *2 > this.canvaswidth){this.object.pos.x = this.canvaswidth - this.object.w * 2;}

        if(this.object.pos.y < 0){this.object.pos.y = 0;}
        else if(this.object.pos.y + this.object.h *2> this.canvasheight){this.object.pos.y = this.canvasheight -  this.object.h *2;}

        this.ctx.fillRect(this.object.pos.x, this.object.pos.y, this.object.w, this.object.h);

    }

    update(timestamp) {
        const dt = (timestamp - this.lastUpdated) / 10;
        this.ctx.clearRect(0,0,this.canvaswidth, this.canvasheight);
        this.updatevel(dt);
        this.updateObjectPos(dt);

        this.lastUpdated = timestamp;
        requestAnimationFrame(this.update.bind(this));
    }


    start() {
        this.bindtilt();
        this.update(0);
    }
}