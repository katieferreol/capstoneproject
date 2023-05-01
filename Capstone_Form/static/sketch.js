let world;
let i;

// A list we'll use to track fixed objects
let boundaries = [];
// A list for all of our rectangles
let boxes = [];
let thoughts = [];
let language = [];
let font = [];

function preload() {
  laGreCyFont = loadFont('/static/assets/LaGreCy.ttf');
  arabicFont = loadFont('/static/assets/Arabic.ttf');
  hangulFont = loadFont('/static/assets/Hangul.otf');
  hiraKataFont = loadFont('/static/assets/HiraKata.otf');
  sHanFont = loadFont('/static/assets/sHan.otf');
  tHanFont = loadFont('/static/assets/tHan.otf');
  devangariFont = loadFont('/static/assets/Devangari.ttf');
  bengaliFont = loadFont('/static/assets/Bengali.ttf');
  table = loadTable("static/assets/experience.csv", "csv", "header");
}

function setup() {
  i = -1;
  createCanvas(windowWidth, windowHeight);
  thoughts = table.getColumn('input');
  language = table.getColumn('language');

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  //boundaries.push(new Boundary(1.6*windowWidth/5, 370, 30, windowHeight));
  //boundaries.push(new Boundary(3.4*windowWidth/5, 370, 30, windowHeight));
  boundaries.push(new Boundary(700, 2.6*windowHeight/5, windowWidth, 30));

  // let b = new Box(width / 2, 30);
  // boxes.push(b);
}

function draw() {

  background(0);
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
let language = [];
let font = [];
let happyDone;
let newEntry;
let faceX = 905;
let faceY = 308;
let faceSize = 95;
let r;
let g;
let bl;
let colorNum = 0;

function preload() {
  table = loadTable("static/assets/experience.csv", "csv", "header");
  happy = loadImage('/static/assets/happy.gif');
  sad = loadImage('/static/assets/sad.gif');
  laGreCyFont = loadFont('/static/assets/LaGreCy.ttf');
  arabicFont = loadFont('/static/assets/Arabic.ttf');
  hangulFont = loadFont('/static/assets/Hangul.otf');
  hiraKataFont = loadFont('/static/assets/HiraKata.otf');
  sHanFont = loadFont('/static/assets/sHan.otf');
  tHanFont = loadFont('/static/assets/tHan.otf');
  devangariFont = loadFont('/static/assets/Devangari.ttf');
  bengaliFont = loadFont('/static/assets/Bengali.ttf');
}

function setup() {
  newEntry = false;
  happyDone = false;
  i = -1;
  createCanvas(windowWidth, windowHeight);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(1.85*windowWidth/5, 380, 10, windowHeight));
  boundaries.push(new Boundary(3.1*windowWidth/5, 380, 10, windowHeight));
  // boundaries.push(new Boundary(2.30*windowWidth/5, 600, 10, windowHeight/1.7));
  // boundaries.push(new Boundary(2.6*windowWidth/5, 600, 10, windowHeight/1.7));
  boundaries.push(new Boundary(windowWidth/2, windowHeight/4,90, 10));
  boundaries.push(new Boundary(140+windowWidth/2, windowHeight/2.5,170, 10));
  boundaries.push(new Boundary(windowWidth/2-150, windowHeight/2.5,170, 10));
  boundaries.push(new Boundary(50+windowWidth/2, windowHeight/3,10, 150));
  boundaries.push(new Boundary(windowWidth/2-65, windowHeight/3,10, 150));
  boundaries.push(new Boundary(-200, 7.2*windowHeight/8, windowWidth*3, 30));

  // let b = new Box(width / 2, 30);
  // boxes.push(b);
}

function draw() {
  thoughts = table.getColumn('input');
  language = table.getColumn('language');

  background(255);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  if (frameCount%10==0) {
    table = loadTable("static/assets/experience.csv", "csv", "header");
    thoughts = table.getColumn('input');
    language = table.getColumn('language');
  }

  if (newEntry == false) {
    image(happy, faceX, faceY, faceSize, faceSize);
  }
  let currFrameSad = sad.getCurrentFrame();

  if (colorNum==0) {
    r = 255;
    g = 16;
    bl = 240;
  }
  if (colorNum==1) {
    r = 4;
    g = 217;
    bl = 255;
  }
  if (colorNum==2) {
    r = 255;
    g = 240
    bl = 31;
  }
  if (colorNum==3) {
    r = 57;
    g = 225
    bl = 40;
  }
  if (colorNum==4) {
    r = 188;
    g = 19;
    bl = 254;
  }

  while (i < thoughts.length-1) {
    i++;
    newEntry = true;
    colorNum = (colorNum+1)%5 
    let b = new Box(thoughts[i], random(2*windowWidth/5,3*windowWidth/5), 50, r, g, bl,language[i]);
    boxes.push(b);
  }
  if (newEntry == false) {
    happy.play();
  }
  if (newEntry == true) {
    happy.pause();
    happyDone = true;
    image(sad, faceX, faceY, faceSize, faceSize);
  }
  if (happyDone == true) {
    sad.play();
  }
  if (currFrameSad == 241) {
    sad.pause();
    if (newEntry == true){
      happy.reset();
      happyDone = false;
    }
    sad.reset();
    newEntry = false;
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

  for (let i = boxes.length; i > 5; i--) {
    boxes[0].killBody();
    boxes.splice(0, 1);
  }
}
  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  if (frameCount%10==0) {
    table = loadTable("static/assets/experience.csv", "csv", "header");
  }

  while (i < thoughts.length-1) {
    i++;
    let b = new Box(thoughts[i], random(2*windowWidth/5,3*windowWidth/5), 0, random(80,255),random(80,255),random(80,255),language[i],language[i]);
    boxes.push(b);
  }

  //console.log(i);

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Display all the boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }

  for (let i = boxes.length; i > 10; i--) {
    boxes[0].killBody();
    boxes.splice(0, 1);
  }
}

// if(language[i] == "Latin" || language[i] == "Greek" || language[i] == "Cyrillic") {
//   textFont(laGreCyFont);
// } if(language[i] == "Arabic") {
//   textFont(arabicFont);
// } if(language[i] == "Hangul") {
//   textFont(hangulFont);
// } if(language[i] == "Hiragana/Katakana") {
//   textFont(hiraKataFont);
// } if(language[i] == "Simplified Han") {
//   textFont(sHanFont);
// } if(language[i] == "Traditional Han") {
//   textFont(tHanFont);
// } if(language[i] == "Devangari") {
//   textFont(devangariFont);
// } if(language[i] == "Bengali") {
//   textFont(bengaliFont);
// }
