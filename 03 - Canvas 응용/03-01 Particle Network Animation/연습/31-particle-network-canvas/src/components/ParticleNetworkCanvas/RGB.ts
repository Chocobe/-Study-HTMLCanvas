export default class RGB {
  color!: string;
  
  r!: string;
  g!: string;
  b!: string;

  constructor(color: string) {
    const [r, g, b] = color.match(/\d+/g) as string[];

    this.r = r;
    this.g = g;
    this.b = b;
  }
}