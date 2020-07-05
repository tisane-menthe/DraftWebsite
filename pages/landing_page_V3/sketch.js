let size = 40;
let radius = 60;

let margin = 100; 

let textColor = "rgba(240, 240, 240, 1)";
let shadowColor =   "rgba(200, 13, 130, 0.6)";

let rectColor =   "rgba(255, 255, 255, 1)";
let ellColor =   "rgba(240, 240, 240 , 1)";


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
  section.push(new CreateSection("Digital R0", -width/2 + 140, - height/2 + size * 2, LEFT, TOP, 300, size*2, "Find here the digital version of our volunteers' zine R0."));
    
  section.push(new CreateSection("Blog", -width/2 + 140, section[0].posY + section[0].boxHeight/2 + margin, LEFT, TOP, 300, size*2, "Read more personal stories and reflections by our volunteers."));
  
  section.push(new CreateSection("Volunteers and projects",  -width/2 + 140, section[1].posY + section[1].boxHeight/2 + margin, LEFT, TOP, 300, size*3, "Discover past and present volunteers as well as their personal projects."));
  
  section.push(new CreateSection("About",  -width/2 + 140, section[2].posY + + section[2].boxHeight/2 + margin, LEFT, TOP, 300, size*2, "Who are we ? What is this website ? What is A4 ? What is life ? Some explanation and ways to stay in touch here."));

  
  
  ellipses.push(new CreateEllipse(section[0].posX - radius/1.2, section[0].posY + section[0].boxHeight/2.5, radius));
  ellipses.push(new CreateEllipse(section[1].posX - radius/1.2, section[1].posY + section[1].boxHeight/2.5, radius));
  ellipses.push(new CreateEllipse(section[2].posX - radius/1.2, section[2].posY + section[2].boxHeight/2.5, radius));
  ellipses.push(new CreateEllipse(section[3].posX - radius/1.2, section[3].posY + section[3].boxHeight/2.5, radius));

maxDist = dist(-width/2, -height/2, width/2, height/2);
}

function draw() {

 background('rgba(11, 255, 212,0.6)');


noStroke();
fill(255);
rect(0, -height/2, width/2, height);

  noStroke();
  
   let remapX = map(mouseX, 0, width, -width/2, width/2);
   let remapY = map(mouseY, 0, height, -height/2, height/2);


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
   ellipses[j].display(remapX, remapY); 

 }


stroke(0);

line(-width/2, remapY, width/2, remapY);
line(remapX, -height/2, remapX, height/2);

}

class CreateSection {
 
  constructor(mytext, posX, posY, alVert, alHorz, boxWidth, boxHeight, subtext) {
    this.mytext = mytext;

    this.posX = posX ;
    this.posY = posY ;
    
    this.vert = alVert;
    this.horz = alHorz;
    
    this.boxWidth = boxWidth;
    this.boxHeight = boxHeight;
    this.font = myFont;
    this.subtext = subtext;
    
  }
  
  display(hovered) {

    noStroke();
    fill(rectColor);
    //rect(this.posX, this.posY, this.boxWidth, this.boxHeight);

    if(hovered == true) {
      this.font = myFontItalic;

      textSize(size / 2); 
      fill(shadowColor);
      text(this.subtext, 0 + margin, 0, width / 3, height);
    } else if (hovered == false) {
      this.font = myFont;
    }


    textSize(size);
    textFont(this.font);
    fill(shadowColor);
    //rectMode(CENTER);
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
  
 
}