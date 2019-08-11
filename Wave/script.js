(() => {

  const properties = {
    spaceDiameter : 32,
    dotDiameter : 12,
    wevelength : 100,
    velocity : .02,
    direction : 1,
    displacement : 1
  }


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

let dotsList;

canvas.style.background = 'rgba(17,17,23,1)';
document.querySelector('body').appendChild(canvas);

window.onresize = function(){
   w = canvas.width = innerWidth;
   h = canvas.height = innerHeight;

   init();
   

}


class Dot{

  constructor(x, y, num){

    this.x = x;
    this.y = y;
    this.radius = properties.dotDiameter / 2;
    this.scale = getDistance(x, y) / properties.wevelength;
    this.text = num;
  }

  update (){
    this.resize();
    this.drow();
  }

  resize(){
    this.scale = this.scale - properties.velocity * properties.direction;
  }

  drow(){

    let s = ( 1 - Math.abs(Math.sin(this.scale)));
    let o = (1 - s) * 255;
    let r = this.radius * s;// abs получаем значение без знака минус

    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, 2*Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, '+ o +', '+ o +', '+ s +')';
    ctx.fill();
  }
}

  init();

function init(){

  dotsList = [];

  // Округляем битовой операцией ( Вместо )=> Math.floor(w/properties.spaseDiameter)
  const dotsCountx = w / properties.spaceDiameter | 0;
  const dotsCounty = h / properties.spaceDiameter | 0;
  const startx = (properties.spaceDiameter + w - dotsCountx * properties.spaceDiameter) / 2;
  const starty = (properties.spaceDiameter + h - dotsCounty * properties.spaceDiameter) / 2;

  
  let displacement = properties.spaceDiameter / 4 * properties.displacement;

   for (let j = 0; j < dotsCounty; j++){
     displacement = - displacement;
    let y =  starty + j * properties.spaceDiameter;   
    for(let i = 0; i < dotsCountx; i++){

    let x =  startx + i * properties.spaceDiameter + displacement;
    dotsList.push(new Dot(x, y, j + i));

     }  
    }
  
}
   loop();

  function loop(){
    ctx.clearRect(0, 0, w, h);
   for ( let a in dotsList){
     dotsList[a].update();
   }

   requestAnimationFrame(loop);
  }
  
  function getDistance(x, y){
    let dx = w / 2 - x;
    let dy = h / 2 - y;

    return Math.sqrt((dx * dx) + (dy * dy));
  }





}) ();