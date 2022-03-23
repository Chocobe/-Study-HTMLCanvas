// @ts-check

class ParticleOptions {
  /** @type { string } */
  color;

  /** @type { number } */
  amount;

  /** @type { number } */
  defaultRadius;

  /** @type { number } */
  variantRadius;

  /** @type { number } */
  defaultSpeed;

  /** @type { number } */
  variantSpeed;

  /** @param { Partial<ParticleOptions> } options */
  constructor({
    color = "rgb(255, 255, 255)",
    amount = 50,
    defaultRadius = 2,
    variantRadius = 10,
    defaultSpeed = 2,
    variantSpeed = 5,
  } = {}) {
    this.color = color;
    this.amount = amount;
    this.defaultRadius = defaultRadius;
    this.variantRadius = variantRadius;
    this.defaultSpeed = defaultSpeed;
    this.variantSpeed = variantSpeed;
  }
}

class Position {
  /** @type { number } */
  x;

  /** @type { number } */
  y;

  /**
   * @param {{
   *  x: number;
   *  y: number;
   * }} position
   */
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  /** @param { Position } position */
  calcDistance(position) {
    const { x: x1, y: y1 } = this;
    const { x: x2, y: y2 } = position;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}

class Particle {
  /** @type { HTMLCanvasElement } */
  _canvas;

  /** @type { CanvasRenderingContext2D } */
  _ctx;

  /** @type { string } */
  _color;

  /** @type { Position } */
  position;

  /** @type { number } */
  _radius;

  /** @type { number } */
  _speed;

  /** @type { number } */
  _directionAngle;

  /** @type { Position } */
  _vector;

  /**
   * @param { HTMLCanvasElement } canvas 
   * @param { ParticleOptions } options 
   */
  constructor(canvas, options) {
    this._initCanvas(canvas);
    this._initColor(options);
    this._initPosition();
    this._initRadius(options);
    this._initSpeed(options);
    this._initDirectionAngle();
    this._initVector();
  }

  /** @param { HTMLCanvasElement } canvas */
  _initCanvas(canvas) {
    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");
  }

  /** @param { ParticleOptions } options */
  _initColor({ color }) {
    this._color = color;
  }

  _initPosition() {
    const { _canvas: { width, height } } = this;

    this.position = new Position({
      x: width * Math.random(),
      y: height * Math.random(),
    });
  }

  /** @param { ParticleOptions } options */
  _initRadius({ defaultRadius, variantRadius }) {
    this._radius = defaultRadius + variantRadius * Math.random();
  }

  /** @param { ParticleOptions } options */
  _initSpeed({ defaultSpeed, variantSpeed }) {
    this._speed = defaultSpeed + variantSpeed * Math.random();
  }

  _initDirectionAngle() {
    this._directionAngle = Math.PI * 2 * Math.random();
  }

  _initVector() {
    const { _directionAngle, _speed } = this;

    this._vector = new Position({
      x: Math.cos(_directionAngle) * _speed,
      y: Math.sin(_directionAngle) * _speed,
    });
  }

  _update() {
    const {
      position,
      _vector: { x: vectorX, y: vectorY },
    } = this;

    position.x += vectorX;
    position.y += vectorY;

    this._applyWall();
  }

  _applyWall() {
    const {
      position: { x, y },
      _canvas: { width, height },
      _vector,
    } = this;

    if (x >= width || x <= 0) _vector.x *= -1;

    if (y >= height || y <= 0) _vector.y *= -1;
  }
  
  draw() {
    const {
      _ctx,
      _color,
      _radius,
      position: { x, y },
    } = this;

    _ctx.save();
    _ctx.fillStyle = _color;

    _ctx.beginPath();
    _ctx.arc(x, y, _radius, 0, Math.PI * 2);
    _ctx.fill();

    _ctx.restore();

    this._update();
  }
}

class LineHubOptions {
  /** @type { string } */
  color;

  /** @type { number } */
  lineRadius;

  /**
   * @param { Partial<{
   *  color: string;
   *  lineRadius: number;
   * }> } options
   */
  constructor({
    color = "rgb(0, 181, 255)",
    lineRadius = 200,
  } = {}) {
    this.color = color;
    this.lineRadius = lineRadius;
  }
}

class LineHub {
  /** @type { CanvasRenderingContext2D } */
  _ctx;

  /**
   * @type {{
   *  r: string;
   *  g: string;
   *  b: string;
   * }}
   */
  _rgb;

