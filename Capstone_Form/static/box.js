// class Ball {
//     constructor(x, y, w, e) {
//         this.id = e.length;
//         this.w = w;
//         this.e = e;

//         this.progressiveWidth = 0;
//         this.rgb = [
//             floor(random(0, 256)),
//             floor(random(0, 256)),
//             floor(random(0, 256))
//         ];
//         this.mass = w;
//         this.position = createVector(x + random(-1, 1), y);
//         this.velocity = createVector(0, 0);
//         this.acceleration = createVector(0, 0);

//         this.gravity = 0.2;
//         this.friction = 0.5;
//     }

//     collide() {
//         for (let i = this.id + 1; i < this.e.length; i++) {
//             let dx = this.e[i].position.x - this.position.x;
//             let dy = this.e[i].position.y - this.position.y;
//             let distance = sqrt(dx * dx + dy * dy);
//             let minDist = this.e[i].w / 2 + this.w / 2;

//             if (distance < minDist) {
//                 let angle = atan2(dy, dx);
//                 let targetX = this.position.x + cos(angle) * minDist;
//                 let targetY = this.position.y + sin(angle) * minDist;

//                 this.acceleration.set(
//                     targetX - this.e[i].position.x,
//                     targetY - this.e[i].position.y
//                 );
//                 this.velocity.sub(this.acceleration);
//                 this.e[i].velocity.add(this.acceleration);

//                 //TODO : Effets bizarre quand on empile les boules (chevauchement)

//                 this.velocity.mult(this.friction);
//             }
//         }
//     }

//     move() {
//         this.velocity.add(createVector(0, this.gravity));
//         this.position.add(this.velocity);
//     }

//     display(displayMass) {
//         if (this.progressiveWidth < this.w) {
//             this.progressiveWidth += this.w / 10;
//         }

//         stroke(0);
//         strokeWeight(2);
//         fill(this.rgb[0], this.rgb[1], this.rgb[2], 100);
//         ellipse(this.position.x, this.position.y, this.progressiveWidth);

//         if (displayMass) {
//             strokeWeight(1);
//             textSize(10);
//             let tempTW = textWidth(int(this.w));
//             text(int(this.w), this.position.x - tempTW / 2, this.position.y + 4);
//         }
//     }

//     checkCollisions() {
//         if (this.position.x > width - this.w / 2) {
//             this.velocity.x *= -this.friction;
//             this.position.x = width - this.w / 2;
//         } else if (this.position.x < this.w / 2) {
//             this.velocity.x *= -this.friction;
//             this.position.x = this.w / 2;
//         }

//         if (this.position.y > Y_GROUND - this.w / 2) {
//             this.velocity.x -= this.velocity.x / 100;
//             this.velocity.y *= -this.friction;
//             this.position.y = Y_GROUND - this.w / 2;
//         } else if (this.position.y < this.w / 2) {
//             this.velocity.y *= -this.friction;
//             this.position.y = this.w / 2;
//         }
//     }
// }

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


// Constructor
class Box {
    constructor(input, x, y) {
      this.input = input;
      this.w = textWidth(this.input)+(textWidth(this.input)*1.5);
      this.h = textAscent(this.input) + textDescent(this.input)*10;
  
      // Define a body
      let bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.position = scaleToWorld(x, y);
  
      // Define a fixture
      let fd = new box2d.b2FixtureDef();
      // Fixture holds shape
      fd.shape = new box2d.b2PolygonShape();
      fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));
  
      // Some physics
      fd.density = 0.5;
      fd.friction = 10.9;
      fd.restitution = 0.0;
  
      // Create the body
      this.body = world.CreateBody(bd);
      // Attach the fixture
      this.body.CreateFixture(fd);
  
      // Some additional stuff
      this.body.SetLinearVelocity(new box2d.b2Vec2(0,0));
      this.body.SetAngularVelocity(0);
    }
  
    // This function removes the particle from the box2d world
    killBody() {
      world.DestroyBody(this.body);
    }
  
    // Is the particle ready for deletion?
    done() {
      // Let's find the screen position of the particle
      let pos = scaleToPixels(this.body.GetPosition());
      // Is it off the bottom of the screen?
      if (pos.y > height + this.w * this.h) {
        this.killBody();
        return true;
      }
      return false;
    }
  
    // Drawing the box
    display() {
      // Get the body's position
      let pos = scaleToPixels(this.body.GetPosition());
      // Get its angle of rotation
      let a = this.body.GetAngleRadians();
  
      // Draw it!
      rectMode(CENTER);
      push();
      translate(pos.x, pos.y);
      rotate(a);
      fill(155);
      noStroke();

     

      let w= textWidth(this.input)*2+10;
      let boxWidth = 100;
      let h = Math.ceil(w/boxWidth);
      print(w+" "+boxWidth+ " "+h)
      rect(0, 0, w, 25*h*2);
      fill(0);
      textWrap(WORD);
      textAlign(CENTER);
      textSize(25);
      text(this.input,0,10,boxWidth);
      //rect(0, 0, this.w, this.h);
      pop();
    }
  }