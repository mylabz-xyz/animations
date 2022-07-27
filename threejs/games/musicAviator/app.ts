import { MusicAviatorOptions } from '.';
import {
  BoxGeometry,
  Clock,
  Color,
  Mesh,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Scene,
  SpotLight,
  WebGLRenderer
} from 'three';
import { EngineBluePrint } from '../../models';
import { Engine } from './services';

export class MusicAviator {
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private geometry!: PlaneBufferGeometry | BoxGeometry;
  private light!: SpotLight;
  private material!: any;
  private mesh!: Mesh;
  private renderer!: WebGLRenderer;
  private clock!: Clock;

  private options: MusicAviatorOptions = {
    backgroundColor: new Color(0xffffff),
    speed: 0.1
  };

  private engine!: EngineBluePrint;
  constructor(options?: MusicAviatorOptions) {
    if (options) {
      this.options = { ...this.options, ...options };
    }
  }

  public async init(canvas?: HTMLElement) {
    this.scene = new Scene();
    this.scene.background = this.options.backgroundColor
    this.light = new SpotLight(this.options.backgroundColor, 1);

    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 100;
    this.camera = new PerspectiveCamera(fov, aspect, near, far);

    this.renderer = new WebGLRenderer({
      canvas: canvas
    });
    this.renderer.setClearColor(this.options.backgroundColor, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.clock = new Clock();

    await this.runEngine();
  }

  public run() {
    window.requestAnimationFrame(this.run.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  public setOptions(options: MusicAviatorOptions) {
    if (options && Object.keys(options).length > 0) {
      this.options = { ...this.options, ...options };
    }
  }

  private  runEngine() {
    this.engine = new Engine();
    return this.engine.importSceneCameraRenderer(this.scene, this.camera, this.renderer).init();
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
