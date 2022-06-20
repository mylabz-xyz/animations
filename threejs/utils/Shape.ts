import { Mesh, IUniform, Scene, Color, ShaderMaterial, PlaneBufferGeometry } from 'three';

export class Shape {
  mesh: Mesh;
  timeU: IUniform;

  constructor(parentScene: Scene, vertShader: string, fragShader: string) {
    const geom = new PlaneBufferGeometry(128, 32);
    const mat = new ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        uTime: { value: 0.0 },
        uResolution: { value: { x: window.innerWidth, y: window.innerHeight } },
        uMouse: { value: { x: 0, y: 0 } },
        uColor: { value: new Color(0xffffff) }
      }
    });
    this.timeU = mat.uniforms.uTime;
    this.mesh = new Mesh(geom, mat);
    parentScene.add(this.mesh);
  }

  public update(secs: number): void {
    this.timeU.value = secs;
  }
}
