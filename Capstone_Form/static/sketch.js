// class Entry {
//   constructor(inputText) {
//     this.x = random(width);
//     this.y = random(height);
//     this.v = 10;
//     this.yVal = 20; 
//     this.m = 50;
//     this.a = 50*0.0005;
//     this.inputText = inputText;
//   }

//   display() {
//     fill(255);
//     textSize(50);
    
//     this.v += this.a; 
//     this.yVal += this.v;
//     text(this.inputText, this.x, this.yVal); 
    
//     if (this.yVal > height - this.m/2) {
//       // A little dampening when hitting the bottom
//       this.v *= -0.2;
//       this.yVal = height - this.m/2;
//     }
//   }
// }

// let xspeed;
// let yspeed;
// let inputText;
// let inputWidth;
// let inputHeight;
// var fade;
// var fadeAmount = 1;

// let table;
// let values;
// let splitString;
// let thoughts = [];

// function preload() {
//   table = loadTable("static/assets/experience.csv", "csv");
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   xspeed = 1;
//   yspeed = 1;
//   thoughts = table.getArray();

//   for (let i = 0; i < thoughts.length; i++) {
//     thoughts[i] = new Entry(thoughts[i]);
//   }
  
//   x = random(2*width/6,3*width/6);
//   y = random(height);
 
// }

// function draw() {
//   background(0);

//   // displayText(thoughts[i]);

//   for (let i = 0; i < thoughts.length; i++) {
//     thoughts[i].display();
//     console.log(thoughts[i]);
//   }

//   if (frameCount%60==0) {
//     table = loadTable("static/assets/experience.csv", "csv");
//   }
  
// }

// function displayText(inputText) {
  
//   text(inputText, x, y);
//   textSize(40);
//   fill(255);
  
//   inputWidth = textWidth(inputText);
//   inputHeight = textWidth(inputText);
  
//   x = x + xspeed;
//   y = y + yspeed;

//   if (x + inputWidth >= width) {
//     xspeed = -xspeed;
//     x = width - inputWidth;
//   } else if (x <= 0) {
//     xspeed = -xspeed;
//     x = 0;
//   }

//   if (y + inputHeight >= height) {
//     yspeed = -yspeed;
//     y = height - inputHeight;
//   } else if (y <= 0) {
//     yspeed = -yspeed;
//     y = 0;
//   }
// }

// function displayText(inputText) {
//   fill(255);
//   textSize(50);
  
//   velocity += accel; 
//   yVal += velocity;
// 	text(inputText, x, yVal); 
  
//   if (yVal > height - mass/2) {
//     // A little dampening when hitting the bottom
//     velocity *= -0.2;
//     yVal = height - mass/2;
//   }
// }

let world;
let i;

// A list we'll use to track fixed objects
let boundaries = [];
// A list for all of our rectangles
let boxes = [];
let thoughts = [];

function preload() {
  fontFile = loadFont('static/assets/HelveticaNeueBold.ttf');
  table = loadTable("static/assets/experience.csv", "csv");
}

function setup() {
  i = -1;
  createCanvas(windowWidth, windowHeight);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(1.5*windowWidth/5, 370, windowWidth/20, windowHeight));
  boundaries.push(new Boundary(3.5*windowWidth/5, 370, windowWidth/20, windowHeight));
  boundaries.push(new Boundary(720, 2*windowHeight/5, windowWidth, 30));

  // let b = new Box(width / 2, 30);
  // boxes.push(b);
  textFont(fontFile);
  
}

function draw() {
  background(255);
  thoughts = table.getArray();

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  if (frameCount%10==0) {
    table = loadTable("static/assets/experience.csv", "csv");
  }

  while (i < thoughts.length-1) {
    i++;
    let b = new Box(thoughts[i], random(2*windowWidth/5,3*windowWidth/5), 0);
    boxes.push(b);
  }

  //console.log(i);

  // Display all the boundaries
  // for (let i = 0; i < boundaries.length; i++) {
  //   boundaries[i].display();
  // }

  // Display all the boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }

  for (let i = boxes.length; i > 10; i--) {
    boxes[0].killBody();
    boxes.splice(0, 1);
  }
}
