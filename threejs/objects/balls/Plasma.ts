import { IcosahedronBufferGeometry, Mesh, ShaderMaterial, Vector3 } from 'three';
import glslify from 'glslify';

export interface PlasmaBallSettings {
  speed: number;
  density: number;
  strength: number;
  frequency: number;
  amplitude: number;
  intensity: number;
  color: string;
}

export class PlasmaBall {
  public mesh: Mesh<IcosahedronBufferGeometry, ShaderMaterial>;
  private settings: PlasmaBallSettings = {
    speed: 0.5,
    density: 0.93,
    strength: 0.12,
    frequency: 0.2,
    amplitude: 0.5,
    intensity: 10.0,
    color: ''
  };

  private target!: Vector3;

  position: any = [];

  constructor(targetPosition: Vector3, vertex: string, frag: string, settings: PlasmaBallSettings) {
    if (settings) {
      this.settings = { ...this.settings, ...settings };
    }
    const geometry = new IcosahedronBufferGeometry(50, 64);
    const material = new ShaderMaterial({
      vertexShader: glslify(vertex),
      fragmentShader: glslify(frag),
      uniforms: {
        uTime: { value: 0.1 },
        uSpeed: { value: this.settings.speed },
        uNoiseDensity: { value: this.settings.density },
        uNoiseStrength: { value: this.settings.strength },
        uFrequency: { value: this.settings.frequency },
        uAmplitude: { value: this.settings.amplitude },
        uIntensity: { value: this.settings.intensity },
        uColor: { value: this.settings.color },
        uSeeds: { value: this.settings.color },
        uColors: { value: this.settings.color }
      }
      // wireframe: true,
    });
    this.mesh = new Mesh(geometry, material);
  }

  public update(time: number): void {
    // Update uniforms
    this.mesh.material.uniforms.uTime.value = time;
    this.mesh.material.uniforms.uSpeed.value = this.settings.speed;
    this.mesh.material.uniforms.uNoiseDensity.value = this.settings.density;
    this.mesh.material.uniforms.uNoiseStrength.value = this.settings.strength;
    this.mesh.material.uniforms.uFrequency.value = this.settings.frequency;
    this.mesh.material.uniforms.uAmplitude.value = this.settings.amplitude;
    this.mesh.material.uniforms.uIntensity.value = this.settings.intensity;
  }

  public setTarget(targetPos: Vector3) {
    this.target = targetPos;
  }
}
