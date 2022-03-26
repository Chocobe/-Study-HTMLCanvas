import RGB from "./RGB";

export interface LineHubOptionsParams {
  color?: string;
  lineRadius?: number;
}

export default class LineHubOptions {
  _color!: string;
  _rgb!: RGB;
  _lineRadius!: number;

  constructor({
    color = "rgb(0, 181, 255)",
    lineRadius = 200,
  }: LineHubOptionsParams = {}) {
    this._initRGB(color);
    this._initLineRadius(lineRadius);
  }

  _initRGB(color: string): void {
    this._rgb = new RGB(color);
  }

  _initLineRadius(lineRadius: number): void {
    this._lineRadius = lineRadius;
  }

  toJSON() {
    const { _color, _rgb, _lineRadius } = this;

    return {
      color: _color,
      rgb: _rgb,
      lineRadius: _lineRadius,
    };
  }
}
