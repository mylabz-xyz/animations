import {
	CylinderBufferGeometry,
	CylinderGeometry,
	Matrix4,
	Mesh,
	MeshBasicMaterial,
	MeshPhongMaterial,
	SphereBufferGeometry,
	Texture,
} from 'three';
import { loadTexture } from '../../../utils/textures';

export class World {
	public geom!: SphereBufferGeometry;
	public mesh!: Mesh;
	public material!: MeshBasicMaterial;
	public texture!: Texture;

	constructor(colors: any) {
		// create the geometry (shape) of the cylinder;
		// the parameters are:
		// radius top, radius bottom, height, number of segments on the radius, number of segments vertically
	}
	public async createAsync() {
		this.geom = new SphereBufferGeometry(100, 100);
		this.texture = await loadTexture('/three/textures/worlds/Volcanic.png');
		this.material = new MeshBasicMaterial({ map: this.texture });
		this.mesh = new Mesh(this.geom, this.material);

		this.geom.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2));
	}
}
