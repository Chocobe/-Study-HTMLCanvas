import Position from "@/Position";
import ParticleOptions from "@/ParticleOptions";

export default class Particle {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  private color!: string;
  private position!: Position;
  private radius!: number;
  private speed!: number;
  private directionAngle!: number;
  private vector!: Position;

  constructor(canvas: HTMLCanvasElement, options: ParticleOptions) {
    this.initCanvas(canvas);
    this.initColor(options);
    this.initPosition();
    this.initRadius(options);
    this.initSpeed(options);
    this.initDirectionAngle();
    this.initVector();
  }

  private initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  private initColor({ color }: ParticleOptions) {
    this.color = color;
  }

  private initPosition() {
    const {
      canvas: { width, height },
    } = this;

    this.position = new Position(width * Math.random(), height * Math.random());
  }

  private initRadius({ defaultRadius, variantRadius }: ParticleOptions) {
    this.radius = defaultRadius + variantRadius * Math.random();
  }

  private initSpeed({ defaultSpeed, variantSpeed }: ParticleOptions) {
    this.speed = defaultSpeed + variantSpeed * Math.random();
  }

  private initDirectionAngle() {
    this.directionAngle = Math.PI * 2 * Math.random();
  }

  private initVector() {
    const { directionAngle, speed } = this;

    this.vector = new Position(
      Math.cos(directionAngle) * speed,
      Math.sin(directionAngle) * speed,
    );
  }

  draw() {
    const {
      ctx,
      color,
      radius,
      position: { x, y },
    } = this;

    ctx.save();
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    this.update();
  }

  private update() {
    const {
      position,
      vector: { x: vX, y: vY },
    } = this;

    position.x += vX;
    position.y += vY;

    this.applyWall();
  }

  private applyWall() {
    const {
      canvas: { width, height },
      position: { x, y },
      vector,
    } = this;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;
  }

  getPosition() {
    return this.position;
  }
}
