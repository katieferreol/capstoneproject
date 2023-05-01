class Box {
    constructor(input,x,y,r,g,b,lang) {
      this.input = input;
      this.r = r;
      this.g = g;
      this.b = b;
      this.lang = lang;
      this.font = font;
      this.w = 220;
      
      if (this.lang == "Latin" || this.lang == "Greek" || this.lang == "Cyrillic") {
        this.h = textWidth(this.input)*10/200 * 9;
        this.font = laGreCyFont;
      }
      if (this.lang == "Arabic") {
        this.h = textWidth(this.input)*7/200 * 23.5;
        this.font = arabicFont;
      }
      if (this.lang == "Hangul") {
        this.h = textWidth(this.input)*6/200 * 17.5;
        this.font = hangulFont;
      }
      if (this.lang == "Hiragana/Katakana") {
        this.h = textWidth(this.input)*6/200 * 17.5;
        this.font = hiraKataFont;
      }
      if (this.lang == "SimplifiedHan") {
        this.h = textWidth(this.input)*6/200 * 17.5;
        this.font = sHanFont;
      }
      if (this.lang == "TraditionalHan") {
        this.h = textWidth(this.input)*6/200 * 17.5;
        this.font = tHanFont;
      }
      if (this.lang == "Devangari") {
        this.h = textWidth(this.input)*10/200 * 12;
        this.font = devangariFont;
      }
      if (this.lang == "Bengali") {
        this.h = textWidth(this.input)*8/200 * 16;
        this.font = bengaliFont;
      }
  
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
      fd.restitution = 0;
  
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

      print(textWidth(this.input));
      if (textWidth(this.input) < 100) {
        n = 0;
        this.w = textWidth(this.input)*2;
      } else {
        n = -2*textWidth(this.input)*6/200;
      }
      rectMode(CENTER);
      push();
      translate(pos.x, pos.y);
      rotate(a);
      fill(this.r/1.5,this.g/1.5,this.b/1.5);
      // noFill();
      noStroke();
      if (textWidth(this.input) <= 80) {
        rect(0, -5, this.w*1.3, 35, 120);
        triangle(20,this.h/3.2,-10,this.h/3.2,20,25);
      } else {
        rect(0, 0, this.w*1.1, this.h, 120);
        triangle(20,this.h/2.2,50,this.h/2.2,50,this.h*.7);
      }
      fill(255);
      if (this.input.includes(' ') == false) {
        textWrap(CHAR);
      } else {
        textWrap(WORD);
      }
      textFont(this.font);
      textSize(23);
      if (this.lang == "Arabic") {
        textSize(17);
      }
      textLeading(25);
      textAlign(CENTER);
      // stroke(0);
      text(this.input,0,n,200);
      pop();
    }
  }
