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

export default class Particle {
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  color!: string;
  position!: Position;

  radius!: number;
  speed!: number;
  
  directionAngle!: number;
  vector!: Position;

  constructor({ $canvas, options }: {
    $canvas: HTMLCanvasElement,
    options: ParticleOptions,
  }) {
    this.initCanvas($canvas);
    this.initColor(options);
    this.initPosition();
    this.initRadius(options);
    this.initSpeed(options);
    this.initDirectionAngle();
    this.initVector();
  }

  initCanvas($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  initColor({ color }: ParticleOptions) {
    this.color = color;
  }

  initPosition() {
    const { $canvas: { width, height } } = this;

    this.position = {
      x: width * Math.random(),
      y: height * Math.random(),
    };
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
    const { speed, directionAngle } = this;

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
    const { position, vector } = this;

    position.x += vector.x;
    position.y += vector.y;

    this.applyWall();
  }

  applyWall() {
    const {
      vector,
      position: { x, y },
      $canvas: { width, height },
    } = this;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;
  }

  calcDistance(dest: Particle) {
    const { position: { x: x1, y: y1 } } = this;
    const { position: { x: x2, y: y2 } } = dest;

    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
}