import ParticleOptions from "./ParticleOptions";

export default class Particle {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  color!: string;
  
  x!: number;
  y!: number;

  radius!: number;
  speed!: number;
  directionAngle!: number;
  vector!: {
    x: number;
    y: number;
  };

  constructor(canvas: HTMLCanvasElement, particleOptions: ParticleOptions) {
    this.initCanvas(canvas);

    this.initColor(particleOptions);
    this.initPosition();
    this.initRadius(particleOptions);
    this.initSpeed(particleOptions);
    this.initDirectionAngle();
    this.initVector();
  }

  initColor({ color }: ParticleOptions) {
    this.color = color;
  }

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  initPosition() {
    const {
      canvas: {
        width,
        height,
      },
    } = this;

    this.x = width * Math.random();
    this.y = height * Math.random();
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
    const {
      directionAngle,
      speed,
    } = this;

    this.vector = {
      x: Math.cos(directionAngle) * speed,
      y: Math.sin(directionAngle) * speed,
    };
  }

  draw() {
    const {
      ctx,
      color,
      radius,
      x, y,
    } = this;

    ctx.save();
    ctx.fillStyle = color;
    
    ctx.beginPath();

    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    this.update();
  }

  update() {
    const {
      vector: {
        x: vx,
        y: vy,
      },
    } = this;

    this.x += vx;
    this.y += vy;

    this.applyWall();
  }

  applyWall() {
    const {
      x, y,
      canvas: {
        width, height,
      },
      vector,
    } = this;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;
  }

  calcDistance(dest: Particle) {
    const { x: x1, y: y1 } = this;
    const { x: x2, y: y2 } = dest;

    return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
  }
}