import {
  SVG_NS
} from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    // this will set the ball in the middle in the beginning of the game
    this.reset();
  } // end of constructor
  // create reset
  reset() {
    // to set acceleration
    // this.ax = 0.1;
    // this.ay = 0.1;

    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    // vectors
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  // create wall collision, creates true and false stmts 
  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;
    // what would happen if ball hits the wall
    if (hitLeft || hitRight) {
      // this.ax += -1;
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      // this.ay += -1;
      this.vy = -this.vy;
    }
  }

  render(svg) {
    // adds acceleration
    // this.vx += this.ax;
    // this.vy += this.ay;

    this.x += this.vx;
    this.y += this.vy;

    // run wallCollision method
    this.wallCollision();

    // 'circle' has to be the actual svg name element not the name we create 
    // create a ball
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'fill', '#ffffff');
    // x of the centre point
    circle.setAttributeNS(null, 'cx', this.x);
    // y of the centre point
    circle.setAttributeNS(null, 'cy', this.y);

    svg.appendChild(circle);
  }
}