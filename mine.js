//canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//constants
var interval;
var frames = 0;
var images ={
    fondo: "./Images/Fondo.png",
    thishit: "./Images/Engine.png",
    protector1: "./Images/PelicanDropship.png",
    enemies: "./Images/Enemie.png"

}

//class
class Fondo{    
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = images.fondo;
        this.image.onload = function(){
            this.draw();
        }.bind(this);
    
    }

    draw(){
        this.x-=2;
        if(this.x === -this.width) this.x = 0;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.x+this.width,this.y,this.width,this.height);
    }
}

class Ships{
    constructor(x = 0,y = 0,img){
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 50;

        this.image = new Image();
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this);        
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}
class ProtectThis extends Ships{
    constructor(x,y,img){
        super(x,y,img);

    }
}
class Protector1 extends Ships{
    constructor(x,y,img){
        super(x,y,img);
    }
}


//instances
var fondo = new Fondo();
var protector1 = new Protector1(canvas.width-150,canvas.height/2,images.protector1);
var protectThis = new ProtectThis(canvas.width-75,canvas.height/2,images.thishit);


//mainFunctions
function update(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fondo.draw();
    protector1.draw();
    protectThis.draw();
    
}

function start(){
    interval = setInterval(update, 1000/60);
}

//aux functions


//listeners

start();