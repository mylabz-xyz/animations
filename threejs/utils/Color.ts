//Using threejs color functions

import { Color } from 'three';

export const Vec3ToHex = (glslStr: string) => {
  glslStr = glslStr.replace('vec3(', '');
  glslStr = glslStr.replace(')', '');
  let arr = glslStr.split(',').map(Number);
  for (let val of arr) {
    if (val > 1 || val < 0) {
      return '';
    }
  }
  let col = new Color().fromArray(arr);
  return `#${col.getHexString()}`;
};

export const hexToVec3 = (hexStr: string) => {
  console.log('hexToGL');
  //check if valid hex value
  if (/^#([0-9A-F]{3}){1,2}$/i.test(hexStr)) {
    let col = new Color(hexStr);
    let out = col.toArray().map(x => {
      //to fixed 3
      let conv = Math.round(x * 1000) / 1000 + '';
      //append missing periods
      if (conv.toString().indexOf('.') === -1) conv += '.';
      return conv;
    });
    return `vec3(${out})`;
  } else {
    return '';
  }
};
