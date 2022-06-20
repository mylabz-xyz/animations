import { LoadingManager, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export interface EngineBluePrint {
	scene: Scene;
	loadingManager: LoadingManager;
	camera: PerspectiveCamera;
	renderer?: WebGLRenderer;
	ready: boolean;
	fieldOfView: number;
	aspectRatio: number;
	nearPlane: number;
	farPlane: number;
	cameraPosition: {
		x: number;
		y: number;
		z: number;
	};
	importSceneCameraRenderer(
		scene: Scene,
		camera: PerspectiveCamera,
		renderer?: WebGLRenderer
	): this;
	init(): Promise<void>;
	createScene(): void;
	createWorld(): void;
	update(secs: number, delta?: number): void;
}
