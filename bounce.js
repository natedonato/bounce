
let gameView;
document.addEventListener("DOMContentLoaded", () =>{

    var img = new Image();
    img.src = "./emoji.svg";

    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext("2d");
    // ctx.fillRect(50,50, 100, 100);

    gameView = new GameView(0, ctx, canvas.height, canvas.width, img).start();
});


class GameView {
    constructor(game, ctx, canvasheight, canvaswidth, img) {
        this.ctx = ctx;
        this.canvasheight = canvasheight;
        this.canvaswidth = canvaswidth;
        this.object = {pos: {x: 50, y: 50}, vel: {x: 0, y: 0}, w: 75, h: 75, maxspeed: 16};
        this.lastUpdated = 0;
        this.x = 90;
        this.y = 90;
        this.handleTilt = this.handleTilt.bind(this);
        this.blipSound = new Audio('./blip.wav');
        this.blipSound.volume = 0.2;
        this.img = img;
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
        this.object.vel.x += dt * 8 * (this.x - 90)/45;

        const maxspeed = this.object.maxspeed;
        if(this.object.vel.x > maxspeed){this.object.vel.x = maxspeed;}
        
        if(this.object.vel.x < -maxspeed){this.object.vel.x = -maxspeed;}
        
        this.object.vel.y += dt * 8 * (this.y - 90)/45;


        if (this.object.vel.y > maxspeed) { this.object.vel.y = maxspeed; }
        if (this.object.vel.y < -maxspeed) { this.object.vel.y = -maxspeed; }
    }

    updateObjectPos(dt){
        this.object.pos.x += this.object.vel.x * dt;
        this.object.pos.y += this.object.vel.y * dt;
        

        
        if(this.object.pos.x < 0){
            this.object.pos.x = 0; 
            this.play();
            this.object.vel.x = -this.object.vel.x * 0.9;
        
        }
        else if (this.object.pos.x + this.object.w > this.canvaswidth) { 
            this.object.pos.x = this.canvaswidth - this.object.w; 
            this.play();
            this.object.vel.x = -this.object.vel.x * 0.8;}

        if (this.object.pos.y < 0) { 
            this.object.pos.y = 0; 
            this.play();
            this.object.vel.y = -this.object.vel.y * 0.9;}
        else if (this.object.pos.y + this.object.h * 2 > this.canvasheight) { 
            this.object.pos.y = this.canvasheight - this.object.h * 2; 
            this.object.vel.y = -this.object.vel.y * 0.8;
            this.play();}

        // this.ctx.fillRect(this.object.pos.x, this.object.pos.y, this.object.w, this.object.h);
        this.ctx.drawImage(this.img, this.object.pos.x, this.object.pos.y, this.object.w, this.object.h);
    }

    play(){
        if (this.blipSound.paused) {
            this.blipSound.play();
        } else {
            this.blipSound.pause();
            this.blipSound.currentTime = 0;
            this.blipSound.play();
        }
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