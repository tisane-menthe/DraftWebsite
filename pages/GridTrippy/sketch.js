let angleX = 0;
//change second variable to rotate lower or faster
let dirX = [false, 0.2];

let angleY = 0;
//change second variable to rotate lower or faster
let dirY = [false, 0.05];

let angleZ = 0;

let grabbed  = false;
let currentMousePosX = 0;
let currentMousePosY = 0;

let denomX = 1;
let denomY = 1;

//One grid is rotated, another (warp) is linearly transformed
let my_grid = [];
let my_grid_warp = [];

//Arrays of our basis vector for linear transformation
let i_hat = [];
let j_hat = [];

// Change here the friction to adjust the sensitivity to mouse grap. Leave at least 5 minimum.
let friction = 10;

//Change here number of Lines in the grid
let numLines = 20;
//Change here the spacing. Higher condensation means less space between grid lines
//IDEA: grow and decrease condense over time ?
let condense = 10;
//Do not change. Insure even spacing between the gridlines.
let subdivGrid = condense * 2 / numLines;


//We create a plane to display the logo as a texture of the plane. Array of shapes [4] [2] containing the 4 vertices of the plane
//Plane rotated
let plane_r0 = [];
//Plane linearly transformed
let plane_lin = [];
//Adjust here planeSize, to make the logo appear bigger or smaller.
let planeSize = 200;

//Color of grid & logo
let my_tint_rot = "rgba(255, 188, 198, 0.6)";

//Color
let my_tint_lin = "rgba(188, 255, 198,0.3)";
//let my_tint_lin = "rgba(206, 206, 206, 0.5)";
//thickness of gridlines
let thickness = 10;

