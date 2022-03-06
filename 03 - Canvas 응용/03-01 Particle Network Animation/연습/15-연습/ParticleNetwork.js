// @ts-check

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

  /** @param { Partial<ParticleOptions> } options */
  constructor({
    amount = 50,
    color = "rgb(255, 255, 255)",
    defaultRadius = 3,
    variantRadius = 20,
    defaultSpeed = 3,
    variantSpeed = 7,
  } = {}) {
    this.amount = amount;
    this.color = color;
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

  constructor(x, y) {
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

    this.position = {
      x: width * Math.random(),
      y: height * Math.random(),
    };
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
    const { directionAngle, speed } = this;

    this.vector = {
      x: Math.cos(directionAngle) * speed,
      y: Math.sin(directionAngle) * speed,
    };
  }

  update() {
    const { position, vector } = this;

    position.x += vector.x;
    position.y += vector.y;

    this.applyWall();
  }

  applyWall() {
    const { position, vector, canvas: { width, height } } = this;

    if (position.x >= width || position.x <= 0) vector.x *= -1;

    if (position.y >= height || position.y <=0) vector.y *= -1;
  }
  
  draw() {
    const { ctx, color, position, radius } = this;

    ctx.save();
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
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
    maxWidth = 300
  } = {}) {
    this.initColor(color);
    this.initMaxWidth(maxWidth);
  }

  /** @param { string } color */
  initColor(color) {
    this.color = color;
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

  /**
   * 
   * @param { CanvasRenderingContext2D } ctx 
   * @param { Particle[] } particles 
   * @param { LineHubOptions } options
   */
  constructor(ctx, particles, { color, maxWidth }) {
    this.initCtx(ctx);
    this.initParticles(particles);
    this.initRGB(color);
    this.initMaxWidth(maxWidth);
  }

  /** @param { CanvasRenderingContext2D } ctx */
  initCtx(ctx) {
    this.ctx = ctx;
  }

  /** @param { Particle[] } particles */
  initParticles(particles) {
    this.particles = particles;
  }

  /** @param { string } color */
  initRGB(color) {
    const [ r, g, b ] = color.match(/\d+/g);
    
    this.rgb = { r, g, b };
  }

  /** @param { number } maxWidth */
  initMaxWidth(maxWidth) {
    this.maxWidth = maxWidth;
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

    const distance = this.calcDistance({ x1, y1, x2, y2 });
    const opacity = this.calcOpacity(distance);

    if (opacity > 0) {
      const { ctx, rgb: { r, g, b } } = this;
      const lineWidth = this.calcLineWidth(distance);

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.lineWidth = lineWidth;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.restore();
    }
  }

  /**
   * @param {{
   *  x1: number;
   *  y1: number;
   *  x2: number;
   *  y2: number;
   * }}
   */
  calcDistance({ x1, y1, x2, y2 }) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  /** @param { number } distance */
  calcOpacity(distance) {
    return 1 - distance / this.maxWidth;
  }

  /** @param { number } distance */
  calcLineWidth(distance) {
    const lineWidth = Math.floor(this.maxWidth / distance);

    return lineWidth > 10 ? 10 : lineWidth;
  }
}

class ParticleNetwork {
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
    this.resizeCanvas();

    this.initParticleOptions();
    this.initParticles();

    this.initLineHubOptions();
    this.initLineHub();
    
    this.startAnimation();
  }

  initCanvas(selector) {
    this.canvas = document.querySelector(selector);

    if (!this.canvas) throw new Error(`"${selector}" 에 해당하는 <canvas />를 찾을 수 없습니다.`);

    this.ctx = this.canvas.getContext("2d");
  }

  resizeCanvas() {
    const { canvas } = this;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  initParticleOptions() {
    this.particleOptions = new ParticleOptions();
  }

  initParticles() {
    const { particleOptions, canvas } = this;

    this.particles = Array.from(
      { length: particleOptions.amount },
      () => new Particle(canvas, particleOptions)
    );
  }

  initLineHubOptions() {
    this.lineHubOptions = new LineHubOptions();
  }

  initLineHub() {
    const { ctx, particles, lineHubOptions } = this;
    
    this.lineHub = new LineHub(ctx, particles, lineHubOptions);
  }

  startAnimation() {
    this.loopAnimationFrame();
  }

  loopAnimationFrame() {
    const { ctx, canvas: { width, height } } = this;

    ctx.clearRect(0, 0, width, height);
    
    this.drawScene();

    this.animationFrameId = window.requestAnimationFrame(
      () => this.loopAnimationFrame()
    );
  }

  drawScene() {
    this.drawParticles();
    this.drawLineHub();
  }

  drawParticles() {
    this.particles.forEach(particle => {
      particle.update();
      particle.draw();
    })
  }

  drawLineHub() {
    this.lineHub.draw();
  }
}

window.addEventListener(
  "DOMContentLoaded",
  () => new ParticleNetwork("#particleNetworkCanvas")
);