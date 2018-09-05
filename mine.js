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
        var points = 0;
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
        this.puntuacion();
    }
    puntuacion(){
     ctx.font = "50px Arial"
     ctx.fillStyle = "green";
     ctx.fillText(0, 760,50);           
    }
}

class Ships{
    constructor(x = 0,y = 0,img){
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 50;
        this.vY = 1; 
        this.image = new Image();
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this);        
    }
    
    draw(){
        this.vY ++;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}
class ProtectThis{
    constructor(x = 0,y = 0,img){
        this.x=x;
        this.y=y;
        this.width = 75;
        this.height = 68;
        this.direction = 'down';

        this.image = new Image();
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this);

    }
    draw(){
      

        if(this.y > 612 -50) this.direction = 'up';

        if(this.y < 1) this.direction = 'down';
        if(this.direction === "up"){
            this.y -= 2;
        }else{
            this.y += 2;
        }   
       
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}
        
class Protector1 extends Ships{
    constructor(x,y,img){
        super(x,y,img);
    }
}

class Enemie extends Ships{
    constructor(x,y,img){
        super(x,y,img);
    }
}

//instances
var fondo = new Fondo();
var protector1 = new Protector1(canvas.width-150,canvas.height/2,images.protector1);
var protectThis = new ProtectThis(canvas.width-75,canvas.height/2,images.thishit);
var enemies = new Enemie(100,100,images.enemies)


//mainFunctions
function update(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fondo.draw();
    
    protector1.draw();
    protectThis.draw();
    enemies.draw();
    
}

function start(){
    interval = setInterval(update, 1000/60);
}

//aux functions
function enemieRandom(enemie){
    Math.random(Math.floor())
}

//listeners
addEventListener("keydown",function(e){
    switch(e.keyCode){
        case 87:
        if(protector1.y < 0) return;
        protector1.y -=50;
        break;

        case 83:
        if(protector1.y > canvas.height-protector1.height) return;
        protector1.y +=50;
        break;
         
    }
 
})
start();