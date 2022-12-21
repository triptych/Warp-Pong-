let ball;
let leftPaddle;
let rightPaddle;
let leftScore = 0;
let rightScore = 0;
let rocks = [];

function setup() {
  createCanvas(400, 400);
  ball = new Ball();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
  for(let i = 0; i < 100; i++) {
    rocks[i] = new Rock();
  }
  
}

function draw() {
  background(0);
  ball.update();
  ball.show();
  leftPaddle.update(true);
  leftPaddle.show();
  rightPaddle.update(false);
  rightPaddle.show();


  if (ball.collidesWith(leftPaddle)) {
    ball.bounceOff(leftPaddle);
  }
  if (ball.collidesWith(rightPaddle)) {
    ball.bounceOff(rightPaddle);
  }

  
  fill(255);
  textSize(32);
  text(leftScore, 32, 40);
  text(rightScore, width - 64, 40);

  translate(width / 2, height / 2);
  scale(.5)
  for (let i = 0; i < rocks.length; i++) {
    rocks[i].update();
    rocks[i].show();
  }

}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 20;
    this.xspeed = 5;
    this.yspeed = 5;
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;

    if (this.y < 0 || this.y > height) {
      this.yspeed *= -1;
    }

    if (this.x > width/2 - this.size*2 && this.x < width/2 + this.size*2) {
      if(this.y > height/2 - this.size*2 && this.y < height/2 + this.size*2) {
        this.xspeed = random(4,-4);
        this.yspeed = random(4, -4);
      }
    }

    if (this.x < 0) {
      rightScore++;
      this.reset();
    }

    if (this.x > width) {
      leftScore++;
      this.reset();
    }
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed *= -1;
  }

  collidesWith(paddle) {
    return (
      this.x - this.size / 2 < paddle.x + paddle.w &&
      this.x + this.size / 2 > paddle.x &&
      this.y - this.size / 2 < paddle.y + paddle.h &&
      this.y + this.size / 2 > paddle.y
    );
  }
  
 
  

  bounceOff(paddle) {
    this.xspeed *= -1;
    let diff = this.y - (paddle.y + paddle.h / 2);
    this.yspeed = map(diff, -paddle.h / 2, paddle.h / 2, -5, 5);
  }

    
  

  show() {
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Paddle {
  constructor(isLeft) {
    this.w = 20;
    this.h = 100;
    if (isLeft) {
      this.x = 0;
    } else {
      this.x = width - this.w;
    }
    this.y = height / 2 - this.h / 2;
  }

  update(isLeft) {
    if(isLeft){
      this.y = mouseY - this.h / 2;
    } else {
       // Update position based on AI logic
      if (ball.y < this.y) {
        this.y -= 2;
      } else if (ball.y > this.y) {
        this.y += 2;
      } else {
        this.y = this.y;
      }
    }
  }

  show() {
    fill(255,0,255);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Rock {
  constructor() {
    this.x = random(width/2);
    this.y = random(height/2);
    this.size = random(10, 20);
    this.xspeed = random(-5, 5);
    this.yspeed = random(-5, 5);
    this.angle = random(0, TWO_PI);
  }

  update() {
    let angle = frameCount * (TWO_PI / 3840);
    rotate(angle);
  }

  show() {
    fill(random(255), random(255), random(255));
    rect(this.x, this.y, this.size, this.size);
  }
}
