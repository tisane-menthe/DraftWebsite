let size = 40;
let radius = 60;

let margin = 100; 

let textColor = "rgba(240, 240, 240, 1)";
let shadowColor =   "rgba(200, 13, 130, 0.6)";

let rectColor =   "rgba(255, 255, 255, 1)";
let ellColor =   "rgba(240, 240, 240 , 1)";

let maxDist;
let maxLines = 12;

let clickEllipse = []; 

let safari;

let stroking = "rgba(11, 255, 212, 0.6)";

let remapX, remapY;

function setup() {


var ua = navigator.userAgent.toLowerCase(); 

if (ua.indexOf('safari') != -1) { 
  if (ua.indexOf('chrome') > -1) {
    safari = false;
    //console.log("chrome") // Chrome
  } else {
    safari = true; 
    stroking = "rgba(11, 255, 212, 0.9)";
    //console.log("safari") // Safari
  }
}

  canvas = createCanvas(windowWidth, windowHeight, WEBGL);

  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  
  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST);

}

function draw() {


//background(stroking);
//background(11, 255, 212);

  fill(255);

  stroke(255, 0, 255);
  strokeWeight(5);  
  remapX = map(mouseX, 0, width, -width/2, width/2);
  remapY = map(mouseY, 0, height, -height/2, height/2);




  rect(remapX, -height/2, width - remapX, height);

  
  stroke(stroking);
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

}


function mousePressed() {


  let randomSize = random(20, 30);


  clickEllipse.push([remapX, remapY, randomSize]);


}


