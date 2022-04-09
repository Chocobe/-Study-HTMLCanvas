export default class LineHubOptions {
  lineRadius!: number;
  rgb!: {
    r: string;
    g: string;
    b: string;
  }

  constructor({ 
    lineRadius = 200, 
    color = "rgba(0, 181, 255)" 
  }: {
    lineRadius?: number;
    color?: string;
  } = {}) {
    this.lineRadius = lineRadius;
    
    const [r, g, b] = color.match(/\d+/g) as string[];
    this.rgb = { r, g, b };
  }
}