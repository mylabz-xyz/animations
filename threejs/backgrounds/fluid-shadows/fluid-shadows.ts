import * as THREE from 'three';
import { IcosahedronBufferGeometry, Mesh, MeshBasicMaterial } from 'three';
import { FluidShadowsOptions } from '.';
import { Ship } from '../../objects/vehicules/space/spaceships/Ship';
import { hexToVec3 } from '../../utils';
//@ts-ignore
import fragment from './fragment.glsl';
//@ts-ignore
import vertex from './vertex.glsl';

export class FluidShadows {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private geometry!: THREE.PlaneBufferGeometry | THREE.BoxGeometry;
  private light!: THREE.SpotLight;
  private material!: any;
  private mesh!: THREE.Mesh;
  private renderer!: THREE.WebGLRenderer;
  private clock!: THREE.Clock;

  private options = {
    backgroundColor: '0xffffff',
    shadowColor: '0xffffff',
    shadowIteration: 5,
    shadowSpectrum: 0.0,
    speed: 0.1
  };
  constructor(options?: FluidShadowsOptions) {
    if (options) {
      this.options = { ...this.options, ...options };
    }
  }

  public init(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.options.backgroundColor);
    this.light = new THREE.SpotLight(this.options.backgroundColor, 1);

    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.geometry = new THREE.PlaneBufferGeometry(30, 10);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0.0 },
        uResolution: { value: { x: window.innerWidth, y: window.innerHeight } },
        uColor: { value: hexToVec3(this.options.shadowColor) },
        uMaxIter: { value: this.options.shadowIteration },
        uSpectrum: { value: this.options.shadowSpectrum },
        uSpeed: { value: this.options.speed }
      }
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
    this.renderer.setClearColor(this.options.backgroundColor, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene.add(this.camera);
     this.scene.add(this.mesh);
    this.scene.add(this.light);
    this.mesh.position.set(0, 0, 0);
    this.camera.position.set(0, 0, 10);
    this.light.position.set(0, 0, 10);

    this.light.lookAt(this.mesh.position);
    this.camera.lookAt(this.mesh.position);

    this.clock = new THREE.Clock();

    this.addEvents();

    // this.testShip();
  }

  public run() {
    window.requestAnimationFrame(this.run.bind(this));
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  }

  public setOptions(options?: FluidShadowsOptions) {
    if (options) {
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

  private async testShip() {
    const ship = await new Ship();

    this.scene.add(ship.mesh.scene);

    const geometry = new IcosahedronBufferGeometry(50, 60);

    const material = new MeshBasicMaterial({ color: 'red' });

    const mesh = new Mesh(geometry, material);

    this.scene.add(mesh)
  }
}
