import { IcosahedronBufferGeometry, Mesh, ShaderMaterial, Vector3 } from 'three';
import glslify from 'glslify';
import { move } from '../../utils';

export class Sun {
  public mesh!: Mesh<IcosahedronBufferGeometry, ShaderMaterial>;
  private settings = {
    speed: 0.5,
    density: 0.93,
    strength: 0.12,
    frequency: 0.2,
    amplitude: 0.5,
    intensity: 10.0
  };

  private colors = {
    default: ''
  };

  private lastPlanePosition!: Vector3;

  public position:any = [];
  public attacks = {
    wave: {},
    bullets: {}
  };

  public state = {
    sunLight: true,
    moon: false
  };

  constructor(targetPosition: Vector3, vertex: string, frag: string, color?: keyof Sun['colors']) {
    this.initSunLight(color, vertex, frag);
  }

  public initSunLight(color: any, vertex: string, frag: string) {
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
        uColor: { value: color || this.colors.default },
        uSeeds: { value: color || this.colors.default },
        uColors: { value: color || this.colors.default }
      }
      // wireframe: true,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.name = 'Sun';
  }
  public initMoon() {
    console.log('init moon');
  }

  public update(time: number, playerPosition: Vector3): void {
    // Update uniforms
    this.mesh.material.uniforms.uTime.value = time;
    this.mesh.material.uniforms.uSpeed.value = this.settings.speed;
    this.mesh.material.uniforms.uNoiseDensity.value = this.settings.density;
    this.mesh.material.uniforms.uNoiseStrength.value = this.settings.strength;
    this.mesh.material.uniforms.uFrequency.value = this.settings.frequency;
    this.mesh.material.uniforms.uAmplitude.value = this.settings.amplitude;
    this.mesh.material.uniforms.uIntensity.value = this.settings.intensity;

    const { x, y, z } = move(2, this.mesh.position, playerPosition);

    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
  }
}
