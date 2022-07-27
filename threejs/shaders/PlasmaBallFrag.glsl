varying vec2 vUv;
varying float vDistort;

uniform float uTime;
uniform float uSpeed;
uniform float uIntensity;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318530718 * (c * t + d));
}

void main() {
    
  float distort = vDistort * uIntensity;

  // vec3 brightness = vec3(0.5, 0.5, 0.5);
  // vec3 contrast = vec3(0.5, 0.5, 0.5);
  // vec3 oscilation = vec3(1.0, 1.0, 1.0);
  // vec3 phase = vec3(0.0, 0.1, 0.2);

// Red/blue/dark ball
    vec3 brightness = vec3(0.0, 0.0, 0.0);
  vec3 contrast = vec3(0.5, 0.86, 0.73);
  vec3 oscilation = vec3(1.00,0.75, 0.57);
  vec3 phase = vec3(0.82, 0.14,0.44);

  vec3 color = cosPalette(distort,vec3(0.09,0.41,0.81),vec3(0.02,0.81,0.97),vec3(0.23,0.70,0.22),vec3(0.13,0.26,0.32));
  
  gl_FragColor = vec4(color, 1.0);

}  