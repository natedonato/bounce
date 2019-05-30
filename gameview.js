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

        if (x > 90) { x = 90;}
        if (x < -90) { x = -90;} // keep device rightside up

        x += 90;
        y += 90;
        document.getElementById("x").innerHTML = x;
        document.getElementById("y").innerHTML = y;
        
    }



}