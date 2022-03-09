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
    amount = 30,
    defaultRadius = 5,
    variantRadius = 10,
    defaultSpeed = 1,
    variantSpeed = 10,
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

  /** @param { Position } position */
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }
}

class Particle {
  /** @type { HTMLCanvasElement } */
  canvas;

  /** @type { CanvasRenderingContext2D } */
  ctx;

  /** @type { string } */
  color;
  
  /** @type { Position } */
  position;

  /** @type { number } */
  radius;

  /** @type { number } */
  speed;

  /** @type { number } */
  directionAngle;

  /** @type { Position } */
  vector;

  /**
   * @param { HTMLCanvasElement } canvas 
   * @param { ParticleOptions } options 
   */
  constructor(canvas, options) {
    this.initCanvas(canvas);
    
    this.initColor(options);
    this.initPosition();
    this.initRadius(options);
    this.initSpeed(options);
    this.initDirectionAngle();
    this.initVector();
  }

  /** @param { HTMLCanvasElement } canvas */
  initCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  /** @param { ParticleOptions } options */
  initColor({ color }) {
    this.color = color;
  }

  initPosition() {
    const { canvas: { width, height } } = this;

    this.position = new Position({
      x: width * Math.random(),
      y: height * Math.random(),
    });
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
    this.directionAngle = Math.PI * 2 * Math.random();
  }

  initVector() {
    const { directionAngle, speed } = this;

    this.vector = new Position({
      x: Math.cos(directionAngle) * speed,
      y: Math.sin(directionAngle) * speed,
    });
  }

  update() {
    const { position, vector } = this;

    position.x += vector.x;
    position.y += vector.y;

    this.applyWall();
  }

  applyWall() {
    const { canvas: { width, height }, position: { x, y }, vector } = this;

    if (x >= width || x <= 0) vector.x *= -1;

    if (y >= height || y <= 0) vector.y *= -1;
  }

  draw() {
    const { ctx, color, radius, position: { x, y } } = this;

    ctx.save();
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

class LineHubOptions {
  /** @type { string } */
  color;

  /** @type { number } */
  maxWidth;

  /** @param { Partial<LineHubOptions> } options */
  constructor({
    color = "rgb(0, 181, 255)",
    maxWidth = 300,
  } = {}) {
    this.color = color;
    this.maxWidth = maxWidth;
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

  /**
   * @param { CanvasRenderingContext2D } ctx 
   * @param { LineHubOptions } options 
   * @param { Particle[] } particles 
   */
  constructor(ctx, options, particles) {
    this.initCtx(ctx);
    this.initMaxWidth(options);
    this.initRGB(options);
    this.initParticles(particles);
  }

  /** @param { CanvasRenderingContext2D } ctx */
  initCtx(ctx) {
    this.ctx = ctx;
  }

  /** @param { LineHubOptions } options */
  initMaxWidth({ maxWidth }) {
    this.maxWidth = maxWidth;
  }

  initRGB({ color }) {
    const [ r, g, b ] = color.match(/\d+/g);
    this.rgb = { r, g, b };
  }

  /** @param { Particle[] } particles */
  initParticles(particles) {
    this.particles = particles;
  }

  draw() {
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
    const { position: { x: x1, y: y1 } } = sour;
    const { position: { x: x2, y: y2 } } = dest;

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
   * @returns 
   */
  calcDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  /** @param { number } distance */
  calcOpacity(distance) {
    return 1 - distance / this.maxWidth;
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

  constructor(selector) {
    this.initCanvas(selector);
    this.resizeCanvas();

    this.initParticleOptions();
    this.initParticles();

    this.initLineHubOptions();
    this.initLineHub();

    this.startAnimation();
  }

  /** @param { string } selector */
  initCanvas(selector) {
    this.canvas = document.querySelector(selector);

    if (!this.canvas) throw new Error(`${selector} 요소를 찾을 수 없습니다.`);

    this.ctx = this.canvas.getContext("2d");
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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

    console.log(this.lineHubOptions);
  }

  initLineHub() {
    this.lineHub = new LineHub(this.ctx, this.lineHubOptions, this.particles);
  }
  
  startAnimation() {
    this.loopAnimationFrame();
  }

  loopAnimationFrame() {
    const { ctx, canvas: { width, height } } = this;
    
    ctx.clearRect(0, 0, width, height);
    
    this.drawScene();

    this.animationFrameId = window.requestAnimationFrame(() => this.loopAnimationFrame());
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