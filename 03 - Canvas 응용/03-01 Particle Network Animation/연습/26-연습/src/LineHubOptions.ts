export default class LineHubOptions {
  lineRadius!: number;
  rgb!: {
    r: string;
    g: string;
    b: string;
  };

  constructor({ lineRadius = 200, color = "rgb(0, 181, 255)" } = {}) {
    this.initLineRadius(lineRadius);
    this.initRGB(color);
  }

  initLineRadius(lineRadius: number) {
    this.lineRadius = lineRadius;
  }

  initRGB(color: string) {
    const [r, g, b] = color.match(/\d+/g) as string[];
    this.rgb = { r, g, b };
  }
}
