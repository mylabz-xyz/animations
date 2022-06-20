import { LoadingManager, Material, Mesh, Object3D } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export class DracoLoader {
  public mesh!: GLTF;
  private loader: GLTFLoader;
  private loadingManager: LoadingManager;

  constructor() {
    this.loadingManager = new LoadingManager();
    this.loader = new GLTFLoader(this.loadingManager);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/js/libs/draco/');
    this.loader.setDRACOLoader(dracoLoader);
  }

  public createAsync(filePath: string) {
    return new Promise((res, err) => {
      this.loader.load(
        filePath,
        gltf => {
          this.defaultInit(gltf);
          res(true);
        },
        // called while loading is progressing
        xhr => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        // called when loading has errors
        error => {
          console.log(error);
          console.log('An error happened');
          err(false);
        }
      );
    });
  }

  private defaultInit(gltf: GLTF) {
    console.log(gltf)
    gltf.scene.scale.set(1.5, 1.5, 1.5);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.traverse((child: Object3D<Event>) => {
      if (child.isObject3D) {
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });
    this.mesh = gltf;
  }
}
