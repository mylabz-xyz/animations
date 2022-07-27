import {
	Mesh,
	MeshPhongMaterial,
	Object3D,
	TetrahedronBufferGeometry,
} from 'three';
import { ThreeObject } from '../../../models';

export class Ennemy implements ThreeObject {
	public geom: TetrahedronBufferGeometry;
	public mesh: Object3D;
	public material: MeshPhongMaterial;
	public angle: number;
	public dist: number;
	public color: any;
	constructor(color: any) {
		this.color = color;
		this.geom = new TetrahedronBufferGeometry();
		this.material = new MeshPhongMaterial({
			color: this.color,
			shininess: 0,
			specular: 0xffffff,
			flatShading: true,
		});
		this.mesh = new Mesh(this.geom, this.material);
		this.mesh.castShadow = true;
		this.angle = 0;
		this.dist = 0;
	}

	public update(t: number): void {
		console.log('update');
	}
}
