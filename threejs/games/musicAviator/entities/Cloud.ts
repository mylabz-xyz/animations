import { BoxBufferGeometry, BoxGeometry, Mesh, MeshPhongMaterial } from 'three';

export class Cloud {
	public geom: BoxGeometry;
	public mesh: Mesh;
	public material: MeshPhongMaterial;
	public nBlocs = 3 + Math.floor(Math.random() * 3);

	constructor(colors: any) {
		this.mesh = new Mesh();
		this.mesh.name = 'cloud';
		// create the geometry (shape) of the cylinder;
		// the parameters are:
		// radius top, radius bottom, height, number of segments on the radius, number of segments vertically
		this.geom = new BoxBufferGeometry(20, 20, 20);
		this.material = new MeshPhongMaterial({
			color: colors.white,
			flatShading: true,
		});
		for (let i = 0; i < this.nBlocs; i++) {
			// create the mesh by cloning the geometry
			const m = new Mesh(this.geom, this.material);
			// set the position and the rotation of each cube randomly
			m.position.x = i * 15;
			m.position.y = Math.random() * 10;
			m.position.z = Math.random() * 10;
			m.rotation.z = Math.random() * Math.PI * 2;
			m.rotation.y = Math.random() * Math.PI * 2;
			// set the size of the cube randomly
			const s = 0.1 + Math.random() * 0.9;
			m.scale.set(s, s, s);
			// allow each cube to cast and to receive shadows
			m.castShadow = true;
			m.receiveShadow = true;
			// add the cube to the container we first created
			this.mesh.add(m);
		}
	}
	public rotate() {
		this.mesh.children.forEach((children, index) => {
			this.mesh.children[index].rotation.z +=
				Math.random() * 0.005 * (index + 1);
			this.mesh.children[index].rotation.y +=
				Math.random() * 0.002 * (index + 1);
		});
	}
}
