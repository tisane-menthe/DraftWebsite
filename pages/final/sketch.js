let size = 40;
let radius = 60;

let margin = 100; 

let textColor = "rgba(240, 240, 240, 1)";
let shadowColor =   "rgba(200, 13, 130, 0.6)";

let rectColor =   "rgba(255, 255, 255, 1)";
let ellColor =   "rgba(240, 240, 240 , 1)";

let ellipses = [];
let maxDist;
let maxLines = 12;

let clickEllipse = []; 

function setup() {


  canvas = createCanvas(windowWidth, windowHeight, WEBGL);

  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  
  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST);

  
  ellipses.push(new CreateEllipse(0, 0, radius));
  ellipses.push(new CreateEllipse(0, 0, radius));
  ellipses.push(new CreateEllipse(0, 0, radius));
  ellipses.push(new CreateEllipse(0, 0, radius));

  maxDist = dist(-width/2, -height/2, width/2, height/2);

  ellipses[0].setPosition("digital");
  ellipses[1].setPosition("blog");
  ellipses[2].setPosition("projects");
  ellipses[3].setPosition("about");


}

function draw() {

 background('rgba(11, 255, 212,0.6)');
console.log(clickEllipse);

noStroke();
fill(255);
rect(0, -height/2, width/2, height);

  noStroke();
  
   let remapX = map(mouseX, 0, width, -width/2, width/2);
   let remapY = map(mouseY, 0, height, -height/2, height/2);

  
  stroke('rgba(11, 255, 212,0.6)');
  strokeWeight(1);
  for (var k = 0; k < maxLines; k++) {

    var posHeight_top = -height/2 + ((remapY + height/2)/maxLines) * k;
    var posWidth_left = -width/2 + ((remapX + width/2)/maxLines) * k;
    
    line(-width/2, posHeight_top, width/2, posHeight_top);
    line(posWidth_left, -height/2, posWidth_left, height/2);

    var posHeight_bottom = remapY + ((height/2 - remapY)/maxLines) * k;
    var posWidth_right = remapX + ((width/2 - remapX)/maxLines) * k;

    line(-width/2, posHeight_bottom, width/2, posHeight_bottom);
    line(posWidth_right, -height/2, posWidth_right, height/2);
  }
  
    
  for (var j = 0 ; j < ellipses.length; j++) {
   ellipses[j].display(remapX, remapY); 

 }


  for (var l = 0 ; l < clickEllipse.length; l++) {
    noStroke();
    fill(0);
    ellipse(clickEllipse[l][0], clickEllipse[l][1], clickEllipse[l][2]);
 }



stroke(0);

line(-width/2, remapY, width/2, remapY);
line(remapX, -height/2, remapX, height/2);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  ellipses[0].setPosition("digital");
  ellipses[1].setPosition("blog");
  ellipses[2].setPosition("projects");
  ellipses[3].setPosition("about");
}


function mousePressed() {

  if (mouseX < width / 2) {

  let randomSize = random(20, 30);

  let remapX = map(mouseX, 0, width, -width/2, width/2);
  let remapY = map(mouseY, 0, height, -height/2, height/2);


  clickEllipse.push([remapX, remapY, randomSize]);
}

}


class CreateEllipse {
  
  constructor(posX, posY, rad) {
    this.posX = posX;
    this.posY = posY; 
    
    this.radius = rad;
    this.color = ellColor;

    this.hovered = false; 
    
  }
  
  display(testX, testY) {
    noStroke();
    fill(this.color);
   ellipse(this.posX, this.posY, this.radius, this.radius);

    let distMouse = dist(this.posX, this.posY, testX, testY);
    

    if (distMouse < this.radius / 2) {
      this.hovered = true;
    } else if (distMouse > this.radius / 2) {
      this.hovered = false;
    }
  }

  setPosition(id) {

  var bodyRect = document.body.getBoundingClientRect();
  var elemRect = document.getElementById(id);
  elemRect = elemRect.getBoundingClientRect();
  var offset_x = elemRect.left - bodyRect.left; 
  var offset_y   = elemRect.top - bodyRect.top;


  this.posX = -width/2 + offset_x + radius/1.3;
  this.posY =  -height/2 + offset_y + radius/1.3;
  }
  
 
}