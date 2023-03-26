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
