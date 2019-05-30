
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
        this.object = {pos: {x: 50, y: 50}, vel: {x: 0, y: 0}, w: 20, h: 20, maxspeed: 16};
        this.lastUpdated = 0;
        this.x = 90;
        this.y = 90;
        this.handleTilt = this.handleTilt.bind(this);
    }


    bindtilt() {
        window.addEventListener("deviceorientation", this.handleTilt);

    }

    handleTilt(event) {
        let y = event.beta;
        let x = event.gamma;

        if (x > 90) { x = 90; }
        if (x < -90) { x = -90; } // keep device rightside up

        x += 90;
        y += 90;
        this.x = x;
        this.y = y;
        // document.getElementById("x").innerHTML = this.y;

        // document.getElementById("y").innerHTML = this.y;
    }

    updatevel(dt){
        this.object.vel.x += dt * 8 * (this.x - 90)/90;

        if(this.object.vel.x > 10){this.object.vel.x = 10;}
        
        if(this.object.vel.x < -10){this.object.vel.x = -10;}
        
        this.object.vel.y += dt * 8 * (this.y - 90)/90;
        
        if (this.object.vel.y > 10) { this.object.vel.y = 10; }
        if (this.object.vel.y < -10) { this.object.vel.y = -10; }
    }

    updateObjectPos(dt){
        this.object.pos.x += this.object.vel.x * dt;
        this.object.pos.y += this.object.vel.y * dt;

        
        if(this.object.pos.x < 0){this.object.pos.x = 0; this.object.vel.x = -this.object.vel.x * 0.8;}
        else if (this.object.pos.x + this.object.w > this.canvaswidth) { this.object.pos.x = this.canvaswidth - this.object.w; this.object.vel.x = -this.object.vel.x * 0.8;}

        if (this.object.pos.y < 0) { this.object.pos.y = 0; this.object.vel.y = -this.object.vel.y * 0.8;}
        else if (this.object.pos.y + this.object.h * 2 > this.canvasheight) { this.object.pos.y = this.canvasheight - this.object.h * 2; this.object.vel.y = -this.object.vel.y * 0.8;}

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