export default class RGB {
  _r!: string;
  _g!: string;
  _b!: string;

  constructor(color: string) {
    const [r, g, b] = color.match(/\d+/g) as string[];

    this._r = r;
    this._g = g;
    this._b = b;
  }

  toJSON() {
    return {
      r: this._r,
      g: this._g,
      b: this._b,
    };
  }
}
