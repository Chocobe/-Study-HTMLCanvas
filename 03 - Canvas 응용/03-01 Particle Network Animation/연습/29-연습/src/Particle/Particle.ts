export type ParticleOptions = {
  amount: number;
  color: string;
  defaultRadius: number;
  variantRadius: number;
  defaultSpeed: number;
  variantSpeed: number;
}

export default class Particle {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  
  x!: number;
  y!: number;

  color!: string;
  
  radius!: number;
  speed!: number;

  directionAngle!: number;
  vector!: {
    x: number;
    y: number;
  }

  constructor($canvas: HTMLCanvasElement, options: ParticleOptions) {
    this.initCanvas($canvas);
    this.initPosition();
    this.initColor(options);
    this.initRadius(options);
    this.initSpeed(options);
    this.initVector();
  }

  initCanvas($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  initPosition() {
    const {
      $canvas: { width, height },
    } = this;

    this.x = width * Math.random();
    this.y = height * Math.random();
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

  initVector() {
    const { speed } = this;
    
    this.directionAngle = Math.PI * 2 * Math.random();

    this.vector = {
      x: Math.cos(this.directionAngle) * speed,
      y: Math.sin(this.directionAngle) * speed,
    };
  }

  calcDistance(dest: Particle) {
    const { x: x1, y: y1 } = this;
    const { x: x2, y: y2 } = dest;

    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  draw() {
    const {
      ctx,
      color,
      x, y,
      radius,
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
      vector: { x, y },
    } = this;

    this.x += x;
    this.y += y;

    this.applyWall();
  }

  applyWall() {
    const {
      $canvas: { width, height },
      x, y, vector,
    } = this;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;
  }
}