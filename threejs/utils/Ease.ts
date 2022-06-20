export * from './ThreeHelpers';

export const PI = Math.PI;
export const HALF_PI = Math.PI / 2;
export const TWO_PI = Math.PI * 2;
export const QUARTER_PI = Math.PI / 4;
export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;

export const normalize = (v: number, vmin: number, vmax: number, tmin: number, tmax: number) => {
  const nv = Math.max(Math.min(v, vmax), vmin);
  const dv = vmax - vmin;
  const pc = (nv - vmin) / dv;
  const dt = tmax - tmin;
  const tv = tmin + pc * dt;
  return tv;
};

export const easeInQuad = (t: number, b: number, c: number, d: number) => {
  t /= d;
  return c * t * t + b;
};

export const easeOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d;
  return -c * t * (t - 2) + b;
};

export const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

export const easeInOutQuart = (t: number, b: number, c: number, d: number) => {
  if ((t /= d / 2) < 1) {
    return (c / 2) * t * t * t * t + b;
  } else {
    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
  }
};

export const easeInSine = (t: number, b: number, c: number, d: number) => {
  return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
};

export const easeOutSine = (t: number, b: number, c: number, d: number) => {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b;
};

export const easeInOutSine = (t: number, b: number, c: number, d: number) => {
  return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
};
