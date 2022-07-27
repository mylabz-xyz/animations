import { AmbientLight, DirectionalLight, HemisphereLight } from 'three';
import { ThreeObject } from '../../../models';

export class Light implements ThreeObject {
	public hemisphereLight: HemisphereLight;
	public shadowLight: DirectionalLight;
	public ambiantLight: AmbientLight;

	constructor() {
		// A hemisphere light is a gradient colored light;
		// the first parameter is the sky color, the second parameter is the ground color,
		// the third parameter is the intensity of the light
		this.hemisphereLight = new HemisphereLight(0xaaaaaa, 0x000000, 0.9);

		// A directional light shines from a specific direction.
		// It acts like the sun, that means that all the rays produced are parallel.
		this.shadowLight = new DirectionalLight(0xffffff, 0.9);

		this.ambiantLight = new AmbientLight(0xdc8874, 0.5);
		// Set the direction of the light
		this.shadowLight.position.set(150, 350, 350);

		// Allow shadow casting
		this.shadowLight.castShadow = true;

		// define the visible area of the projected shadow
		this.shadowLight.shadow.camera.left = -400;
		this.shadowLight.shadow.camera.right = 400;
		this.shadowLight.shadow.camera.top = 400;
		this.shadowLight.shadow.camera.bottom = -400;
		this.shadowLight.shadow.camera.near = 1;
		this.shadowLight.shadow.camera.far = 1000;

		// define the resolution of the shadow; the higher the better,
		// but also the more expensive and less performant
		this.shadowLight.shadow.mapSize.width = 2048;
		this.shadowLight.shadow.mapSize.height = 2048;
	}

	public update(t: number) {
		// Nothing to do
	}
}
