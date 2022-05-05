export type ParticleOptions = {
  amount: number;
  color: string;
  defaultRadius: number;
  variantRadius: number;
  defaultSpeed: number;
  variantSpeed: number;
};

export type Position = {
  x: number;
  y: number;
}

export type ParticleConstructorParams = ConstructorParameters<typeof Particle>[0];

export default class Particle {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  
  position!: Position;
  color!: string;
  radius!: number;

  speed!: number;
  directionAngle!: number;
  vector!: Position;

  constructor({ $canvas, ctx, options }: {
    $canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    options: ParticleOptions,
  }) {
    this.initCanvas($canvas);
    this.initPosition();
    this.initColor(options);
    this.initRadius(options);
    this.initSpeed(options);
    this.initDirectionAngle();
    this.initVector();
  }

  initCanvas($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  initPosition() {
    const { $canvas: { width, height } } = this;

    this.position = {
      x: width * Math.random(),
      y: width * Math.random(),
    };
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

  draw() {
    const {
      ctx,
      color,
      position: { x, y },
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
      position,
      vector: { x: vx, y: vy },
    } = this;

    position.x += vx;
    position.y += vy;

    this.applyWall();
  }

  applyWall() {
    const {
      position: { x, y },
      vector,
      $canvas: { width, height },
    } = this;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;
  }

  calcDistance(target: Particle) {
    const { position: { x: x1, y: y1 } } = this;
    const { position: { x: x2, y: y2 } } = target;

    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
}