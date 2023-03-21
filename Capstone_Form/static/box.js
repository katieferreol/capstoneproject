class Box {
    constructor(input, x, y,r,g,b) {
      this.input = input;
      this.r = r;
      this.g = g;
      this.b = b;
      this.w = 200;
      this.h = textWidth(this.input)*9.96/200 * 9;
      if (textWidth(this.input) < 100) {
        this.w = textWidth(this.input)*2.5;
        this.h = textAscent() + textDescent()*10;
      }
      print(textWidth(this.input)*9.96/200);
  
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
  
    display() {
      let pos = scaleToPixels(this.body.GetPosition());
      let a = this.body.GetAngleRadians();
      let n;

      if (textWidth(this.input) < 100) {
        n = 10;
      } else {
        n = -2*textWidth(this.input)*9.96/200
      }

      rectMode(CENTER);
      push();
      translate(pos.x, pos.y);
      rotate(a);
      fill(50);
      noStroke();
      rect(0, 0, this.w, this.h);
      fill(this.r,this.g,this.b);
      textWrap(WORD);
      textSize(25);
      textLeading(25);
      textAlign(CENTER);
      text(this.input,0,n,200);
      //rect(0, 0, this.w, this.h);
      pop();
    }
  }
