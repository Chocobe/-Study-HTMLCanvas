import RGB from "@/RGB";

export default class LineHubOptions {
  rgb!: RGB;
  lineRadius!: number;

  constructor({ color = "rgb(0, 181, 255)", lineRadius = 200 } = {}) {
    this.rgb = this.parseColorToRGB(color);
    this.lineRadius = lineRadius;
  }

  private parseColorToRGB(color: string): RGB {
    const [r, g, b] = color.match(/\d+/g) as string[];
    return { r, g, b };
  }
}
