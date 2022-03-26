import ParticleOptions from "./ParticleOptions";
import Position from "./Position";

export interface ParticleParams {
  canvas: HTMLCanvasElement;
  particleOptions: ParticleOptions;
}

export default class Particle {
  _canvas!: HTMLCanvasElement;
  _ctx!: CanvasRenderingContext2D;

  _position!: Position;
  _color!: string;
  _radius!: number;
  _speed!: number;
  _directionAngle!: number;
  _vector!: Position;

  constructor({ canvas, particleOptions }: ParticleParams) {
    const options = particleOptions.toJSON();

    this._initCanvas(canvas);
    this._initPosition();
    this._initColor(options);
    this._initRadius(options);
    this._initSpeed(options);
    this._initDirectionAngle();
    this._initVector();
  }

  _initCanvas(canvas: HTMLCanvasElement): void {
    this._canvas = canvas;
    this._ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  _initPosition(): void {
    const {
      _canvas: { width, height },
    } = this;

    this._position = new Position({
      x: width * Math.random(),
      y: height * Math.random(),
    });
  }

  _initColor({ color }: ReturnType<ParticleOptions["toJSON"]>): void {
    this._color = color;
  }

  _initRadius({
    defaultRadius,
    variantRadius,
  }: ReturnType<ParticleOptions["toJSON"]>): void {
    this._radius = defaultRadius + variantRadius * Math.random();
  }

  _initSpeed({
    defaultSpeed,
    variantSpeed,
  }: ReturnType<ParticleOptions["toJSON"]>): void {
    this._speed = defaultSpeed + variantSpeed * Math.random();
  }

  _initDirectionAngle(): void {
    this._directionAngle = Math.PI * 2 * Math.random();
  }

  _initVector(): void {
    const { _directionAngle, _speed } = this;

    this._vector = new Position({
      x: Math.cos(_directionAngle) * _speed,
      y: Math.sin(_directionAngle) * _speed,
    });
  }

  draw(): void {
    const { _ctx, _color, _radius, _position } = this;
    const { x, y } = _position.toJSON();

    _ctx.save();
    _ctx.fillStyle = _color;

    _ctx.beginPath();
    _ctx.arc(x, y, _radius, 0, Math.PI * 2);
    _ctx.fill();

    _ctx.restore();

    this._update();
  }

  _update(): void {
    const { _position, _vector } = this;
    const { x, y } = _position.toJSON();
    const { x: vX, y: vY } = _vector.toJSON();

    _position.setX(x + vX);
    _position.setY(y + vY);

    this._applyWall();
  }

  _applyWall(): void {
    const {
      _position,
      _vector,
      _canvas: { width, height },
    } = this;
    const { x, y } = _position.toJSON();
    const { x: vX, y: vY } = _vector.toJSON();

    if (x >= width || x <= 0) _vector.setX(vX * -1);

    if (y >= height || y <= 0) _vector.setY(vY * -1);
  }

  getPosition(): Position {
    return this._position;
  }
}
