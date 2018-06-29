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
    protector2: "./Images/protector2.png",
    enemies: "./Images/Enemie.png"

}
var sound = new Audio();
sound.src = "./Musica/HALO (Theme) (8 Bit Remix Cover Version) [Tribute to HALO] - 8 Bit Universe.mp3";
sound.loop = true;
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
    ganoUno(){
        ctx.font = "80px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Jugador UNO GANO", 0 ,canvas.height/2);

        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Press 7 for restart", 0 ,canvas.height/2 + 100);
    }
    ganoDos(){
        ctx.font = "80px Helvetic";
        ctx.fillStyle = "white";
        ctx.fillText("Jugador DOS GANO", 0 ,canvas.height/2);

        ctx.font = "50px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Press 7 for restart", 0 ,canvas.height/2 + 100);
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
        return  (this.x+5 < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height - 20) &&
                (this.y-10 + this.height > item.y);
                
      }
}
class ProtectThis{
    constructor(x = canvas.height,y,img){
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

class Protector1 extends Ships{
    constructor(x,y,img){
        super(x,y,img);
    }
}

class Enemies extends Ships{
    constructor(x,y,img){
        super(x,y,img);
        this.height = 30;
        
        
    } 
    draw(){
        this.x +=3; 
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}

//instances
var fondo = new Fondo();
var protector1 = new Protector1(canvas.width-150,canvas.height/2,images.protector1);
var protector2 = new Protector1(canvas.width-150,canvas.height/2 + 90,images.protector2);


//mainFunctions
function update(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fondo.draw();
    protector1.draw();
    //followShip();
    generateEnemies();
    drawEnemies();
    
    sound.play();
    
}

function update1(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fondo.draw();
    protector1.draw();
    protector2.draw();
    sound.play();

    //followShip();
    generateEnemies();
    drawEnemies1();
    
}

function start(){
    if (interval) return;
    interval = setInterval(update, 1000/60);
}

function start1(){
    if (interval) return;
    interval = setInterval(update1, 1000/60);
}


//aux functions
/* function followShip(){
    var engine = new ProtectThis(protector1.x + this.width,protector1.y, images.thishit);
    return engine.draw();
} */
function generateEnemies(){
    if(!(frames%25===0) ) return;

    var x = 0;
    var y = Math.floor((Math.random()* canvas.height));
    
    var ship1 = new Enemies(x, y, images.enemies);
    
    enemies.push(ship1);  
}


function soundBlast (){
    var blast = new Audio();
    blast.src = "./Musica/Explosion+3.mp3";
    blast.play();
}

function drawEnemies(){
enemies.forEach(function(ship){
    ship.draw();
    if(protector1.isTouching(ship)){
        soundBlast();
        adios();
        }
        
    })
}

function drawEnemies1(){
    enemies.forEach(function(ship){
        ship.draw();
        if(protector1.isTouching(ship)){
            soundBlast();
            adios2();
            
            }
            
        if(protector2.isTouching(ship)){
            soundBlast();
            adios1();
            
            }
        })
    }
    


function adios(){
    
    clearInterval(interval);
    interval = undefined;
    sound.pause();
    sound.currentTime = 0;
    
}

function adios1(){
    
    clearInterval(interval);
    interval = undefined;
    sound.pause();
    sound.currentTime = 0;
    fondo.ganoUno();
}
function adios2(){
    
    clearInterval(interval);
    interval = undefined;
    sound.pause();
    sound.currentTime = 0;
    fondo.ganoDos();
}


function restart()
{
    if(interval)return;
    else{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    frames = 0;
    enemies = [];
    protector1.x = canvas.width-150;
    protector1.y = canvas.height/2;
    protector2.x = canvas.width-150;
    protector2.y = canvas.height/2 +90;

    }   
}


//listeners
addEventListener('keydown', function(e){
    switch(e.keyCode){ 

                      
    case 87: if(protector1.y + 20 === 0) return;
        protector1.y -= 20;
    break;

    case 83: if(protector1.y > canvas.height) return; 
        protector1.y += 20;
    break;

    case 65: if(protector1.x === 0 + 25) return;
        protector1.x -=25;
    
    break;
    case 68: if(protector1.x > canvas.width -25) return; 
        protector1.x +=25;
    break; 
    }
})
addEventListener('keydown',function(e){
    switch(e.keyCode){
    case 38: protector2.y -=25;
    break;
    case 40: protector2.y +=25;
    break;
    case 37: protector2.x -=25;
    break;
    case 39 : protector2.x +=25;
    break;
    case 55: restart();
    break;
    }
})



document.getElementById("button").addEventListener('click',function(){
    if(interval) return;
    start();
    
    
})

document.getElementById("button1").addEventListener('click',function(){
    if(interval) return;
    start1();
})




