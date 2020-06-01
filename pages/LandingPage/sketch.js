let size = 40;
let radius = 60;
//let textColor = "rgba(188, 255, 198,0.8)";
let textColor = "rgba(210, 210, 210,1)";
let rectColor =   "rgba(255, 255, 255, 1)";
let ellColor =   "rgba(200, 13, 130, 0.2)";

let section = [];
let ellipses = [];
let myFont;
let myFontItalic;
let maxDist;
let randomW;
let randomH;
let maxLines = 12;

function preload() {
  myFont = loadFont('Poppins-Bold.ttf');
  myFontItalic = loadFont('Poppins-BoldItalic.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST);
  section.push(new CreateSection("Digital R0", -width/2 + 200, -height/3, CENTER, TOP, 250, 100));
    
  section.push(new CreateSection("Blog", width/2 - 200, -height/3, CENTER, TOP, 200, 100));
  
  section.push(new CreateSection("Volunteers and projects", 50, 0, CENTER, CENTER, 300, 400));

  
  section.push(new CreateSection("About", -width/2 + 200, height/3, CENTER, CENTER, 200, 250));

  section.push(new CreateSection("Stay in touch", width/2 - 200, height/3, CENTER, BOTTOM, 200, 140)); 
  
  
  ellipses.push(new CreateEllipse(section[0].posX, section[0].posY + section[0].boxHeight/2, radius));
  ellipses.push(new CreateEllipse(section[1].posX, section[1].posY + section[1].boxHeight/2 + radius/2, radius));
  ellipses.push(new CreateEllipse(section[2].posX - section[2].boxWidth/2 - 10, section[2].posY, radius));
  ellipses.push(new CreateEllipse(section[3].posX + section[3].boxWidth/2, section[3].posY - section[3].boxHeight/2, radius));
  ellipses.push(new CreateEllipse(section[4].posX, section[4].posY - section[4].boxHeight/2, radius));

maxDist = dist(-width/2, -height/2, width/2, height/2);
}

function draw() {

 background('rgba(11, 255, 212,0.6)');
  noStroke();
  
   let remapX = map(mouseX, 0, width, -width/2, width/2);
   let remapY = map(mouseY, 0, height, -height/2, height/2);
  
//  fill("rgba(188, 255, 198,0.1)");


   for (var i = 0 ; i < section.length ; i++) {
    let tempHover = ellipses[i].hovered;
   section[i].display(tempHover); 
  }
  
  stroke('rgba(11, 255, 212,0.6)');
  strokeWeight(1);
  for (var k = 0; k < maxLines; k++) {
      randomW = int(random(2, 10));
      randomH = int(random(2, 5));
    
    var posHeight_top = -height/2 + ((remapY + height/2)/maxLines) * k;
    var posWidth_left = -width/2 + ((remapX + width/2)/maxLines) * k;
    
    line(-width/2, posHeight_top, width/2, posHeight_top);
    line(posWidth_left, -height/2, posWidth_left, height/2);
    //rect(-width/2, posHeight_top, width, randomW);
    //rect(posWidth_left, -height/2, randomH, height);
  
    var posHeight_bottom = remapY + ((height/2 - remapY)/maxLines) * k;
    var posWidth_right = remapX + ((width/2 - remapX)/maxLines) * k;

    line(-width/2, posHeight_bottom, width/2, posHeight_bottom);
    line(posWidth_right, -height/2, posWidth_right, height/2);
 
    //rect(-width/2, posHeight_bottom, width, randomW);
    //rect(posWidth_right, -height/2, randomH, height);
  }
  




  
  for (var j = 0 ; j < ellipses.length; j++) {
   ellipses[j].display(); 

   ellipses[j].blink(800, remapX, remapY);
 }
 stroke(0);

line(-width/2, remapY, width/2, remapY);
line(remapX, -height/2, remapX, height/2);

}

class CreateSection {
 
  constructor(mytext, posX, posY, alVert, alHorz, boxWidth, boxHeight) {
    this.mytext = mytext;

    this.posX = posX ;
    this.posY = posY ;
    
    this.vert = alVert;
    this.horz = alHorz;
    
    this.boxWidth = boxWidth;
    this.boxHeight = boxHeight;
    this.font = myFont;
    
  }
  
  display(hovered) {

    noStroke();
    fill(rectColor);
    rect(this.posX, this.posY, this.boxWidth, this.boxHeight);
    textSize(size);

    if(hovered == true) {
      this.font = myFontItalic;
    } else if (hovered == false) {
      this.font = myFont;
    }


    textFont(this.font);
    fill(ellColor);
    rectMode(CENTER);
    textAlign(this.vert, this.horz);
    text(this.mytext, this.posX, this.posY, this.boxWidth, this.boxHeight);
    fill(textColor);

    text(this.mytext, this.posX + 2, this.posY + 3, this.boxWidth, this.boxHeight);

    noFill();
    //stroke(0);
    //strokeWeight(2);
    
  }
}

class CreateEllipse {
  
  constructor(posX, posY, rad) {
    this.posX = posX;
    this.posY = posY; 
    
    this.radius = rad;
    this.lastBlink = 0;
    this.blinking = false;
    this.color = ellColor;

    this.hovered = false; 
    
  }
  
  display() {
    noStroke();
    fill(this.color);
   ellipse(this.posX, this.posY, this.radius, this.radius);
  }
  
  blink(rate, testX, testY) {
    let distMouse = dist(this.posX, this.posY, testX, testY);
    if (distMouse < this.radius / 2) {
      this.hovered = true;
    } else if (distMouse > this.radius / 2) {
      this.hovered = false;
    }
    rate = map(distMouse, 0, maxDist/5, 80, rate, true);  
    console.log("Rate is :", rate);
    if(this.lastBlink + rate < millis()) {
     this.blinking = true;  
    } else {
     this.blinking = false; 
    }
    if (this.blinking) {
      this.color = "rgba(200, 13, 130, 1)";
      if (this.lastBlink + rate + rate/5 < millis()) {
       this.lastBlink = millis(); 
      }
    } else if (!this.blinking) {
      this.color = ellColor;
    }
    

  }
}