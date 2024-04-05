/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext( '2d' );
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
ctx.lineWidth = 1;
ctx.globalCompositeOperation = 'destination-over';
class Root{ 
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 7 + 5;
        this.size = Math.random() * 1 + 2;
        this.vs = Math.random() * 0.2 + 0.05;
        this.angleX = Math.random() * 6.2;
        this.vax = Math.random() * 0.6 - 0.3;
        this.angleY = Math.random() * 6.2;
        this.vay = Math.random() * 0.6 - 0.3;
        this.lightness = 10;
    
    }
    update(){ 
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += this.vs;
        this.angleX += this.vax;
        this.angleY += this.vay;
        if(this.lightness < 70) this.lightness += 0.25;
        if(this.size < this.maxSize){ 
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'hsl(140,100%,'+this.lightness + '%)';
            ctx.fill();
            ctx.stroke(); 
            requestAnimationFrame(this.update.bind(this));
        }
    }
 }
    grow(){
        if(this.size < this.maxFlowerSize && this.willFlower){
            this.size += this.vs; 
            this.angle += this.va;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.restore();
            ctx.drawImage(this.image,  this.frameSize * this.frameX,this.frameSize * this.frameY , this.frameSize, this.frameSize, 0 - this.size/2, 0 - this.size/2, this.size, this.size);
            requestAnimationFrame(this.grow.bind(this));    
        } 
    }

 }
window.addEventListener('mousemove', function(e){ 
    if(drawing){
        for(let i =0; i < 3; i++){
            const root = new Root(e.x, e.y);
            root.update();   
        }
    }
 });
window.addEventListener('mousedown', function(e)
    { drawing = true;
        for(let i =0; i < 3; i++){
            const root = new Root(e.x, e.y);
            root.update();   
        } });
    
    
window.addEventListener('mouseup', function()
    { drawing = false; });
