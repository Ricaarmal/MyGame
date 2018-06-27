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
var enemies = [];

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
    constructor(x = 0,y = 0, img){
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 50;
        this.Vx = 1;

        this.image = new Image();
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this);        
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
    
    isTouching(item){
        return  (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y);
      }
}
class ProtectThis{
    constructor(x =canvas.height,y,img){
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 50;
        this.direction = "down";

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

class Protector1 extends Ships{
    constructor(x,y,img){
        super(x,y,img);
    }
}

class Enemies extends Ships{
    constructor(x,y,img){
        super(x,y,img);
        
        
        
    } 
    draw(){
        this.x +=2; 
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}

//instances
var fondo = new Fondo();
var protector1 = new Protector1(canvas.width-150,canvas.height/2,images.protector1);
var protector2 = new Protector1(canvas.width-150,canvas.height/2,images.protector1);


//mainFunctions
function update(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fondo.draw();
    protector1.draw();
    followShip();
    generateEnemies();
    drawEnemies();
}

function update1(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fondo.draw();
    protector1.draw();
    protector2.draw()
    followShip();
    generateEnemies();
    drawEnemies();
}

function start(){
    interval = setInterval(update, 1000/60);
}

function start1(){
    interval = setInterval(update1, 1000/60);
}


//aux functions
function followShip(){
    var engine = new ProtectThis(protector1.x + this.width,protector1.y, images.thishit);
    return engine.draw();
}
function generateEnemies(){
    if(!(frames%20===0) ) return;

    var x = 0;
    var y = Math.floor((Math.random()*  canvas.height + 75));
    
    var ship1 = new Enemies(x, y, images.enemies);
    
    enemies.push(ship1);
    
}

function drawEnemies(){
enemies.forEach(function(ship){
    ship.draw();
    if(protector1.isTouching(ship)){
        gameover();
        }
    })
}

function adios(){
    interval = clear(interval);
}

//listeners
addEventListener('mousemove', function(e){
       protector1.x = e.clientX;
        protector1.y = e.clientY;
})
addEventListener('keydown',function(e){
    switch(e.keyCode){
    case 38: protector2.y -=20;
    break;
    case 40: protector2.y +=20;
    break;
    case 37: protector2.x -=20;
    break;
    case 39 : protector2.x +=20;
    break;
    }
})

document.getElementById("button").addEventListener('click',function(){
    start();
})

document.getElementById("button1").addEventListener('click',function(){
    start1();
})