  /** @type { number } */
  _lineRadius;

  /** @type { Particle[] } */
  _particles;
  
  /**
   * @param { CanvasRenderingContext2D } ctx 
   * @param { LineHubOptions } options 
   * @param { Particle[] } particles
   */
  constructor(ctx, options, particles) {
    this._initCtx(ctx);
    this._initRGB(options);
    this._initLineRadius(options);
    this._initParticles(particles);
  }

  /** @param { CanvasRenderingContext2D } ctx */
  _initCtx(ctx) {
    this._ctx = ctx;
  }

  /** @param { LineHubOptions } options */
  _initRGB({ color }) {
    const [ r, g, b ] = color.match(/\d+/g);
    this._rgb = { r, g, b };
  }

  /** @param { LineHubOptions } options */
  _initLineRadius({ lineRadius }) {
    this._lineRadius = lineRadius;
  }

  /** @param { Particle[] } particles */
  _initParticles(particles) {
    this._particles = particles;
  }

  draw() {
    this._particles.forEach(sour => this._lineToOthers(sour));
  }

  /** @param { Particle } sour */
  _lineToOthers(sour) {
    this._particles.forEach(dest => this._lineToDest(sour, dest));
  }

  /**
   * @param { Particle } sour 
   * @param { Particle } dest 
   */
  _lineToDest(sour, dest) {
    const { position: sourPosition } = sour;
    const { position: destPosition } = dest;

    const distance = Math.abs(sourPosition.calcDistance(destPosition));
    const opacity = this._calcOpacity(distance);

    if (opacity > 0) {
      const {
        _ctx,
        _rgb: { r, g, b },
      } = this;

      const { x: x1, y: y1 } = sourPosition;
      const { x: x2, y: y2 } = destPosition;

      _ctx.save();
      _ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;

      _ctx.beginPath();
      _ctx.moveTo(x1, y1);
      _ctx.lineTo(x2, y2);
      _ctx.stroke();

      _ctx.restore();
    }
  }

  /** @param { number } distance */
  _calcOpacity(distance) {
    return 1 - (distance / this._lineRadius);
  }
}

class ParticleNetworkCanvas {
  /** @type { HTMLCanvasElement } */
  _canvas;

  /** @type { CanvasRenderingContext2D } */
  _ctx;

  /** @type { ParticleOptions } */
  _particleOptions;

  /** @type { Particle[] } */
  _particles;

  /** @type { LineHubOptions } */
  _lineHubOptions;

  /** @type { LineHub } */
  _lineHub;
  
  /** @type { number } */
  _animationFrameId;

  /** @param { string } selector */
  constructor(selector) {
    this._initCanvas(selector);
    this._resizeCanvas();

    this._initParticleOptions();
    this._initParticles();

    this._initLineHubOptions();
    this._initLineHub();

    this._startAnimation();
  }

  /** @param { string } selector */
  _initCanvas(selector) {
    this._canvas = document.querySelector(selector);

    if (!this._canvas) throw new Error(`<canvas id="${selector}" />를 찾을 수 없습니다.`);

    this._ctx = this._canvas.getContext("2d");
  }

  _resizeCanvas() {
    const { _canvas: canvas } = this;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  _initParticleOptions() {
    this._particleOptions = new ParticleOptions();
  }

  _initParticles() {
    const { _canvas, _particleOptions } = this;

    this._particles = Array.from(
      { length: _particleOptions.amount },
      () => new Particle(_canvas, _particleOptions)
    );
  }

  _initLineHubOptions() {
    this._lineHubOptions = new LineHubOptions();
  }

  _initLineHub() {
    this._lineHub = new LineHub(
      this._ctx,
      this._lineHubOptions,
      this._particles,
    );

    console.log(this._lineHub);
  }

  _startAnimation() {
    this._loopAnimationFrame();
  }

  _loopAnimationFrame() {
    const { _ctx, _canvas: { width, height } } = this;

    _ctx.clearRect(0, 0, width, height);

    this._drawScene();

    this._animationFrameId = window.requestAnimationFrame(
      () => this._loopAnimationFrame()
    );
  }

  _drawScene() {
    this._drawParticles();
    this._drawLineHub();
  }

  _drawParticles() {
    this._particles.forEach(particle => particle.draw());
  }

  _drawLineHub() {
    this._lineHub.draw();
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => new ParticleNetworkCanvas("#particleNetworkCanvas")
);