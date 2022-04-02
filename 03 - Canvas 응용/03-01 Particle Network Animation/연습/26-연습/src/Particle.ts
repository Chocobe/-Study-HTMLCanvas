import ParticleOptions from "@/ParticleOptions";

export default class Particle {
  x!: number;
  y!: number;
  limitX!: number;
  limitY!: number;
  color!: string;
  radius!: number;
  speed!: number;
  directionAngle!: number;
  vector!: {
    x: number;
    y: number;
  };

  constructor(canvas: HTMLCanvasElement, particleOptions: ParticleOptions) {
    this.initPosition(canvas);
    this.initColor(particleOptions);
    this.initRadius(particleOptions);
    this.initSpeed(particleOptions);
    this.initDirectionAngle();
    this.initVector();
  }

  initPosition(canvas: HTMLCanvasElement) {
    const { width, height } = canvas;

    this.x = width * Math.random();
    this.y = height * Math.random();
    this.limitX = width;
    this.limitY = height;
  }

  initColor({ color }: ParticleOptions) {
    this.color = color;
  }

  initRadius({ defaultRadius, variantRadius }: ParticleOptions) {
    this.radius = defaultRadius + variantRadius * Math.random();
  }

  initSpeed({ defaultSpeed, variantSpeed }: ParticleOptions) {
    this.speed = defaultSpeed + variantSpeed * Math.random();
  }

  initDirectionAngle() {
    this.directionAngle = Math.PI * 2 * Math.random();
  }

  initVector() {
    const { directionAngle, speed } = this;

    this.vector = {
      x: Math.cos(directionAngle) * speed,
      y: Math.sin(directionAngle) * speed,
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { color, x, y, radius } = this;

    ctx.save();
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    this.update();
  }

  update() {
    const { vector } = this;

    this.x += vector.x;
    this.y += vector.y;

    this.applyWall();
  }

  applyWall() {
    const { x, y, limitX, limitY, vector } = this;

    if (x >= limitX || x <= 0) vector.x *= -1;

    if (y >= limitY || y <= 0) vector.y *= -1;
  }

  calcDistance(dest: Particle) {
    const { x: x1, y: y1 } = this;
    const { x: x2, y: y2 } = dest;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
