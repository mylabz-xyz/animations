import * as THREE from 'three';
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

  public init(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    this.light = new THREE.SpotLight(0xffffff, 1);

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
        uResolution: { value: { x: window.innerWidth, y: window.innerHeight } }
      }
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
    this.renderer.setClearColor(0xffffff, 1);
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
  }

  public run() {
    window.requestAnimationFrame(this.run.bind(this));
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
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