function preload(){
    RLogo = loadImage('rlogo_white.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //fullscreen();


  //Disable depth test because otherwise it messes with the alpha channel
  gl = this._renderer.GL;

//gl.enable(gl.BLEND);

 //gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  setAttributes('premultipliedAlpha', false);
  setAttributes('alpha', true);

  gl.disable(gl.DEPTH_TEST);
  //Plane vertices
  //Vertex 1 
  plane_r0.push([-planeSize, -planeSize]);
  plane_lin.push([-planeSize, -planeSize]);

  //Vertex 2
  plane_r0.push([planeSize, -planeSize])
  plane_lin.push([planeSize, -planeSize]);

  //Vertex 3
  plane_r0.push([planeSize, planeSize]);
  plane_lin.push([planeSize, planeSize]);


  //Vertex 4
  plane_r0.push([-planeSize, planeSize]);
  plane_lin.push([-planeSize, planeSize]);

  //array:
  //[numLines][2][4]
  //[numlines] [Grid_vertical, Grid_horizontal] [x1, y1, x2, y2];
  for (var i = -numLines / 2; i < numLines / 2 + 1; i++) {
    for (var j = -numLines / 2; i < numLines / 2 + 1; i++) {
     /* my_grid.push([
        [(width / condense * i), -height / subdivGrid, (width / condense * i), height / subdivGrid],
        [-width / subdivGrid, (height / condense * i), width / subdivGrid, (height / condense * i)]
      ]);*/
            my_grid.push([
        [(width / condense * i), -width / subdivGrid, (width / condense * i), width / subdivGrid],
        [-width / subdivGrid, (width / condense * i), width / subdivGrid, (width / condense * i)]
      ]);


     /* my_grid_warp.push([
        [(width / condense * i), -height / subdivGrid, (width / condense * i), height / subdivGrid],
        [-width / subdivGrid, (height / condense * i), width / subdivGrid, (height / condense * i)]
      ]);
*/
           my_grid_warp.push([
        [(width / condense * i), -width / subdivGrid, (width / condense * i), width / subdivGrid],
        [-width / subdivGrid, (width / condense * i), width / subdivGrid, (width / condense * i)]
      ]);

    }
  }
}

function draw() {

  angleMode(DEGREES);

  push();

  //Linear transformation
  let iy = map(angleX, -360, 360, -2, 2);
  let jy = map(angleY, -360, 360, -2, 2); 

  i_hat = [1, iy];
  j_hat = [jy, 1];

  for (let k = 0; k < numLines + 1; k++) {
    for (let l = 0; l < 2; l++) {
      //x1
      my_grid_warp[k][l][0] = (my_grid[k][l][0] * i_hat[0]) + (my_grid[k][l][1] * j_hat[0]);

      //y1
      my_grid_warp[k][l][1] = (my_grid[k][l][0] * i_hat[1]) + (my_grid[k][l][1] * j_hat[1]);

      //x2
      my_grid_warp[k][l][2] = (my_grid[k][l][2] * i_hat[0]) + (my_grid[k][l][3] * j_hat[0]);

      //y2
      my_grid_warp[k][l][3] = (my_grid[k][l][2] * i_hat[1]) + (my_grid[k][l][3] * j_hat[1]);


    }
  }


  stroke(my_tint_lin);
  strokeWeight(thickness);
  for (let h = 0; h < numLines + 1; h++) {

    line(my_grid_warp[h][0][0], my_grid_warp[h][0][1], my_grid_warp[h][0][2], my_grid_warp[h][0][3]);
    line(my_grid_warp[h][1][0], my_grid_warp[h][1][1], my_grid_warp[h][1][2], my_grid_warp[h][1][3]);
  }

  for (let q = 0; q < 4; q++) {
    for (let r = 0; r < 2; r++) {
      plane_lin[q][0] = (plane_r0[q][0] * i_hat[0]) + (plane_r0[q][1] * j_hat[0]);
      plane_lin[q][1] = (plane_r0[q][0] * i_hat[1]) + (plane_r0[q][1] * j_hat[1]);


    }
  }

  pop();



  push();
  //Rotation
  rectMode(CENTER);
  rotateX(angleX);
  rotateY(angleY);
  rotateZ(angleZ);



  stroke(my_tint_rot);
  strokeWeight(thickness);
  for (let i = 0; i < numLines + 1; i++) {
    line(my_grid[i][0][0], my_grid[i][0][1], my_grid[i][0][2], my_grid[i][0][3]);
    line(my_grid[i][1][0], my_grid[i][1][1], my_grid[i][1][2], my_grid[i][1][3]);
  }


//Mouse Press grab the grid and guides the warp
  if (mouseIsPressed) {

    // Mouse functions are given with origin at (0,0) but WEBGL moves the origin at width/2 and height/2, therefore we remap the value, adjusting with friction so that it doesn't go too crazy
    currentMousePosX = map(mouseY, 0, height, -height / friction, height / friction);
    currentMousePosY = map(mouseX, 0, width, -width / friction, width / friction);

//To ensure starting from current grid position
    if (grabbed == false) {
      //We resolve the equation to move the grids with the mouse from their current position
      denomX = angleX - currentMousePosX;
      denomY = angleY - currentMousePosY;
      grabbed = true;
    } else if (grabbed == true) {

      angleX = currentMousePosX + denomX;
      angleY = currentMousePosY + denomY;

    }

  } else {
    //AngleZ is not affected by mouseGrab, does not affect linear transformation, therefore does not need to be re-initialized.
    angleZ += 0.05;
    //AngleX and Y need to be reset so we can do the mapping effectively.
    //Function checkDir checks if values of angle rotation are within bounds. It returns an array [2] containing the current direction (angle increasing or decreasing) as well as the quotien. The quotien gets multiplied by -1 when direction needs to change, switching between positive and negative increment.
    dirX = checkDir(angleX, dirX);
    dirY = checkDir(angleY, dirY);

    angleX += dirX[1];
    angleY += dirY[1];

    grabbed = false;

  }
  
  pop();

  push();

  tint(my_tint_lin);
  noStroke();
  texture(RLogo);
  textureMode(NORMAL);

  beginShape();

  vertex(plane_lin[0][0], plane_lin[0][1], 0, 0, 0);
  vertex(plane_lin[1][0], plane_lin[1][1], 0, 1, 0);
  vertex(plane_lin[2][0], plane_lin[2][1], 0, 1, 1);
  vertex(plane_lin[3][0], plane_lin[3][1], 0, 0, 1);
  endShape(CLOSE);

  pop();

  push();
  // Displaying both planes with R^0 texture. 
  rotateX(angleX);
  rotateY(angleY);
  rotateZ(angleZ);
  tint(my_tint_rot);
  noStroke();
  texture(RLogo);
  textureMode(NORMAL);

  beginShape();

  vertex(plane_r0[0][0], plane_r0[0][1], 0, 0, 0);
  vertex(plane_r0[1][0], plane_r0[1][1], 0, 1, 0);
  vertex(plane_r0[2][0], plane_r0[2][1], 0, 1, 1);
  vertex(plane_r0[3][0], plane_r0[3][1], 0, 0, 1);
  endShape(CLOSE);

  pop();

}

function checkDir(angle, currentState) {
  let state = currentState.slice();

  if (angle >= 360) {
    state[0] = true;
  }

  if (angle <= -360) {
    state[0] = false;

  }

  if (state[0] != currentState[0]) {
    state[1] *= -1;
  }

  return state;

}