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
import { MusicPlayerOptions, SceneMainOptions } from './models';

export class MusicPlayer {
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private geometry!: PlaneBufferGeometry | BoxGeometry;
  private light!: SpotLight;
  private material!: any;
  private mesh!: Mesh;
  private renderer!: WebGLRenderer;
  private clock!: Clock;

  private sceneMainOptions!: SceneMainOptions;
  private musicPlayerOptions!: MusicPlayerOptions;
}
