class ParticleOptions {
  /** @type { number } */
  amount;

  /** @type { string } */
  color;

  /** @type { number } */
  defaultRadius;

  /** @type { number } */
  variantRadius;

  /** @type { number } */
  defaultSpeed;

  /** @type { number } */
  variantSpeed;
  
  /**
   * @param {{
   *  amount: number
   *  color: string
   *  defaultRadius: number
   *  variantRadius: number
   *  defaultSpeed: number
   *  variantSpeed: number
   * }}
   */
  constructor({
    amount,
    color,
    defaultRadius,
    variantRadius,
    defaultSpeed,
    variantSpeed,
  } = {}) {
    this.amount = amount ?? 50;
    this.color = color ?? "rgb(255, 255, 255)";
    this.defaultRadius = defaultRadius ?? 5;
    this.variantRadius = variantRadius ?? 5;
    this.defaultSpeed = defaultSpeed ?? 2;
    this.variantSpeed = variantSpeed ?? 2;
  }
}

class Particle {
  /** @type { HTMLCanvasElement } */
  _canvas;

  /** @type { CanvasRenderingContext2D } */
  _ctx;

  /** @type { string } */
  color;
  
  /** @type { number } */
  x;

  /** @type { number } */
  y;

  /** @type { number } */
  radius;

  /** @type { number } */
  speed;

  /** @type { number } */
  directionAngle;

  /** @type {{ x: number, y: number }} */
  vector;
  
  /**
   * @param { HTMLCanvasElement } canvas 
   * @param { CanvasRenderingContext2D } ctx 
   * @param { ParticleOptions } options 
   */
  constructor(canvas, ctx, options) {
    this._canvas = canvas;
    this._ctx = ctx;

    const { width, height } = this._canvas;
    const {
      color,
      defaultRadius, variantRadius,
      defaultSpeed, variantSpeed,
    } = options;

    this.color = color;
    this.x = width * Math.random();
    this.y = height * Math.random();
    this.radius = defaultRadius + variantRadius * Math.random();
    this.speed = defaultSpeed + variantSpeed * Math.random();
    this.directionAngle = Math.floor(Math.PI * 2 * Math.random());
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
  }

  draw() {
    const { _ctx, color, x, y, radius } = this;

    _ctx.save();
    _ctx.fillStyle = color;

    _ctx.beginPath();
    _ctx.arc(x, y, radius, 0, Math.PI * 2);
    _ctx.closePath();
    _ctx.fill();

    _ctx.restore();
  }

  update() {
    const { vector } = this;

    this.x += vector.x;
    this.y += vector.y;

    this.applyBorder();
  }

  applyBorder() {
    const { _canvas, x, y, vector } = this;
    const { width, height } = _canvas;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;
  }
}

class LineHubOptions {
  /** @type { number } */
  maxWidth;

  /**
   * @type {{
   *  r: string
   *  g: string
   *  b: string
   * }}
   */
  rgb;

  /**
   * @param {{
   *  maxWidth: number
   *  color: string
   * }}
   */
  constructor({ maxWidth, color } = {
    maxWidth: 150,
    color: "rgb(0, 181, 255)",
  }) {
    this.maxWidth = maxWidth;
    
    const [r, g, b] = color.match(/\d+/g);
    this.rgb = { r, g, b };
  }
}

class LineHub {
  /** @type { CanvasRenderingContext2D } */
  _ctx;

  /** @type { Particle[] } */
  _particles;

  /** @type { number } */
  _maxWidth;

  /**
   * @type {{
   *  r: string
   *  g: string
   *  b: string
   * }}
   */
  _rgb;
  
  /**
   * @param { CanvasRenderingContext2D } ctx 
   * @param { Particle[] } particles 
   * @param { LineHubOptions } options 
   */
  constructor(ctx, particles, options) {
    this._ctx = ctx;
    this._particles = particles;
    this._maxWidth = options.maxWidth;
    this._rgb = options.rgb;
  }

  draw() {
    this._particles.forEach(sour => this.linkToOthers(sour));
  }

  /** @param { Particle } sour */
  linkToOthers(sour) {
    this._particles.forEach(dest => this.linkToDest(sour, dest));
  }

  /**
   * @param { Particle } sour 
   * @param { Particle } dest 
   */
  linkToDest(sour, dest) {
    const { x: x1, y: y1 } = sour;
    const { x: x2, y: y2 } = dest;

    const distance = this.calcDistance(x1, y1, x2, y2);
    const opacity = 1 - distance / this._maxWidth;

    const { _ctx, _rgb: { r, g, b } } = this;

    _ctx.save();

    if (opacity > 0) {
      _ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      
    } else {
      let lineWidth = Math.abs(opacity);
      lineWidth = lineWidth > 5
        ? 5
        : lineWidth;

      _ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.01)`;
      _ctx.lineWidth = lineWidth;
    }

    _ctx.beginPath();
    _ctx.moveTo(x1, y1);
    _ctx.lineTo(x2, y2);
    _ctx.closePath();
    _ctx.stroke();

    _ctx.restore();
  }

  calcDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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
  _frameId;
  
  /** @param { string } selector */
  constructor(selector) {
    this.initCanvas(selector);
    this.initCanvasSize();

    this.initParticleOptions();
    this.initParticles();

    this.initLineHubOptions();
    this.initLineHub();

    this.startAnimation();
  }

  /** @param { string } selector */
  initCanvas(selector) {
    this._canvas = document.querySelector(selector);

    if (!this._canvas) throw new Error("잘못된 selector 입니다.");

    this._ctx = this._canvas.getContext("2d");
  }

  initCanvasSize() {
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }

  initParticleOptions() {
    this._particleOptions = new ParticleOptions();
  }

  initParticles() {
    this._particles = Array.from(
      { length: this._particleOptions.amount },
      () => new Particle(this._canvas, this._ctx, this._particleOptions)
    );
  }

  initLineHubOptions() {
    this._lineHubOptions = new LineHubOptions();
  }

  initLineHub() {
    this._lineHub = new LineHub(this._ctx, this._particles, this._lineHubOptions);
  }

  startAnimation() {
    this.loopFrame();
  }

  loopFrame() {
    const { _ctx } = this;
    const { width, height } = this._canvas;

    _ctx.clearRect(0, 0, width, height);

    this.drawScene();

    this._frameId = requestAnimationFrame(() => this.loopFrame());
  }

  drawScene() {
    this.drawParticles();
    this.drawLineHub();
  }

  drawParticles() {
    this._particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
  }

  drawLineHub() {
    this._lineHub.draw();
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => new ParticleNetworkCanvas("#particleNetworkCanvas")
);