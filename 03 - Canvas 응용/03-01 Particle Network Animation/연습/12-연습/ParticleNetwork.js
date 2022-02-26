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

  /** @param { ParticleOptions } [ particleOptions = {} ] */
  constructor({
    amount = 30,
    color = "rgb(255, 255, 255)",
    defaultRadius = 5,
    variantRadius = 5,
    defaultSpeed = 3,
    variantSpeed = 3,
  } = {}) {
    this.amount = amount;
    this.color = color;
    this.defaultRadius = defaultRadius;
    this.variantRadius = variantRadius;
    this.defaultSpeed = defaultSpeed;
    this.variantSpeed = variantSpeed;
  }
}

class Particle {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;
  
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

  /**
   * @type {{
   *  x: number;
   *  y: number;
   * }}
   */
  vector;

  /**
   * @param { HTMLCanvasElement } canvas 
   * @param { ParticleOptions } particleOptions 
   */
  constructor(canvas, particleOptions) {
    this.initCanvas(canvas);
    this.initColor(particleOptions);
    this.initPosition();
    this.initRadius(particleOptions);
    this.initSpeed(particleOptions);
    this.initDirectionAngle();
    this.initVector();
  }

  /** @param { HTMLCanvasElement } canvas */
  initCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  /** @param { ParticleOptions } options */
  initColor(options) {
    this.color = options.color;
  }

  initPosition() {
    const { width, height } = this.canvas;

    this.x = width * Math.random();
    this.y = height * Math.random();
  }

  /** @param { ParticleOptions } options */
  initRadius(options) {
    const { defaultRadius, variantRadius } = options;

    this.radius = defaultRadius + variantRadius * Math.random();
  }

  /** @param { ParticleOptions } options */
  initSpeed(options) {
    const { defaultSpeed, variantSpeed } = options;

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
  
  update() {
    const { vector } = this;

    this.x += vector.x;
    this.y += vector.y;

    this.applyBorder();
  }

  applyBorder() {
    const {
      canvas,
      x, y, vector,
    } = this;

    const { width, height } = canvas;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;
  }
  
  draw() {
    const {
      ctx,
      color,
      x, y, radius,
    } = this;

    ctx.save();
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

class LineHubOptions {
  /**
   * @type {{
   *  r: string;
   *  g: string;
   *  b: string;
   * }}
   */
  rgb;

  /** @type { number } */
  maxWidth;

  /** @param { LineHubOptions } [ lineHubOptions = {} ] */
  constructor({
    color = "rgb(0, 181, 255)",
    maxWidth = 200,
  } = {}) {
    this.initRgb(color);
    this.initMaxWidth(maxWidth);
  }

  /** @param {  } color */
  initRgb(color) {
    const [r, g, b] = color.match(/\d+/g);

    this.rgb = { r, g, b };
  }

  /** @param { number } maxWidth */
  initMaxWidth(maxWidth) {
    this.maxWidth = maxWidth;
  }
}

class LineHub {
  /** @type { CanvasRenderingContext2D } */
  ctx;

  /**
   * @type {{
   *  r: string;
   *  g: string;
   *  b: string;
   * }}
   */
  rgb;

  /** @type { number } */
  maxWidth;

  /** @type { Particle[] } */
  particles;

  /**
   * @param { CanvasRenderingContext2D } ctx
   * @param { LineHubOptions } lineHubOptions
   */
  constructor(ctx, lineHubOptions, particles) {
    this.initCtx(ctx);
    this.initRgb(lineHubOptions);
    this.initMaxWidth(lineHubOptions);
    this.initParticles(particles);
  }

  /** @param { CanvasRenderingContext2D } ctx */
  initCtx(ctx) {
    this.ctx = ctx;
  }

  /** @param { LineHubOptions } options */
  initRgb(options) {
    this.rgb = options.rgb;
  }

  /** @param { LineHubOptions } options */
  initMaxWidth(options) {
    this.maxWidth = options.maxWidth;
  }

  /** @param { Particle[] } particles */
  initParticles(particles) {
    this.particles = particles;
  }

  draw() {
    this.drawLines();
  }

  drawLines() {
    this.particles.forEach(sour => this.drawLineToOthers(sour));
  }

  /** @param { Particle } sour */
  drawLineToOthers(sour) {
    this.particles.forEach(dest => this.drawLineToDest(sour, dest));
  }

  /**
   * @param { Particle } sour 
   * @param { Particle } dest 
   */
  drawLineToDest(sour, dest) {
    const { maxWidth, ctx, rgb } = this;
    
    const { x: x1, y: y1 } = sour;
    const { x: x2, y: y2 } = dest;

    const distance = this.calcDistance(x1, y1, x2, y2);
    const opacity = this.calcOpacity(distance);

    if (opacity > 0) {
      ctx.save();
      ctx.strokeStyle = this.getStrokeColor(opacity);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    }
  }

  /**
   * @param { number } x1 
   * @param { number } y1 
   * @param { number } x2 
   * @param { number } y2 
   * @returns { number }
   */
  calcDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  /**
   * @param { number } distance 
   * @returns { number }
   */
  calcOpacity(distance) {
    return 1 - (distance / this.maxWidth);
  }

  /**
   * @param { number } opacity
   * @returns { string }
   */
  getStrokeColor(opacity) {
    const { r, g, b } = this.rgb;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}

class ParticleNetworkCanvas {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { ParticleOptions } */
  particleOptions;

  /** @type { Particle[] } */
  particles;

  /** @type { LineHubOptions } */
  lineHubOptions;

  /** @type { LineHub } */
  lineHub;
  
  /** @type { number } */
  animationFrameId;
  
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
    this.canvas = document.querySelector(selector);

    if (!this.canvas) throw new Error("<canvas />를 찾을 수 없습니다.");

    this.ctx = this.canvas.getContext("2d");
  }

  initCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticleOptions() {
    this.particleOptions = new ParticleOptions();
  }

  initParticles() {
    this.particles = Array.from(
      { length: this.particleOptions.amount },
      () => new Particle(this.canvas, this.particleOptions),
    );
  }

  initLineHubOptions() {
    this.lineHubOptions = new LineHubOptions();
  }

  initLineHub() {
    this.lineHub = new LineHub(this.ctx, this.lineHubOptions, this.particles);
  }

  startAnimation() {
    this.loopFrame();
  }

  loopFrame() {
    const { ctx, canvas: { width, height } } = this;

    ctx.clearRect(0, 0, width, height);

    this.drawScene();

    this.animationFrameId = window.requestAnimationFrame(() => this.loopFrame());
  }

  drawScene() {
    this.drawParticles();
    this.drawLineHub();
  }

  drawParticles() {
    this.particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
  }

  drawLineHub() {
    this.lineHub.draw();
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => new ParticleNetworkCanvas("#particleNetworkCanvas")
)