import { MusicAviatorOptions } from '.';
import * as THREE from 'three';

export class MusicAviator {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private geometry!: THREE.PlaneBufferGeometry | THREE.BoxGeometry;
  private light!: THREE.SpotLight;
  private material!: any;
  private mesh!: THREE.Mesh;
  private renderer!: THREE.WebGLRenderer;
  private clock!: THREE.Clock;

  private options: MusicAviatorOptions = {
    backgroundColor: '0xffffff',
    speed: 0.1
  };
  constructor(options?: MusicAviatorOptions) {
    if (options) {
      this.options = { ...this.options, ...options };
    }
  }

  public init(canvas?: HTMLElement) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.options.backgroundColor);
    this.light = new THREE.SpotLight(this.options.backgroundColor, 1);

    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
    this.renderer.setClearColor(this.options.backgroundColor, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.clock = new THREE.Clock();
  }

  public run() {
    window.requestAnimationFrame(this.run.bind(this));
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  }

  public setOptions(options: MusicAviatorOptions) {
    if (options && Object.keys(options).length > 0) {
      this.options = { ...this.options, ...options };
    }
  }

  private addEvents(): void {
    window.addEventListener('resize', this.onResize.bind(this), false);
  }

  private onResize() {
    this.material.uniforms.uResolution = {
      value: { x: window.innerWidth, y: window.innerHeight }
    };
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
