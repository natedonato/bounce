

document.addEventListener("DOMContentLoaded", () =>{
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");
    ctx.fillRect(50,50, 100, 100);

    const gameView = new GameView(0, ctx, canvas.height, canvas.width).start();
});


class GameView {
    constructor(game, ctx, canvasheight, canvaswidth) {
        this.ctx = ctx;
        this.canvasheight = canvasheight;
        this.canvaswidth = canvaswidth;
        this.object = {pos: {x: 50, y: 50}, vel: {x: 0, y: 0}, w: 20, h: 20, maxspeed: 8};
        this.lastUpdated = 0;

    }

    bindtilt() {


        window.addEventListener("deviceorientation", this.recordTilt);

    }

    recordTilt(event) {
        let x = event.beta;
        let y = event.gamma;

        if (x > 90) { x = 90; }
        if (x < -90) { x = -90; } // keep device rightside up

        x += 90;
        y += 90;
        this.x = x;
        this.y = y;
    }

    handleTilt(){
        this.object.vel.x = 5 * (this.x - 90)/90;
        this.object.vel.y = 5 * (this.y - 90)/90;
    }

    updateObjectPos(dt){
        this.object.pos.x += this.object.vel.x * dt;
        this.object.pos.y += this.object.vel.y * dt;
        
        if(this.object.pos.x < 0){this.object.pos.x = 0;}
        else if(this.object.pos.x + this.object.w > this.canvaswidth){this.object.pos.x = this.canvaswidth - this.object.w;}

        if(this.object.pos.y < 0){this.object.pos.y = 0;}
        else if(this.object.pos.y + this.object.h > this.canvasheight){this.object.pos.y = this.canvasheight - this.object.h;}

        this.ctx.fillRect(this.object.pos.x, this.object.pos.y, this.object.w, this.object.h);

    }

    update(timestamp) {
        const dt = (timestamp - this.lastUpdated) / 10;
        this.handleTilt();
        this.updateObjectPos(dt);

        this.lastUpdated = timestamp;
        requestAnimationFrame(this.update.bind(this));
    }


    start() {
        this.bindtilt();
        this.update(0);
    }
}