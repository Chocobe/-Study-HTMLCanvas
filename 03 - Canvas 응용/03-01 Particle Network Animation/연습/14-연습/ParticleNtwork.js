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
   * @param { ParticleOptions } [options={}]
   */
  constructor({
    amount = 50,
    color = "rgb(255, 255, 255)",
    defaultRadius = 3,
    variantRadius = 10,
    defaultSpeed = 1,
    variantSpeed = 10,
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
   * @param { ParticleOptions } options 
   */
  constructor(canvas, options) {
    this.initCanvas(canvas);
    this.initOptions(options);
  }

  /** @param { HTMLCanvasElement } canvas */
  initCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  /** @param { ParticleOptions } options */
  initOptions(options) {
    this.initColor(options);
    this.initPosition();
    this.initRadius(options);
    this.initSpeed(options);
    this.initDirectionAngle();
    this.initVector();
  }

  /** @param { ParticleOptions } options */
  initColor({ color }) {
    this.color = color;
  }

  initPosition() {
    const { canvas: { width, height } } = this;

    this.x = width * Math.random();
    this.y = height * Math.random();
  }

  /** @param { ParticleOptions } options */
  initRadius({ defaultRadius, variantRadius }) {
    this.radius = defaultRadius + variantRadius * Math.random();
  }

  /** @param { ParticleOptions } options */
  initSpeed({ defaultSpeed, variantSpeed }) {
    this.speed = defaultSpeed + variantSpeed * Math.random();
  }

  initDirectionAngle() {
    this.directionAngle = Math.floor(Math.PI * 2 * Math.random());
  }

  initVector() {
    const { speed, directionAngle } = this;
    
    this.vector = {
      x: Math.cos(directionAngle) * speed,
      y: Math.sin(directionAngle) * speed,
    };
  }

  update() {
    const { vector } = this;

    this.x += vector.x;
    this.y += vector.y;

    this.applyWall();
  }

  applyWall() {
    const { x, y, vector } = this
    const { canvas: { width, height } } = this

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;
  }

  draw() {
    const {
      ctx, color,
      x, y,
      radius,
    } = this;

    ctx.save();
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

class LineHubOptions {
  /** @type { number } */
  maxWidth;

  /**
   * @type {{
   *  r: string;
   *  g: string;
   *  b: string;
   * }}
   */
  rgb;

  /**
   * @param {{
   *  maxWidth: number;
   *  color: string;
   * }} options 
   */
  constructor({
    maxWidth = 300,
    color = "rgb(0, 181, 255)",
  } = {}) {
    this.initMaxWidth(maxWidth);
    this.initRGB(color);
  }

  /** @param { number } maxWidth */
  initMaxWidth(maxWidth) {
    this.maxWidth = maxWidth;
  }

  /** @param { string } color */
  initRGB(color) {
    const [ r, g, b ] = color.match(/\d+/g);
    this.rgb = { r, g, b };
  }
}

class LineHub {
  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { number } */
  maxWidth;

  /**
   * @type {{
   *  r: string;
   *  g: string;
   *  b: string;
   * }}
   */
  rgb;

  /** @type { Particle[] } */
  particles;

  constructor(ctx, options, particles) {
    this.initCtx(ctx);
    this.initOptions(options);
    this.initParticles(particles);
  }

  /** @param { CanvasRenderingContext2D } */
  initCtx(ctx) {
    this.ctx = ctx;
  }

  /** @param { LineHubOptions } options */
  initOptions({ maxWidth, rgb }) {
    this.maxWidth = maxWidth;
    this.rgb = rgb;
  }

  /** @param { Particle[] } particles */
  initParticles(particles) {
    this.particles = particles;
  }

  draw() {
    this.drawLines();
  }

  drawLines() {
    this.particles.forEach(sour => this.lineToOthers(sour));
  }

  /** @param { Particle } sour */
  lineToOthers(sour) {
    this.particles.forEach(dest => this.lineToDest(sour, dest));
  }

  /**
   * @param { Particle } sour
   * @param { Particle } dest
   */
  lineToDest(sour, dest) {
    const { x: x1, y: y1 } = sour;
    const { x: x2, y: y2 } = dest;

    const distance = this.calcDistance(x1, y1, x2, y2);
    const opacity = this.calcOpacity(distance);

    if (opacity > 0) {
      const { ctx, rgb: { r, g, b } } = this;

      ctx.save();
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
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
    const { maxWidth } = this;
    return 1 - distance / maxWidth;
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

    if (!this.canvas) throw new Error("selector 에 해당하는 <canvas />를 찾을 수 없습니다.");

    this.ctx = this.canvas.getContext("2d");
  }

  initCanvasSize() {
    const { canvas } = this;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  initParticleOptions() {
    this.particleOptions = new ParticleOptions();
  }

  initParticles() {
    this.particles = Array.from(
      { length: this.particleOptions.amount },
      () => new Particle(this.canvas, this.particleOptions)
    );
  }

  initLineHubOptions() {
    this.lineHubOptions = new LineHubOptions();
  }

  initLineHub() {
    const { ctx, lineHubOptions, particles } = this;
    this.lineHub = new LineHub(ctx, lineHubOptions, particles);
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
);